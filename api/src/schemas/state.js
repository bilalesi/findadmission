import mongoose from 'mongoose';
import paginator from 'mongoose-paginate-v2';

const { Schema, model, Types} = mongoose;

const stateSchema = new Schema({
    'country': { type: Types.ObjectId, ref: "Countries", default: null, },
    'id': { type: Number, default: '' },
    'state_code': { type: String, default: '' },
    'name': { type: String, default: '' },
    'latitude': { type: String, default: '' },
    'longitude': { type: String, default: '' },
    'enabled': { type: Boolean, default: true },
}, {
    timestamps: true,
});



stateSchema.index({ country: 1 });
stateSchema.index({ state_code: 1 });
stateSchema.index({ name: 1 });

stateSchema.plugin(paginator);
export default model('State', stateSchema, 'States');