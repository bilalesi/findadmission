import httpStatus from 'http-status-codes';
import createServerError from '../../../shared/error-handler';
import { createServerReply, createServerReplyError  } from '../../../shared/reply-handler';
import StudentRepository from "../../../repository/student";
import { generate_auth_token } from '../../../shared/encryption/generate-jwt';
import verifyJwt from '../../../shared/encryption/verify-jwt';


const STUDENT_SIGNUP_VALIDATE_PIN_HANDLER = "student-signup-validate-pin-handler";



/**
* @function signupValidatePinRedirect
* @description - Validate the student signup pin
* @param {object} request - Request object
* @param {object} reply - Callback function
* @bodyParam {String} - Pin
* @bodyParam {String} - student email
* @returns {Object} - Reply object
 */
export default async (req, res, next) => {
    try {
        let { pin, token } = req.body;
        console.log(STUDENT_SIGNUP_VALIDATE_PIN_HANDLER,req.body);
        let decodedToken = verifyJwt(token, "AUTH_JWT_SIGNATURE");
        console.log("decodedToken --> ", decodedToken.valid);
        if(decodedToken.valid) {
            console.log("decodedToken.data --> ", decodedToken.decoded);
            let user_id = decodedToken.decoded.user_id;
            let student = await StudentRepository.get_student_by_id(user_id);
            if(!student){
                return createServerReplyError(res, httpStatus.BAD_REQUEST,
                        "INVALID_STUDENT", "Invalid student", {}, STUDENT_SIGNUP_VALIDATE_PIN_HANDLER);
            }
            if(!pin || pin !== student.six_6_degit_pin){
                return createServerReplyError(res, httpStatus.BAD_REQUEST, "INVALID_PIN",
                        "Invalid pin", {}, STUDENT_SIGNUP_VALIDATE_PIN_HANDLER);
            }
            // let token = generate_auth_token(student._id, "student", student.email);
            student = await StudentRepository.update_student({ id: student._id, student: { is_verified: true } });
            console.log("student --> ", student);
            return createServerReply(res, httpStatus.OK, "AUTH_SUCCESS",
                    "Student Authenticate Succcessfully", {
                        isPhoneVerified: student.is_verified,
                        // redirect: `${rootRedirect}/student?toastType=success&toastMessage=Welcome to your space`
                     }, STUDENT_SIGNUP_VALIDATE_PIN_HANDLER);
            // try {
            //     // await StudentRepository.update_student({ id: student._id, auth_token: token, is_verified: true });
            // } catch (error) {
            //     return createServerReplyError(res, httpStatus.BAD_REQUEST, "STUDENT_AUTH_TOKEN_NOT_GENERATED",
            //         "Student token not generated", null, STUDENT_SIGNUP_VALIDATE_PIN_HANDLER);
            // }
        }else {
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "INVALID_TOKEN", "Invalid token", decodedToken.error, STUDENT_SIGNUP_VALIDATE_PIN_HANDLER);
        }
    } catch (error) {
        return createServerError(res, error, error.message, STUDENT_SIGNUP_VALIDATE_PIN_HANDLER);
    }
}