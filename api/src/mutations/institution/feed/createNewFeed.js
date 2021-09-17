import httpStatus from 'http-status-codes';
import createServerError from "../../../shared/error-handler";
import { createServerReply, createServerReplyError } from "../../../shared/reply-handler";
import institutionRepository from "../../../repository/institution";
import feedRepository from "../../../repository/feed";
import validateFeedFn from "../../../validator/feed";
import { isAuthedInstitutionResolver as requireAuth } from "../../../shared/permissions";


const CREATE_NEW_INSTITUTION_FEED_HANDLER = "create-new-institution-feed-handler";
const rootRedirect = IS_PROD ? `${process.env.APP_INSTITUATION_REDIRECT}/feeds` : `${process.env.APP_INSTITUATION_REDIRECT}/web/auth`;

/**
* @function createNewFeedMutation
* @description create a new feed from institution dashboard
* @param {Object} request - request object
* @param {Object} reply - reply object
* @bodyParam {String} description - description
* @bodyParam {Array<String>} regions - region array
* @bodyParam {String<URI>} youtube - youtube uri
* @bodyParam {Array<String>} pictures - pictures array
* @bodyParam {Array<String>} videos - videos array
* @returns {Object} reply
 */
export default requireAuth(async (req, res, next, { institution }) => {
    try {
        const validatedInputs = await validateFeedFn({ ...req.body, institution: institution._id });
        if(!validatedInputs.valid){
            return createServerReplyError(res, httpStatus.BAD_REQUEST, "INVALID_INPUT", "input data is not valid",
                { path: validatedInputs.error.field }, CREATE_NEW_INSTITUTION_FEED_HANDLER);
        }
        const newFeed = await feedRepository.create_new_feed(validatedInputs.values);
        return createServerReply(res, httpStatus.CREATED, "FEED_CREATED", "New institution feed created successfully", {
            feed: newFeed._id,
            redirect: `${rootRedirect}`
        }, CREATE_NEW_INSTITUTION_FEED_HANDLER);
    } catch (error) {
        createServerError(res, error, error.message, CREATE_NEW_INSTITUTION_FEED_HANDLER);
    }
})