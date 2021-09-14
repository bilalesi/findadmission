import mongoose from 'mongoose';
import paginator from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

const countrySchema = new Schema({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    code: { type: String, default: '' },
    dial_code: { type: String, default: '' },
    image: { type: String, default: '' },
    enabled: { type: Boolean, default: true },
}, {
    timestamps: true,
});



countrySchema.index({ code: 1 });
countrySchema.index({ title: 1 });


countrySchema.plugin(paginator);
export default model('Country', countrySchema, 'Countries');