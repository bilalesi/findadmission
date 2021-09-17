import mongoose from 'mongoose';
import paginator from 'mongoose-paginate-v2';

const { Schema, model, Types } = mongoose;

const commentSchema = new Schema({
    content: { type: String, required: true },
    commenter: { type: Types.ObjectId, ref: 'Students', default: null }
}, {
    timestamps: true,
});



commentSchema.index({ commenter: 1 });


commentSchema.plugin(paginator);
export default model('Comment', commentSchema, 'Comments');