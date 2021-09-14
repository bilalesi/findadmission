import CountryModel from '../schemas/country';



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
    }

}


export default CountryRepository;