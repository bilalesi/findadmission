import CountryModel from '../schemas/country';
import StateModel from '../schemas/state';


const CountryRepository = {
    // @{function} get country by id
    // @{params} id
    async get_country_by_id(id) {
        return await CountryModel.findById(id);
    },
    // @{function} get country by country code
    // @{params} country code
    async get_country_by_code(code) {
        return await CountryModel.findOne({ code: code });
    },
    // @{function} get all countries
    // @{params}
    async get_all_countries() {
        return await CountryModel.find({});
    },
    // @{function} get all enabled country
    // @{params}
    async get_all_enabled_countries() {
        return await CountryModel.find({ enabled: true }).select("_id name code dial_code iso2").lean();
    },
    //
    async get_states_of_country(id) {
        return await StateModel.find({ country: id }).select('state_code name').lean();
    }
}


export default CountryRepository;