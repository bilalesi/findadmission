import mongoose from 'mongoose';
import paginator from 'mongoose-paginate-v2';

const { Schema, modelNames, Types } = mongoose;

const stateSchema = new Schema({
    country: { type: Types.ObjectId, ref: "Countries", default: null, },
    title: { type: String, default: '' },
    zip: { type: String, default: '' },
    enabled: { type: Boolean, default: true },
}, {
    timestamps: true,
});



stateSchema.index({ country: 1 });
stateSchema.index({ title: 1 });
stateSchema.index({ zip: 1 });

stateSchema.plugin(paginator);
export default model('State', stateSchema, 'States');