import mongoose from 'mongoose';
import paginator from 'mongoose-paginate-v2';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
const { Schema, model, Types } = mongoose;

let regions = [
    "west_africa", "east_africa", "north_africa", "south_africa", "south_asia", "east_asia", "north_asia",
    "west_asia", "west_eu", "east_eu", "north_eu", "south_eu", "north_us"];

const eventSchema = new Schema({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    datetime: { type: String, default: '' },
    duration: { type: String, default: '' }, // default minutes
    timezone: { type: String, default: '' },
    student_region: { type: [{ type: String, default: '' }], default: [''] },
    uri: { type: String, default: nanoid },
    attendees_counter: {
        fa: { type: Number, default: 0 },
        unique_uri: { type: Number, default: 0 },
        tickets: { type: Number, default: 0 },
    },
    attendees: { type: [{ type: Types.ObjectId, ref: 'Students', default: null }], default: [] },
    creator: { type: Types.ObjectId, ref: 'Users', default: null },
}, {
    timestamps: true,
});



eventSchema.index({ code: 1 });


eventSchema.plugin(paginator);
export default model('Event', eventSchema, 'Events');