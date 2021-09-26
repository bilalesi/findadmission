import dayjs from 'dayjs';
import httpStatus from 'http-status-codes';
import createServerError from '../../../shared/error-handler';
import { createServerReply, createServerReplyError  } from '../../../shared/reply-handler';
import institutionRepository from '../../../repository/institution';
import institutionUserRepository from '../../../repository/institution-user';

import { generate_random_pin_6_digits, generate_validation_token } from '../../../shared/encryption/generate-jwt';
import validateInstitutionFn, { toDto, toInstitutionDto, toInstitutionUserDto } from "../../../validator/institution";
import verifyJwt from '../../../shared/encryption/verify-jwt';

const IS_PROD = process.env.NODE_ENV === 'production';
const rootRedirect = IS_PROD ? `${process.env.APP_REDIRECT}/auth` : `${process.env.APP_REDIRECT}/auth`;
const INSTITUTION_SIGNUP_HANDLER = "institution-signup-handler";



/**
* @function signUpInstitutionMutation
* @description sign up institution
* @param {object} request - request object
* @param {object} reply - reply object
* @bodyParam {object} student - student object
* @returns {object} - reply
 */
export default async (req, res, next) => {
    try {
        let { entity } = req.query;
        console.log('req body', INSTITUTION_SIGNUP_HANDLER, req.body);
        if(entity !== 'institution') {
            return createServerReplyError(res, httpStatus.BAD_REQUEST,
                'INVALID_INSTITUTION', 'entity must be institution', null, INSTITUTION_SIGNUP_HANDLER);
        }
        if((await institutionUserRepository.get_institution_user_by_email(req.body.email))) {
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "INSTITUTION_USER_ALREADY_EXIST", "institution user already exist", {
                redirect: `${rootRedirect}?entity=${entity}toastType=error&toastMessage=we find that this provided user has a seat in our system`
            }, INSTITUTION_SIGNUP_HANDLER);
        }
        let validatedInputs = await validateInstitutionFn(req.body);
        if(!validatedInputs.valid){
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "INVALID_INPUT", "input data is not valid",
                { path: validatedInputs.error.field }, INSTITUTION_SIGNUP_HANDLER);
        }
        let institutionDto = toInstitutionDto(validatedInputs.values);
        let institutionUserDto = toInstitutionUserDto(validatedInputs.values);

        try {
            let [institution, institutionUser] = await Promise.all([
                institutionRepository.create_new_institution(institutionDto),
                institutionUserRepository.create_new_institution_user(institutionUserDto)
            ])
            institutionUser.institution = institution._id;
            institution.creator = institutionUser._id;
            ([institution, institutionUser] = await Promise.all([
                institution.save(),
                institutionUser.save(),
            ]));
            let pin = generate_random_pin_6_digits();
            let token = generate_validation_token({ email: institutionUser.email, type: 'institution', user_id: institutionUser._id, exp: 3 * 24 * 60 * 60 * 1000 }); // 3 days
            Promise.all([
                institutionRepository.update_pin({ id: institution._id, pin }),
                institutionRepository.update_validation_token({ id: institution._id, token,  expire_at: dayjs.unix(verifyJwt(token, "AUTH_JWT_SIGNATURE").decoded.exp ).toDate() })
            ]).then((result) => {
                // TODO: send email pin and token url
                return createServerReply(res, httpStatus.CREATED, "INSTITUTION_AND_USER_CREATED", "institution and user created",
                    { id: institutionUser._id, redirect: `${rootRedirect}/validate-email?token=${token}&email=${institutionUser.email}&type=entity` }, INSTITUTION_SIGNUP_HANDLER);
            }).catch((err) => {
                return createServerReplyError(res, httpStatus.BAD_REQUEST, "UPDATE_PIN_FAILED", "update pin and token failed",
                null, INSTITUTION_SIGNUP_HANDLER, err);
            })
        } catch (error) {
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "INSTITUTION_AND_USER_NOT_CREATED",
                "institution and user creator not created", null, INSTITUTION_SIGNUP_HANDLER, error);
        }
    } catch (error) {
        return createServerError(res, error, error.message, INSTITUTION_SIGNUP_HANDLER);
    }
}