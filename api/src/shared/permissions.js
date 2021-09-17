import httpStatus from 'http-status-codes';
import StudentRepository from "../repository/student";
import institutionRepository from '../repository/institution';
import { createServerReplyError } from "./reply-handler";
import createServerError from './error-handler';

import verifyJwt from "./encryption/verify-jwt";

const REQUIRE_AUTH_PERMISSION_MIDDELWARE = "require-auth-permission-middelware";


export const isAuthedResolver = (resolver) => async (req, res, next) => {
    let token = req.headers.Authorization;
    let tokenDecoded;
    try {
        tokenDecoded = verifyJwt(token, "AUTH_JWT_SIGNATURE");
        if(!tokenDecoded.valid){
            return createServerReplyError(res, httpStatus.BAD_REQUEST,
                "INVALID_TOKEN", tokenDecoded.error, {}, REQUIRE_AUTH_PERMISSION_MIDDELWARE);
        }
        let student = await StudentRepository.get_student_by_id_basic(tokenDecoded.decoded.sub);
        if(!student){
            return createServerReplyError(res, httpStatus.BAD_REQUEST,
                "STUDENT_NOT_FOUND", "Student not found", {}, REQUIRE_AUTH_PERMISSION_MIDDELWARE);
        }
        return resolver(req, res, next, { student });
    } catch (err) {
        return createServerError(res, "ERROR_CHECK_AUTH_PERMISSION",
                err.message, REQUIRE_AUTH_PERMISSION_MIDDELWARE);
    }
}


export const isAuthedInstitutionResolver = resolver => async (req, res, next, ) => {
    let token = req.headers.Authorization;
    let tokenDecoded;
    try {
        tokenDecoded = verifyJwt(token, "AUTH_JWT_SIGNATURE");
        if(!tokenDecoded.valid){
            return createServerReplyError(res, httpStatus.BAD_REQUEST,
                "INVALID_TOKEN", tokenDecoded.error, {}, REQUIRE_AUTH_PERMISSION_MIDDELWARE);
        }
        let institution = await institutionRepository.get_institution_by_id(tokenDecoded.decoded.sub);
        if(!institution){
            return createServerReplyError(res, httpStatus.BAD_REQUEST,
                "INSTITUTION_NOT_FOUND", "Institution not found", {}, REQUIRE_AUTH_PERMISSION_MIDDELWARE);
        }
        return resolver(req, res, next, { institution });
    } catch (err) {
        return createServerError(res, "ERROR_CHECK_AUTH_PERMISSION",
                err.message, REQUIRE_AUTH_PERMISSION_MIDDELWARE);
    }
}