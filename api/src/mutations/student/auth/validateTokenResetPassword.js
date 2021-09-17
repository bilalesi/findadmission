import dayjs from 'dayjs';
import httpStatus from 'http-status-codes';
import createServerError from '../../../shared/error-handler';
import { createServerReply, createServerReplyError  } from '../../../shared/reply-handler';
import StudentRepository from "../../../repository/student";
import verifyJwt from '../../../shared/encryption/verify-jwt';
import { generate_validation_token } from '../../../shared/encryption/generate-jwt';


const rootRedirect = IS_PROD ? `${process.env.APP_STUDENT_REDIRECT}/web/auth` : `${process.env.APP_STUDENT_REDIRECT}/web/auth`;
const STUDENT_RESET_PASSWORD_HANDLER = "student-reset-password-handler";



/**
* @function validateTokenResetPasswordMutation
* @description validate token and reset password, redirect student to his dashboard after successful reset password
* @param {object} request - request object
* @param {object} reply - reply object
* @bodyParam {String} email - email of the user
* @return {object} reply object
 */
export default async (req, res, next) => {
    try {
        let { token, password, confirmed_password } = req.body;
        if(!token || !password || !confirmed_password) {
            return createServerReplyError(res, httpStatus.BAD_REQUEST,
                "MISSIN_REQUIRED_INPUTS", "Missing required inputs", {}, STUDENT_RESET_PASSWORD_HANDLER);
        }
        if(password !== confirmed_password) {
            return createServerReplyError(res, httpStatus.BAD_REQUEST,
                "PASSWORD_NOT_MATCH", "Password not match with its brother", {}, STUDENT_RESET_PASSWORD_HANDLER);
        }
        let tokenDecoded = verifyJwt(token, "AUTH_JWT_SIGNATURE");
        if(!tokenDecoded.valid) {
            return createServerReplyError(res, httpStatus.BAD_REQUEST,
                "INVALID_RESET_TOKEN", tokenDecoded.error , {}, STUDENT_RESET_PASSWORD_HANDLER);
        }
        let student = await StudentRepository.get_student_by_id_basic(tokenDecoded.decoded.sub);
        if(!student){
            return createServerReplyError(res, httpStatus.BAD_REQUEST,
                    "STUDENT_NOT_EXIST", "Student not exist", {}, STUDENT_RESET_PASSWORD_HANDLER);
        }
        try {
            student.password = password;
            student.reset_password_counter = Number(student.reset_password_counter) +1;
            await student.save();
            // TODO: send email to student
            return createServerReply(res, httpStatus.CREATED, "STUDENT_RESET_PASSWORD_SUCCESS", "Student reset password succeeded",
                {   id: student._id,
                    redirect: `${rootRedirect}/student?toastType=success&toastMessage=Your password has been reseted successfully`
                }, STUDENT_RESET_PASSWORD_HANDLER);
        } catch (error) {
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "STUDENT_RESET_PASSWORD_FAILED",
                "Student reset password failed", null, STUDENT_RESET_PASSWORD_HANDLER);
        }
    } catch (error) {
        createServerError(res, error, error.message, STUDENT_RESET_PASSWORD_HANDLER);
    }
}