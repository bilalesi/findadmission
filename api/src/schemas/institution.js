import mongoose from 'mongoose';
import paginator from 'mongoose-paginate-v2';

const { Schema, model, Types } = mongoose;

const institutionSchema = new Schema({
    title: { type: String, default: '' },
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
}, {
    timestamps: true,
});



feedSchinstitutionSchemaema.index({ code: 1 });


institutionSchema.plugin(paginator);
export default model('Institution', institutionSchema, 'Institutions');