import httpStatus from 'http-status-codes';
import createServerError from '../../../shared/error-handler';
import { createServerReply, createServerReplyError  } from '../../../shared/reply-handler';
import StudentRepository from "../../../repository/student";
import { generate_auth_token } from '../../../shared/encryption/generate-jwt';
import { isAuthedResolver as requireAuth } from '../../../shared/permissions';

const STUDENT_PHONE_VERIFICATION_FROM_FRONT_FIREBASE = "student-phone-verification-from-front-firebase";



/**
* @function validatePhoneNumberMutation
* @description - Validate student phone number from front (by firebase) and save it in database
* @param {object} request - Request object
* @param {object} reply - Callback function
* @bodyParam {Boolean} - is_phone_verified
* @returns {Object} - Reply object
 */
export default requireAuth( async (req, res, next, { student }) => {
    try {
        let { is_phone_verified } = req.body;
        try {
            student.is_phone_verified = is_phone_verified;
            await student.save();
            return createServerReply(res, httpStatus.OK, "PHONE_VERIFICATION_SUCCESS",
                    "Student Phone verification saved Succcessfully", {}, STUDENT_PHONE_VERIFICATION_FROM_FRONT_FIREBASE);
        } catch (error) {
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "STUDENT_PHONE_VERIFICATION_FAILED",
                "Student phone verification failed", null, STUDENT_PHONE_VERIFICATION_FROM_FRONT_FIREBASE);
        }
    } catch (error) {
        createServerError(res, error, error.message, STUDENT_PHONE_VERIFICATION_FROM_FRONT_FIREBASE);
    }
})