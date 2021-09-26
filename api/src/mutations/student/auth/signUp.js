import dayjs from 'dayjs';
import httpStatus from 'http-status-codes';
import createServerError from '../../../shared/error-handler';
import { createServerReply, createServerReplyError  } from '../../../shared/reply-handler';

import StudentRepository from "../../../repository/student";
import { generate_random_pin_6_digits, generate_validation_token } from '../../../shared/encryption/generate-jwt';
import validateStudentFn, { toDto } from "../../../validator/student";
import verifyJwt from '../../../shared/encryption/verify-jwt';

const IS_PROD = process.env.NODE_ENV === 'production';
const rootRedirect = IS_PROD ? `${process.env.APP_REDIRECT}/auth` : `${process.env.APP_REDIRECT}/auth`;
const STUDENT_SIGNUP_HANDLER = "student-signup-handler";



/**
* @function signUpStudentMutation
* @description sign up student
* @param {object} request - request object
* @param {object} reply - reply object
* @bodyParam {object} student - student object
* @returns {object} - reply
 */
export default async (req, res, next) => {
    try {
        let { entity } = req.query;
        console.log(STUDENT_SIGNUP_HANDLER, req.query, req.body);
        if((await StudentRepository.get_all_students_by_emailOrPhone({ email: req.body.email, phone: req.body.phone }) > 0)) {
            return createServerReplyError(res, httpStatus.CONFLICT, "STUDENT_ALREADY_EXIST", "Student already exist", {
                redirect: `${rootRedirect}?entity=${entity}toastType=error&toastMessage=we find that this provided user has a seat in our system`
            }, STUDENT_SIGNUP_HANDLER);
        }
        let validatedInputs = await validateStudentFn(req.body);
        if(!validatedInputs.valid){
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "INVALID_INPUT", "input data is not valid",
                { path: validatedInputs.error.field }, STUDENT_SIGNUP_HANDLER);
        }
        let dto = toDto(validatedInputs.values);
        try {
            let student = await StudentRepository.create_new_student(dto);
            let pin = generate_random_pin_6_digits();
            let token = generate_validation_token({ email: student.email, type: 'student', user_id: student._id, exp: 3 * 24 * 60 * 60 * 1000 }); // 3 days
            console.log('token', token, verifyJwt(token, "AUTH_JWT_SIGNATURE"));
            Promise.all([
                StudentRepository.update_pin({ id: student._id, pin }),
                StudentRepository.update_validation_token({ id: student._id, token,  expire_at: dayjs.unix(verifyJwt(token, "AUTH_JWT_SIGNATURE").decoded.exp).toDate() })
            ]).then((result) => {
                console.log('---> result', result);
                // TODO: send email pin and token url
                return createServerReply(res, httpStatus.CREATED, "STUDENT_CREATED", "Student created",
                    { id: student._id, redirect: `${rootRedirect}/validate-email?token=${token}&email=${student.email}` }, STUDENT_SIGNUP_HANDLER);
            })
        } catch (error) {
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "STUDENT_NOT_CREATED",
                "Student not created", null, STUDENT_SIGNUP_HANDLER, error);
        }
    } catch (error) {
        return createServerError(res, error, error.message, STUDENT_SIGNUP_HANDLER);
    }
}