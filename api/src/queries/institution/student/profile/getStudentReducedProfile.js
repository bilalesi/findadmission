import { Types } from "mongoose";
import httpStatus from 'http-status-codes';
import createServerError from "../../../../shared/error-handler";
import { createServerReply, createServerReplyError } from "../../../../shared/reply-handler";
import { isAuthedResolver as requireAuth } from "../../../../shared/permissions";
import StudentRepository from "../../../../repository/student";

const GET_STUDENT_PROFILE_HANDLER = "get-student-profile-handler";

/**
* @function getStudentProfileQuery
* @description get student profile
* @param {Object} request - request object
* @param {Object} reply - reply object
* @returns {Object} reply
 */

export default requireAuth(async (req, res, next, { student }) => {
    try {
        const profile = await StudentRepository.get_student_reduced_profile({ id: student._id })
        return createServerReply(res, httpStatus.CREATED, "FEEDS_FETHCED",
                "student feeds fetched successfully", {
            student: student._id,
            profile,
        }, GET_STUDENT_PROFILE_HANDLER);
    } catch (error) {
        createServerError(res, error, error.message, GET_STUDENT_PROFILE_HANDLER);
    }
})