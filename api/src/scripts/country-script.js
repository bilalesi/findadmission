const debug = require('debug')('scripts:country-script');
import CoutryModel from '../schemas/country';
import run_connect_default_persistence_db from '../shared/db';
import countries from './json/countries-codes.json';



async function create_countries() {
    const countries_map = []
    for(let cr of countries) {
        let country = new CoutryModel({
            code: cr.code,
            dial_code: cr.dial_code,
            title: cr.name,
        })
        countries_map.push(country.save());
    }
    let total = await Promise.all(countries_map);
    debug(`
        total country added: ${total.length}
    `);
}



(async () => {
    await run_connect_default_persistence_db();
    await create_countries();
})()