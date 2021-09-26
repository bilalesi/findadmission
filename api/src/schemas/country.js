import mongoose from 'mongoose';
import paginator from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

const countrySchema = new Schema({
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    code: { type: String, default: '' },
    dial_code: { type: String, default: '' },
    image: { type: String, default: '' },
    enabled: { type: Boolean, default: true },
    latitude: { type: String, default: '' },
    longitude: { type: String, default: '' },
    region: { type: String, default: '' },
    subregion: { type: String, default: '' },
    currency: { type: String, default: '' },
    currency_symbol: { type: String, default: '' },
    capital: { type: String, default: '' },
    iso2: { type: String, default: '' },
    gmtOffsetName: { type: String, default: '' },
    states: [{
        'id': { type: Number, default: '' },
        'state_code': { type: String, default: '' },
        'name': { type: String, default: '' },
        'latitude': { type: String, default: '' },
        'longitude': { type: String, default: '' },
     }]
}, {
    timestamps: true,
});



countrySchema.index({ name: 1 });
countrySchema.index({ code: 1 });
countrySchema.index({ region: 1 });
countrySchema.index({ subregion: 1 });
countrySchema.index({ iso2: 1 });


countrySchema.plugin(paginator);
export default model('Country', countrySchema, 'Countries');