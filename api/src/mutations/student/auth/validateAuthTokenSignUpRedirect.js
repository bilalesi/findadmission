import httpStatus from 'http-status-codes';
import createServerError from '../../../shared/error-handler';
import { createServerReply, createServerReplyError  } from '../../../shared/reply-handler';

import StudentRepository from "../../../repository/student";
import { generate_auth_token } from '../../../shared/encryption/generate-jwt';
import verifyJwt from '../../../shared/encryption/verify-jwt';


const rootRedirect = IS_PROD ? `${process.env.APP_STUDENT_REDIRECT}/web/auth` : `${process.env.APP_STUDENT_REDIRECT}/web/auth`;
const STUDENT_SIGNUP_REDIRECT_HANDLER = "student-signup-handler-redirect";


/**
* @function signUpRedirect
* @description This function is used to handle the student signup redirect
* @param {object} request - Request object
* @param {object} reply - Callback function
* @query {string} token - token to validate
* @returns {object} - reply
*/
export default async (req, res, next) => {
    try {
        let { token } = req.query;
        let decoded = verifyJwt(token);
        if(!decoded.valid){
            return createServerReplyError(res, httpStatus.UNAUTHORIZED, "INVALID_TOKEN", decoded.error,
                {
                    redirect: `${rootRedirect}?toastType=error&toastMessage=${decoded.error}`
                }, STUDENT_SIGNUP_REDIRECT_HANDLER);
        }
        let { user_id } = decoded;
        let student = await StudentRepository.get_student_by_id(user_id);
        if(!student){
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "STUDENT_NOT_EXIST", "Student not exist", 
            {}, STUDENT_SIGNUP_REDIRECT_HANDLER);
        }
        try {
            let token = generate_auth_token(student._id, "student", student.email);
            await StudentRepository.update_student({ id: student._id, auth_token: token });
            return createServerReply(res, httpStatus.OK, "AUTH_SUCCESS",
                    "Student Authenticate Succcessfully", {
                        token: token,
                        isPhoneVerified: student.is_phone_verified,
                        redirect: `${rootRedirect}/student?toastType=success&toastMessage=Welcome to your space`
                    }, STUDENT_SIGNUP_REDIRECT_HANDLER);
        } catch (error) {
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "STUDENT_AUTH_TOKEN_NOT_GENERATED",
                "Student token not generated", null, STUDENT_SIGNUP_REDIRECT_HANDLER);
        }
    } catch (error) {
        createServerError(res, error, error.message, STUDENT_SIGNUP_REDIRECT_HANDLER);
    }

}