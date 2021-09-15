import httpStatus from 'http-status-codes';
import createServerError from '../../../shared/error-handler';
import { createServerReply, createServerReplyError  } from '../../../shared/reply-handler';

import StudentRepository from "../../../repository/student";
import { generate_random_pin_6_digits, generate_validation_token } from '../../../shared/encryption/generate-jwt';
import validateStudentFn, { toDto } from "../../../validator/student";


const rootRedirect = IS_PROD ? `${process.env.APP_STUDENT_REDIRECT}/auth` : `${process.env.APP_STUDENT_REDIRECT}/auth`;
const STUDENT_SIGNUP_HANDLER = "student-signup-handler";


export default async (req, res, next) => {
    try {
        if((await StudentRepository.get_all_students_by_emailOrPhone({ email: req.body.email, phone: req.body.phone }) > 0)) {
            return createServerReplyError(res, httpStatus.CONFLICT, "StudentAlreadyExist", "Student already exist", {
                redirect: `${rootRedirect}?toastType=error&toastMessage=We ran into an issue validating this email address. You can re-enter your email address to resend a confirmation email`
            }, STUDENT_SIGNUP_HANDLER);
        }
        let validatedInputs = await validateStudentFn(req.body);
        if(!validatedInputs.valid){
            return createServerReply(res, httpStatus.BAD_REQUEST, "InvalidInput", "input data is not valid",
                { path: validatedInputs.error.field }, STUDENT_SIGNUP_HANDLER);
        }
        let dto = toDto(validatedInputs.values);
        try {
            let student = await StudentRepository.create_new_student(dto);
            let pin = generate_random_pin_6_digits();
            let token = generate_validation_token({ email: student.email, type: 'student', secret: pin, user_id: student._id });
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