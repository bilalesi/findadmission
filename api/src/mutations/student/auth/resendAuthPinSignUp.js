import dayjs from 'dayjs';
import httpStatus from 'http-status-codes';
import createServerError from '../../../shared/error-handler';
import { createServerReply, createServerReplyError  } from '../../../shared/reply-handler';
import StudentRepository from "../../../repository/student";
import { generate_random_pin_6_digits, generate_validation_token } from '../../../shared/encryption/generate-jwt';
import verifyJwt from '../../../shared/encryption/verify-jwt';
import decodeJwt from '../../../shared/encryption/decode-jwt';

const IS_PROD = process.env.NODE_ENV === 'production';
const rootRedirect = IS_PROD ? `${process.env.APP_REDIRECT}/auth` : `${process.env.APP_REDIRECT}/auth`;
const STUDENT_SIGNUP_RESEND_PIN_HANDLER = "student-signup-resend-pin-handler";



/**
* @function resendAuthPinSignUpMutation
* @description send a new pin to the user
* @param {object} request - request object
* @param {object} reply - reply object
* @bodyParam {String} email - email of the user
* @return {object} reply object
 */
export default async (req, res, next) => {
    try {
        let { email, token } = req.body;
        let tokenDecoded = decodeJwt(token);
        console.log(STUDENT_SIGNUP_RESEND_PIN_HANDLER,  email, tokenDecoded);
        if(tokenDecoded.isDecoded && !tokenDecoded.decoded.email === email) {
            return createServerReplyError(res, httpStatus.BAD_REQUEST, 'InvalidOperation', 'Invalid token', {}, STUDENT_SIGNUP_RESEND_PIN_HANDLER, );
        }

        let student = await StudentRepository.get_student_by_email(email);
        if(!student){
            return createServerReplyError(res, httpStatus.BAD_REQUEST,
                    "INVALID_EMAIL", "Invalid email", {}, STUDENT_SIGNUP_RESEND_PIN_HANDLER);
        }
        if(student.pin_reset_counter >= 3){
            return createServerReply(res, httpStatus.CREATED, "StudentPinRegenerationFailedQuotaExeeded", "Student request more than 3 times for new pin",
                { id: student._id, message: { toastType: 'error', toastMessage: 'You request than 3 times for new pin, please contact findadmission support team' } }, STUDENT_SIGNUP_RESEND_PIN_HANDLER);
        }
        let pin = generate_random_pin_6_digits();
        let _token = generate_validation_token({ user_id: student._id, type: 'student', email: student.email, exp: 1 * 24 * 60 * 60  }); // 1 day
        console.log(STUDENT_SIGNUP_RESEND_PIN_HANDLER,  'pin', pin, 'token', _token);
        Promise.all([
            StudentRepository.update_pin({ id: student._id, pin, pin_reset_counter: student.pin_reset_counter + 1 }),
            StudentRepository.update_validation_token({ id: student._id,  token: _token, expire_at: dayjs.unix(verifyJwt(_token, "AUTH_JWT_SIGNATURE").decoded.exp).toISOString() })
        ]).then((result) => {
            // TODO: send email pin and token url
            return createServerReply(res, httpStatus.CREATED, "StudentPinRegenerationSuccess", "Student Pin regenerated one more time",
                {
                    id: student._id,
                    redirect: `${rootRedirect}/validate-email?token=${_token}&email=${email}&toastType=success&toastMessage=A new pin has been sent to your email, please check your inbox` 
                },
                STUDENT_SIGNUP_RESEND_PIN_HANDLER);
        }).catch((err) => {
            console.log(err);
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "StudentPinRegenerationFailed",
                "Student pin not regenerated", err, STUDENT_SIGNUP_RESEND_PIN_HANDLER);
        })
    } catch (error) {
        return createServerError(res, error, error.message, STUDENT_SIGNUP_RESEND_PIN_HANDLER);
    }
}