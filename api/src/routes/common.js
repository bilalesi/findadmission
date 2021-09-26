import express from 'express';

import getAllEnabledCountriesWithStates from '../queries/common/getAllEnabledCountriesWithStates';
import getStatesForSpecificCountry from '../queries/common/getStatesForSpecificCountry';



const router = express.Router();


const commonRoute = () => {
    router.route('/mulisious/get-countries').get(getAllEnabledCountriesWithStates);
    router.route('/mulisious/country/get-states').get(getStatesForSpecificCountry);

    return router;
}


export default commonRoute;