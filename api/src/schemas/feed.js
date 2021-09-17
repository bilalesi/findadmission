import mongoose from 'mongoose';
import paginator from 'mongoose-paginate-v2';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
const { Schema, model } = mongoose;

const feedSchema = new Schema({
    uri: { type: String, default: nanoid },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    institution: { type: Types.ObjectId, ref: 'Institutions', default: null },
    ambassador: { type: Types.ObjectId, ref: 'Ambassadors', default: null },
    regions: { type: [{ type: Types.ObjectId, ref: 'Countries' }], default: [] },
    youtube: { type: String, default: '' },
    pictures: { type: [{ type: String, default: '' }], default: [] },
    videos: { type: [{ type: String, default: ''  }], default: [] },
    likes: { type: [{ type: Types.ObjectId, ref: 'Students', default: null }], default: [] },
    comments: { type: [{ type: Types.ObjectId, ref: 'Comments', default: null }], default: [] },
}, {
    timestamps: true,
});



feedSchema.index({ title: 1 });
feedSchema.index({ region: 1 });
feedSchema.index({ institution: 1 });


feedSchema.plugin(paginator);
export default model('Feed', feedSchema, 'Feeds');