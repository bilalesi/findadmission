import mongoose from 'mongoose';
import paginator from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

const institutionUserSchema = new Schema({
    internalId: { type: String, default: nanoid, unique: true },
    firstname: { type: String, default: '' },
    lastname: { type: String, default: '' },
    fullname: { type: String, default: '' },
    descriptif_name: { type: String, default: '' },
    gender: { type: String, enum: ['male', 'female', ''], default: '' },
    birthday: { type: Date, default: '' },
    email: { type: String, default: '', unique: true },
    phone: { type: String, default: '', unique: true },
    password: { type: String, default: '' },
    job_title: { type: String, default: '' },
    role: { type: String, default: 'admin', enum: ['creator', 'admin', 'user', 'guest'] },
    institution: { type: Schema.Types.ObjectId, ref: 'Institutions' },
    creator: { type: Boolean, default: false },
    points: { type: Number, default: 0 },



    feeds: [{ type: Schema.Types.ObjectId, ref: 'Feeds' }],
    events: [{ type: Schema.Types.ObjectId, ref: 'Events' }],
    applications: [{ type: Schema.Types.ObjectId, ref: 'Applications' }],

}, {
    timestamps: true,
});



institutionUserSchema.index({ internalId: 1 });
institutionUserSchema.index({ fullname: 1 });


institutionUserSchema.plugin(paginator);
export default model('Institution_user', institutionUserSchema, 'Institution_users');