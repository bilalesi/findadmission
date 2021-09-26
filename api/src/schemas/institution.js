import mongoose from 'mongoose';
import paginator from 'mongoose-paginate-v2';
import kebabCase from 'lodash/kebabCase';
import capitalize from 'lodash/capitalize';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 8);
const { Schema, model, Types } = mongoose;

const institutionSchema = new Schema({
    uri: { type: String, default: nanoid },
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    country: { type: Types.ObjectId, ref: 'Countries' },
    phone: { type: String, default: '', unique: true },
    whatsup: { type: String, default: '' },
    creator: { type: Types.ObjectId, ref: 'User' },
    website: { type: String, default: '' },
    logo: { type: String, default: '' },
    cover_picture: { type: String, default: '' },

    country: { type: Types.ObjectId, ref: 'Countries', default: null },
    state: { type: [{ type: Types.ObjectId, ref: 'States' }], default: [] },
    addressline1: { type: String, default: '' },
    addressline2: { type: String, default: '' },
    pictures: { type: [{ type: String, default: '' },], default: [] },
    videos: { type: [{ type: String, default: '' },], default: [] },

    subscription: { type: [{ type: Types.ObjectId, ref: 'ISubscriptions' }], default: [] },
    study_levels: { type: [{ type: Types.ObjectId, ref: 'Study_levels' }], default: [] },
    study_entry_date: { type: [Number], default: [] },
    regions_accept_applications: { type: [{ type: Types.ObjectId, ref: 'Regions' }], default: [] },
    levels_details: { type: [{
        id: { type: Types.ObjectId, ref: 'Study_levels' },
        name: { type: String, default: '' },
        dates: { type: [{
            date: { type: Number, },
            deadline: { type: Date },
         },], default: [] },
    }], default: [] },
    popularity: { type: Number, default: 0 },
    feeds: [{ type: Schema.Types.ObjectId, ref: 'Feeds' }],
    events: [{ type: Schema.Types.ObjectId, ref: 'Events' }],
    applications: [{ type: Schema.Types.ObjectId, ref: 'Applications' }],
    is_verified: { type: Boolean, default: false },
    is_phone_verified: { type: Boolean, default: false },
    sms_verification: { type: Number, default: false },
    six_6_degit_pin: { type: Number, default: false },
    pin_reset_counter: { type: Number, default: 0 },
    email_verification_token: { type: String, default: false },
    email_verification_token_expire: { type: Date, default: "" },
    auth_token: { type: String, default: '' },
}, {
    timestamps: true,
});


institutionSchema.pre('save', function (next) {
    const institution = this;
    institution.name = capitalize(institution.name);
    institution.uri = kebabCase(`${institution.name} ${nanoid()}`);
    return next();
});


institutionSchema.index({ uri: 1 });
institutionSchema.index({ name: 1 });

institutionSchema.plugin(paginator);
export default model('Institution', institutionSchema, 'Institutions');