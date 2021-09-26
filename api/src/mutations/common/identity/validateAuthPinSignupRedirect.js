import httpStatus from 'http-status-codes';
import createServerError from '../../../shared/error-handler';
import { createServerReply, createServerReplyError  } from '../../../shared/reply-handler';
import StudentRepository from "../../../repository/student";
import { generate_auth_token } from '../../../shared/encryption/generate-jwt';
import verifyJwt from '../../../shared/encryption/verify-jwt';
import institutionUserRepository from '../../../repository/institution-user';
import institutionRepository from '../../../repository/institution';


const SIGNUP_VALIDATE_PIN_HANDLER = "signup-validate-pin-handler";



/**
* @function signupValidatePinRedirect
* @description - Validate the student signup pin
* @param {object} request - Request object
* @param {object} reply - Callback function
* @bodyParam {String} - Pin
* @bodyParam {String} - user email
* @returns {Object} - Reply object
 */
export default async (req, res, next) => {
    try {
        let { pin, token, type } = req.body;
        let decodedToken = verifyJwt(token, "AUTH_JWT_SIGNATURE");

        if(decodedToken.valid) {
            let user_id = decodedToken.decoded.user_id;
            let user = undefined;
            let entity = undefined;
            if(type === "student") {
                user = await StudentRepository.get_student_by_id(user_id);
                if(!pin || (pin !== user.six_6_degit_pin)) {
                    return createServerReplyError(res, httpStatus.BAD_REQUEST, "INVALID_PIN",
                        "Invalid pin", {}, SIGNUP_VALIDATE_PIN_HANDLER);
                }
                user = await StudentRepository.update_student({ id: user._id, student: { is_verified: true } });
                return createServerReply(res, httpStatus.OK, "PIN_VALIDATED_SUCCESS",
                    "Student PIN Validated Succcessfully", {
                        isVerified: type === "student" ? user.is_verified : type === "entity" ? entity.is_verified : false,
                    }, SIGNUP_VALIDATE_PIN_HANDLER);
            }
            else if(type === "entity") {
                user = await institutionUserRepository.get_institution_user_by_id(user_id);
                if(user){
                    entity = await institutionRepository.get_institution_by_id(user.institution);
                }
                console.log("entuty -----> ",entity, entity.six_6_degit_pin);
                console.log("entuty pin -----> ",pin);
                if(!pin || (entity && pin !== entity.six_6_degit_pin)){
                    return createServerReplyError(res, httpStatus.BAD_REQUEST, "INVALID_PIN",
                            "Invalid pin", { }, SIGNUP_VALIDATE_PIN_HANDLER);
                }
                user = await institutionRepository.update_institution({ id: entity._id, institution: { is_verified: true } });
                return createServerReply(res, httpStatus.OK, "PIN_VALIDATED_SUCCESS",
                    "Entity PIN Validated Succcessfully", {
                        isVerified: entity.is_verified,
                     }, SIGNUP_VALIDATE_PIN_HANDLER);
            }
        }else {
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "INVALID_TOKEN", "Invalid PIN, please check again", decodedToken.error, SIGNUP_VALIDATE_PIN_HANDLER);
        }
    } catch (error) {
        return createServerError(res, error, error.message, SIGNUP_VALIDATE_PIN_HANDLER);
    }
}