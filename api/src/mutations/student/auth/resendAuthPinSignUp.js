import dayjs from 'dayjs';
import httpStatus from 'http-status-codes';
import createServerError from '../../../shared/error-handler';
import { createServerReply, createServerReplyError  } from '../../../shared/reply-handler';
import StudentRepository from "../../../repository/student";
import { generate_random_pin_6_digits, generate_validation_token } from '../../../shared/encryption/generate-jwt';
import verifyJwt from '../../../shared/encryption/verify-jwt';


const rootRedirect = IS_PROD ? `${process.env.APP_STUDENT_REDIRECT}/web/auth` : `${process.env.APP_STUDENT_REDIRECT}/web/auth`;
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
        let { email } = req.body;
        let student = await StudentRepository.get_student_by_email(email);
        if(!student){
            return createServerReplyError(res, httpStatus.BAD_REQUEST,
                    "INVALID_EMAIL", "Invalid email", {}, STUDENT_SIGNUP_RESEND_PIN_HANDLER);
        }
        let pin = generate_random_pin_6_digits();
        let token = generate_validation_token({ user_id: student._id, type: 'student', email: student.email, secret: pin });
        Promise.all([
            StudentRepository.update_pin({ id: student._id, pin}),
            StudentRepository.update_validation_token({ id: student._id,  token: token, expire_at: dayjs.unix(verifyJwt(token, "AUTH_JWT_SIGNATURE").decoded.exp).toISOString() })
        ]).then((result) => {
            // TODO: send email pin and token url
            return createServerReply(res, httpStatus.CREATED, "StudentPinRegenerated", "Student created",
                { id: student._id, redirect: `${rootRedirect}?token=${token}&toastType=success&toastMessage=Your email address has been validated!` }, STUDENT_SIGNUP_HANDLER);
        }).catch((err) => {
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "StudentPinNotRegenerated",
                "Student pin not regenerated", null, STUDENT_SIGNUP_RESEND_PIN_HANDLER);
        })
    } catch (error) {
        createServerError(res, error, error.message, STUDENT_SIGNUP_RESEND_PIN_HANDLER);
    }
}