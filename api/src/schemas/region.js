import mongoose from 'mongoose';
import paginator from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

const regionSchema = new Schema({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    code: { type: String, default: '' },
    enabled: { type: Boolean, default: true },
}, {
    timestamps: true,
});



regionSchema.index({ code: 1 });
regionSchema.index({ title: 1 });


regionSchema.plugin(paginator);
export default model('Region', regionSchema, 'Regions');