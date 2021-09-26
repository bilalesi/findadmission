import dayjs from 'dayjs';
import httpStatus from 'http-status-codes';
import StudentRepository from "../../../repository/student";
import institutionUserRepository from '../../../repository/institution-user';
import institutionRepository from '../../../repository/institution';

import {
    generate_random_pin_6_digits,
    generate_validation_token
} from '../../../shared/encryption/generate-jwt';

import createServerError from '../../../shared/error-handler';
import { createServerReply, createServerReplyError  } from '../../../shared/reply-handler';
import verifyJwt from '../../../shared/encryption/verify-jwt';
import decodeJwt from '../../../shared/encryption/decode-jwt';

const IS_PROD = process.env.NODE_ENV === 'production';
const rootRedirect = IS_PROD ? `${process.env.APP_REDIRECT}/auth` : `${process.env.APP_REDIRECT}/auth`;
const SIGNUP_RESEND_PIN_HANDLER = "signup-resend-pin-handler";



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
        let { email, token, type } = req.body;
        let tokenDecoded = decodeJwt(token);
        console.log(SIGNUP_RESEND_PIN_HANDLER,  email, tokenDecoded);
        if(tokenDecoded.isDecoded && !tokenDecoded.decoded.email === email) {
            return createServerReplyError(res, httpStatus.BAD_REQUEST, 'INVALID_OPERATION', 'Invalid token', {}, SIGNUP_RESEND_PIN_HANDLER, );
        }
        let user = undefined;
        let entity = undefined;
        if(type === 'student') {
            user = await StudentRepository.get_student_by_email(email);
        } else if(type === 'entity') {
            user = await institutionUserRepository.get_institution_user_by_email(email);
            console.log("type === 'entity'", user);
            if(user){
                entity = await institutionRepository.get_institution_by_id(user.institution);
            }
        }
        if(!user){
            return createServerReplyError(res, httpStatus.BAD_REQUEST,
                    "INVALID_EMAIL", "Invalid email", {}, SIGNUP_RESEND_PIN_HANDLER);
        }
        console.log(SIGNUP_RESEND_PIN_HANDLER, entity);
        if(user.pin_reset_counter >= 3 || (entity && entity.pin_reset_counter >= 3)) {
            return createServerReply(res, httpStatus.CREATED, "PIN_REGENERATION_FAILED_QUOTA_EXEEDED", "User request more than 3 times for new pin",
                { id: user._id, message: { toastType: 'PIN regeneration', toastMessage: 'You request than 3 times for new pin, please contact findadmission support team' } }, SIGNUP_RESEND_PIN_HANDLER);
        }
        let pin = generate_random_pin_6_digits();
        let _token = generate_validation_token({ user_id: user._id, type: type === 'student' ? 'student' : 'institution', email: user.email, exp: 1 * 24 * 60 * 60  }); // 1 day
        console.log(SIGNUP_RESEND_PIN_HANDLER,  'pin', pin, 'token', _token);
        if(type === 'student') {
            Promise.all([
                StudentRepository.update_pin({ id: user._id, pin, pin_reset_counter: user.pin_reset_counter + 1 }),
                StudentRepository.update_validation_token({ id: user._id,  token: _token, expire_at: dayjs.unix(verifyJwt(_token, "AUTH_JWT_SIGNATURE").decoded.exp).toISOString() })
            ]).then((result) => {
                // TODO: send email pin and token url
                return createServerReply(res, httpStatus.CREATED, "PIN_REGENERATION_SUCCESS", "Student Pin regenerated one more time",
                    {
                        id: user._id,
                        redirect: `${rootRedirect}/validate-email?type=student&token=${_token}&email=${email}&toastType=success&toastMessage=A new pin has been sent to your email, please check your inbox` 
                    },
                    SIGNUP_RESEND_PIN_HANDLER);
            }).catch((err) => {
                console.log(err);
                return createServerReplyError(res, httpStatus.BAD_REQUEST, "PIN_REGENERATION_FAILED",
                    "Student pin not regenerated", err, SIGNUP_RESEND_PIN_HANDLER);
            })
        }else if(type === 'entity'){
            console.log("----------- entity --------- ")
            Promise.all([
                institutionRepository.update_pin({ id: entity._id, pin, pin_reset_counter: entity.pin_reset_counter + 1 }),
                institutionRepository.update_validation_token({ id: entity._id,  token: _token, expire_at: dayjs.unix(verifyJwt(_token, "AUTH_JWT_SIGNATURE").decoded.exp).toISOString() })
            ]).then((result) => {
                return createServerReply(res, httpStatus.CREATED, "PIN_REGENERATION_SUCCESS", "Institution Pin regenerated one more time",
                    {
                        id: user._id,
                        redirect: `${rootRedirect}/validate-email?type=entity&token=${_token}&email=${email}&toastType=success&toastMessage=A new pin has been sent to your email, please check your inbox`
                    },
                SIGNUP_RESEND_PIN_HANDLER);
            }).catch((err) => {
                return createServerReplyError(res, httpStatus.BAD_REQUEST, "PIN_REGENERATION_FAILED",
                    "Institution pin not regenerated", err, SIGNUP_RESEND_PIN_HANDLER);
            })
        }
    } catch (error) {
        return createServerError(res, error, error.message, SIGNUP_RESEND_PIN_HANDLER);
    }
}