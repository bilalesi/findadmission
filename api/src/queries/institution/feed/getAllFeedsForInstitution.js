import httpStatus from 'http-status-codes';
import createServerError from "../../../shared/error-handler";
import { createServerReply, createServerReplyError } from "../../../shared/reply-handler";
import institutionRepository from "../../../repository/institution";
import feedRepository from "../../../repository/feed";
import validateFeedFn from "../../../validator/feed";
import { isAuthedInstitutionResolver as requireAuth } from "../../../shared/permissions";


const GET_INSTITUTION_FEEDS_SORTED_PAGINATED_HANDLER = "get-institution-feeds-sorted-paginated-handler";
const rootRedirect = IS_PROD ? `${process.env.APP_INSTITUATION_REDIRECT}/feeds` : `${process.env.APP_INSTITUATION_REDIRECT}/web/auth`;

/**
* @function getInstitutionFeedsSortedPaginatedQuery
* @description get all institution feeds paginated
* @param {Object} request - request object
* @param {Object} reply - reply object
* @queryPram {Number} page - page number, default= 0
* @queryParam {Number} limit - number of items per page, default= 10
* @queryParam {String} sort - sort by this field enum: { "post_date", "reactions" }
* @returns {Object} reply
 */

export default requireAuth(async (req, res, next, { institution }) => {
    try {
        let { page = 0, limit = 10, sort="post_date" } = req.query;
        page = page ? parseInt(page, 10) : 0;
        limit = limit ? parseInt(limit, 10) : 10;
        sort = sort === 'post_date' ? 'createdAt' : 'reactions';
        const feeds = await feedRepository.get_all_feeds_sorted_paginated({ id: institution._id, page, limit, sort });
        return createServerReply(res, httpStatus.CREATED, "FEEDS_FETHCED",
                "Institution feeds fetched successfully", {
            institution: institution._id, feeds
        }, GET_INSTITUTION_FEEDS_SORTED_PAGINATED_HANDLER); 
    } catch (error) {
        return createServerError(res, error, error.message, GET_INSTITUTION_FEEDS_SORTED_PAGINATED_HANDLER);
    }
})