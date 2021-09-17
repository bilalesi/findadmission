import dayjs from 'dayjs';
import httpStatus from 'http-status-codes';
import createServerError from '../../../shared/error-handler';
import { createServerReply, createServerReplyError  } from '../../../shared/reply-handler';
import StudentRepository from "../../../repository/student";
import { generate_random_pin_6_digits, generate_validation_token } from '../../../shared/encryption/generate-jwt';
import verifyJwt from '../../../shared/encryption/verify-jwt';


const rootRedirect = IS_PROD ? `${process.env.APP_STUDENT_REDIRECT}/web/auth` : `${process.env.APP_STUDENT_REDIRECT}/web/auth`;
const STUDENT_SEND_RESET_PASSWORD_HANDLER = "student-send-reset-password-handler";



/**
* @function sentTokenResetPasswordMutation
* @description send email with reset password token
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
                    "INVALID_EMAIL", "Invalid email", {}, STUDENT_SEND_RESET_PASSWORD_HANDLER);
        }
        try {
            let token = generate_validation_token({ user_id: student._id, type: 'student', email: student.email, secret: `reset-password-${student.reset_password_counter}` });
            await StudentRepository.update_validation_token({ id: student._id,  token: token, expire_at: dayjs.unix(verifyJwt(token, "AUTH_JWT_SIGNATURE").decoded.exp).toISOString() })
            return createServerReply(res, httpStatus.CREATED, "STUDENT_RESET_PASSWORD_TOKEN_GENERATED", "Student reset password token generated",
                {   id: student._id,
                    redirect: `${rootRedirect}/reset-password?token=${token}&toastType=success&toastMessage=A reset token has been sent to your email, check your inbox!`
                }, STUDENT_SEND_RESET_PASSWORD_HANDLER);
        } catch (error) {
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "STUDENT_RESET_PASSWORD_TOKEN_NOT_GENERATED",
                "Student reset password regenerating failed", null, STUDENT_SEND_RESET_PASSWORD_HANDLER);
        }
    } catch (error) {
        createServerError(res, error, error.message, STUDENT_SEND_RESET_PASSWORD_HANDLER);
    }
}