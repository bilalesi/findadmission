
import httpStatus from 'http-status-codes';
import createServerError from "../../shared/error-handler";
import { createServerReply, createServerReplyError } from "../../shared/reply-handler";

import countryRepository from '../../repository/country';

const GET_STATES_FOR_SPECIFIC_COUNTRY = "get-states-for-specific-country";


export default async (req, res) => {
    try {
        let { countryId } = req.query;
        console.log(`${GET_STATES_FOR_SPECIFIC_COUNTRY}`, countryId);
        const states = await countryRepository.get_states_of_country(countryId);
        console.log(`${GET_STATES_FOR_SPECIFIC_COUNTRY} - ${states.length}`);
        return createServerReply(res, httpStatus.OK, "STATES_COUNTRY_FETCHED", "State for Country fetched successfully", {
            states
        }, GET_STATES_FOR_SPECIFIC_COUNTRY);
    } catch (error) {
        return createServerError(res, error, error.message, GET_STATES_FOR_SPECIFIC_COUNTRY);
    }
}