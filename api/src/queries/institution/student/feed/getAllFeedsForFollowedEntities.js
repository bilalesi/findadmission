import { Types } from "mongoose";
import httpStatus from 'http-status-codes';
import createServerError from "../../../../shared/error-handler";
import { createServerReply, createServerReplyError } from "../../../../shared/reply-handler";
import institutionRepository from "../../../../repository/institution";
import feedRepository from "../../../../repository/feed";
import validateFeedFn from "../../../../validator/feed";
import { isAuthedResolver as requireAuth } from "../../../../shared/permissions";

const GET_STUDENT_FEEDS_SORTED_PAGINATED_HANDLER = "get-student-feeds-sorted-paginated-handler";
const rootRedirect = IS_PROD ? `${process.env.APP_STUDENT_REDIRECT}/feeds` : `${process.env.APP_STUDENT_REDIRECT}/feeds`;

/**
* @function getStudentFeedsSortedPaginatedQuery
* @description get all feeds sorted paginated for followed entities
* @param {Object} request - request object
* @param {Object} reply - reply object
* @queryPram {Number} page - page number, default= 0
* @queryParam {Number} limit - number of items per page, default= 10
* @queryParam {String} sort - sort by this field enum: { "post_date", "reactions" }
* @returns {Object} reply
 */

export default requireAuth(async (req, res, next, { student }) => {
    try {
        let { page = 0, limit = 10, sort="post_date" } = req.query;
        page = page ? parseInt(page, 10) : 0;
        limit = limit ? parseInt(limit, 10) : 10;
        sort = sort === 'post_date' ? 'createdAt' : 'reactions';
        const region = student.country;
        const followedEntities = [ ...student.follows, ...student.follows_ambassadors ].map(followId => Types.ObjectId(followId));
        const feeds = await feedRepository.get_all_student_feeds_sorted_paginated({ id: institution._id, region, page, limit, sort, follows: followedEntities });
        return createServerReply(res, httpStatus.CREATED, "FEEDS_FETHCED",
                "student feeds fetched successfully", {
            student: student._id,
            feeds,
            redirect: rootRedirect
        }, GET_STUDENT_FEEDS_SORTED_PAGINATED_HANDLER);
    } catch (error) {
        createServerError(res, error, error.message, GET_STUDENT_FEEDS_SORTED_PAGINATED_HANDLER);
    }
})