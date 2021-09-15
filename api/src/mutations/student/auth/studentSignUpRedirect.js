import httpStatus from 'http-status-codes';
import createServerError from '../../../shared/error-handler';
import { createServerReply, createServerReplyError  } from '../../../shared/reply-handler';

import StudentRepository from "../../../repository/student";
import { generate_random_pin_6_digits, generate_validation_token } from '../../../shared/encryption/generate-jwt';
import validateStudentFn, { toDto } from "../../../validator/student";
import verifyJwt from '../../../shared/encryption/verify-jwt';


const rootRedirect = IS_PROD ? `${process.env.APP_STUDENT_REDIRECT}/auth` : `${process.env.APP_STUDENT_REDIRECT}/auth`;
const STUDENT_SIGNUP_REDIRECT_HANDLER = "student-signup-handler-redirect";


export default async (req, res, next) => {
    try {
        let { token } = req.query;
        let decoded = verifyJwt(token);
        if(!decoded.valid){
            return createServerReplyError(res, httpStatus.UNAUTHORIZED, "InvalidToken", "Invalid token", 
                null, STUDENT_SIGNUP_REDIRECT_HANDLER);
        }
        let 
        let dto = toDto(validatedInputs.values);
        try {
            let student = await StudentRepository.create_new_student(dto);
            let pin = generate_random_pin_6_digits();
            let token = generate_validation_token(student._id, 'student', student.email, pin);
            Promise.all([
                StudentRepository.update_pin(student._id, pin),
                StudentRepository.update_validation_token(student._id, token)
            ]).then((result) => {
                // TODO: send email pin and token url
                return createServerReply(res, httpStatus.CREATED, "StudentCreated", "Student created",
                    { id: student._id, redirect: `${rootRedirect}?token=${token}&toastType=success&toastMessage=Your email address has been validated!` }, STUDENT_SIGNUP_HANDLER);
            })
        } catch (error) {
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "StudentNotCreated",
                "Student not created", null, STUDENT_SIGNUP_HANDLER);
        }
    } catch (error) {
        createServerError(res, error, error.message, STUDENT_SIGNUP_HANDLER);
    }

}