import dayjs from 'dayjs';
import httpStatus from 'http-status-codes';
import createServerError from '../../../shared/error-handler';
import { createServerReply, createServerReplyError  } from '../../../shared/reply-handler';

import StudentRepository from "../../../repository/student";
import { generate_auth_token, generate_random_pin_6_digits, generate_validation_token } from '../../../shared/encryption/generate-jwt';
import validateStudentFn, { toDto } from "../../../validator/student";


const rootRedirect = IS_PROD ? `${process.env.APP_STUDENT_REDIRECT}/web/auth` : `${process.env.APP_STUDENT_REDIRECT}/web/auth`;
const STUDENT_SIGNIN_HANDLER = "student-signin-handler";



/**
* @function signInMutation
* @description sign up student
* @param {object} request - request object
* @param {object} reply - reply object
* @bodyParam {email} email - student email
* @bodyParam {password} password - student password
* @returns {object} - reply
 */
export default async (req, res, next) => {
    try {
        let { email, password } = req.body;
        if(!email || !password) {
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "MISSING_INPUT", "Missing some required input",
                { }, STUDENT_SIGNIN_HANDLER);
        }
        let student = await StudentRepository.get_student_by_email({ email: req.body.email })
        if(!student) {
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "STUDENT_NOT_EXIST", "Student not exist", {
                redirect: `${rootRedirect}/signin?toastType=error&toastMessage=This credentials do not much with any user in our platform`
            }, STUDENT_SIGNIN_HANDLER);
        }
        if(student.isValidPassword(password)) {
            try {
                let token = await generate_auth_token(student._id, "student", student.email);
                await StudentRepository.update_student({ id: student._id, student: { auth_token: token }});
                return createServerReply(res, httpStatus.OK, "AUTH_SUCCESS", "Student authenticated successfully",
                    {
                        id: student._id,
                        redirect: `${rootRedirect}/student?toastType=success&toastMessage=Welcome again to your space`,
                        isPhoneVerified: student.is_phone_verified,
                    }, STUDENT_SIGNIN_HANDLER);
            } catch (error) {
                return createServerReplyError(res, httpStatus.BAD_REQUEST, "GENERATING_TOKEN_FAILED",
                    "generating auth failed", null, STUDENT_SIGNIN_HANDLER);
            }
        }
        return createServerReplyError(res, httpStatus.BAD_REQUEST, "BAD_CREDENTIALS",
                    "bad credentials", null, STUDENT_SIGNIN_HANDLER);
    } catch (error) {
        createServerError(res, error, error.message, STUDENT_SIGNIN_HANDLER);
    }
}