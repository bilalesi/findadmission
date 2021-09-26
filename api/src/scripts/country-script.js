const debug = require('debug')('scripts:country-script');
import CoutryModel from '../schemas/country';
import State from '../schemas/state';
import run_connect_default_persistence_db from '../shared/db';
import countries from './json/countries+states.json';



async function create_countries() {
    const countries_map = []
    const states_map = []
    for(let cr of countries) {
        let country = new CoutryModel({
            states: cr.states,
            name: cr.name,
            code: cr.numeric_code,
            dial_code: cr.phone_code,
            image: cr.emoji,
            enabled: true,
            latitude: cr.latitude,
            longitude: cr.longitude,
            region: cr.region,
            subregion: cr.subregion,
            currency: cr.currency,
            currency_symbol: cr.currency_symbol,
            capital: cr.capital,
            iso2: cr.iso2,
            gmtOffsetName: cr.timezones[0].gmtOffsetName,
        })
        let states = cr.states.map(s => {
            let state = new State({
                country: country._id,
                name: s.name,
                id: s.id,
                state_code: s.state_code,
                latitude: s.latitude,
                longitude: s.longitude,
            })
            states_map.push(state.save())
        })
        countries_map.push(country.save());
    }
    let total = await Promise.all([...countries_map]);
    let totalState = await Promise.all([...states_map]);
    debug(` total country added: ${total.length} `);
    debug(` total country added: ${totalState.length} `);
}



(async () => {
   try {
    await run_connect_default_persistence_db();
    await create_countries();
    // await  CoutryModel.deleteMany({})
    // await State.deleteMany({});
    console.log('done')
   } catch (error) {
    console.error('error scripter', error);
   }
})()