import express from 'express';

import getAllEnabledCountriesWithStates from '../queries/common/getAllEnabledCountriesWithStates';
import getStatesForSpecificCountry from '../queries/common/getStatesForSpecificCountry';

import resendAuthPinSignUp from '../mutations/common/identity/resendAuthPinSignUp.js';
import validateAuthPinSignupRedirect from '../mutations/common/identity/validateAuthPinSignupRedirect';

const router = express.Router();


const commonRoute = () => {
    router.route('/mulisious/get-countries').get(getAllEnabledCountriesWithStates);
    router.route('/mulisious/country/get-states').get(getStatesForSpecificCountry);
    router.route('/identity/resend-signup-pin').post(resendAuthPinSignUp);
    router.route('/identity/validate-singup-pin').post(validateAuthPinSignupRedirect);

    return router;
}


export default commonRoute;