import mongoose from 'mongoose';
import paginator from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

const emailSchema = new Schema({
    from: { type: String, default: '' },
    to: { type: [{ type: String, default: '' }], default: [] },
    content: { type: String, default: ''  },
    templateId: { type: String, default: '' },
    dynamicData: { type: Map, of: String, default: {} },
    sendAt: { type: Date, default: "" },
}, {
    timestamps: true,
});



emailSchema.index({ from: 1 });
emailSchema.index({ to: 1 });
emailSchema.index({ sendAt: 1 });


emailSchema.plugin(paginator);
export default model('Email', emailSchema, 'Emails');