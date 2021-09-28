import httpStatus from 'http-status-codes';
import createServerError from '../../../shared/error-handler';
import { createServerReply, createServerReplyError  } from '../../../shared/reply-handler';
import StudentRepository from "../../../repository/student";
import { generate_auth_token } from '../../../shared/encryption/generate-jwt';
import verifyJwt from '../../../shared/encryption/verify-jwt';
import institutionUserRepository from '../../../repository/institution-user';
import institutionRepository from '../../../repository/institution';


const IS_PROD = process.env.NODE_ENV === 'production';
const SIGNIN_HANDLER = "signin--handler";
const rootRedirect = IS_PROD ? `${process.env.APP_STUDENT_REDIRECT}/entity` : `${process.env.APP_STUDENT_REDIRECT}/entity`;

export default async (req, res, next) => {
    try {
        let { email, password, type } = req.body;
        console.log(SIGNIN_HANDLER,req.body);
        if(!email || !password) {
            return createServerReplyError(res, httpStatus.BAD_REQUEST, 'EMAIL_OR_PASSWORD_MISSING',
                'Email and password are required', null, SIGNIN_HANDLER, null);
        }
        if(type === 'student') {
            let student = await StudentRepository.get_student_by_email(email);
            console.log(SIGNIN_HANDLER,student);
            if(!student || !student.isValidPassword(password)) {
                return createServerReplyError(res, httpStatus.BAD_REQUEST, 'EMAIL_OR_PASSWORD_NOT_VALID',
                    'Email or password are not valid', null, SIGNIN_HANDLER, 'EMAIL_OR_PASSWORD_NOT_VALID');
            }
            let token = generate_auth_token({ user_id: student._id, type: 'student', email: student.email,  });
            console.log('token', token);
            return createServerReply(res, httpStatus.OK, 'SIGNIN_SUCCESS', 'Signin success', {
                token,
                userId: student._id,
                email: student.email,
                redirect: `${rootRedirect}/student`
            }, SIGNIN_HANDLER);
        } else if(type === 'institution') {
            let institutionUser = await institutionUserRepository.get_institution_user_by_email(email);
            if(!institutionUser || !institutionUser.isValidPassword(password)) {
                throw createServerReplyError(res, httpStatus.BAD_REQUEST, 'EMAIL_OR_PASSWORD_NOT_VALID',
                    'Email or password are not valid', null, SIGNIN_HANDLER, 'EMAIL_OR_PASSWORD_NOT_VALID');
            }
            let institution = await institutionRepository.get_institution_by_id(institutionUser.institution);
            let token = generate_auth_token({
                user_id: institutionUser._id, type: 'institution',
                email: institutionUser.email, institution: institution._id
            });
            return createServerReply(res, httpStatus.OK, 'SIGNIN_SUCCESS', 'Signin success', {
                token,
                userId: institutionUser._id,
                email: institutionUser.email,
                institution: institution._id,
                redirect: `${rootRedirect}/institution`
            }, SIGNIN_HANDLER);
        } else {
            throw createServerReplyError(res, httpStatus.BAD_REQUEST, 'TYPE_NOT_VALID',
                'Type not valid', null, SIGNIN_HANDLER, null);
        }
    } catch (error) {
        return createServerError(res, error, error.message, SIGNIN_HANDLER);
    }
}