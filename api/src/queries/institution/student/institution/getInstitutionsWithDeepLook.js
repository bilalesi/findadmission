import { Types } from "mongoose";
import httpStatus from 'http-status-codes';
import createServerError from "../../../../shared/error-handler";
import { createServerReply, createServerReplyError } from "../../../../shared/reply-handler";
import { isAuthedResolver as requireAuth } from "../../../../shared/permissions";
import StudentRepository from "../../../../repository/student";
import InstitutionRepository from "../../../../repository/institution";

const GET_INSTITUTIONS_WITH_DEEPLOOK = "get-institutions-with-deeplook";

/**
* @function getStudentProfileQuery
* @description get student profile
* @param {Object} request - request object
* @param {Object} reply - reply object
* @queryParam {Number} page - page of search
* @queryParam {Number} limit - page size of search
* @queryParam {String} sort - field to sort by, enum: { "title", "popularity", "random" }
* @returns {Object} reply
 */

export default requireAuth(async (req, res, next, { student }) => {
    try {
        let { page, limit, sort, countries, study_levels, entry_date, tuition_from, tuition_to } = req.query;
        page= page ? parseInt(page, 10) : 1;
        limit= limit ? parseInt(limit, 10) : 10;
        let query = {
            country: { $in: countries },
            study_levels: { $in: study_levels },
            study_entry_date: { $in: entry_date },
            tuition: { $gte: tuition_from, $lte: tuition_to },
        }
        const institution_filtered = await InstitutionRepository.get_institutions_sorted_populated_paginated({
            page, limit, sort, query,
        })
        let { docs, ...rest } = institution_filtered
        return createServerReply(res, httpStatus.CREATED, "INSTITUTIONS_FILTERED_FETHCED",
                "institution filtered successfully", {
            student: student._id,
            institutions: docs,
            ...rest,
        }, GET_INSTITUTIONS_WITH_DEEPLOOK);
    } catch (error) {
        createServerError(res, error, error.message, GET_INSTITUTIONS_WITH_DEEPLOOK);
    }
})