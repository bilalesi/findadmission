
import httpStatus from 'http-status-codes';
import createServerError from "../../shared/error-handler";
import { createServerReply, createServerReplyError } from "../../shared/reply-handler";

import countryRepository from '../../repository/country';

const GET_COUNTRIES_WITH_STATES = "get-countries-with-states";


export default async (req, res) => {
    try {
        console.log(`${GET_COUNTRIES_WITH_STATES}`);
        const countries = await countryRepository.get_all_enabled_countries();
        console.log(`${GET_COUNTRIES_WITH_STATES} - ${countries.length}`);
        return createServerReply(res, httpStatus.OK, "COUNTRIES_FETCHED", "Countries fetched successfully", {
            countries,
            debug: false,
        }, GET_COUNTRIES_WITH_STATES);
    } catch (error) {
        return createServerError(res, error, error.message, GET_COUNTRIES_WITH_STATES);
    }
}