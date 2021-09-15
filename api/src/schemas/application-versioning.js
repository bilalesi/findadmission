import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const applicationVersionSchema = new Schema({
    student_app: {
        description: { type: String, default: '' },
        version: { type: String, default: '' },
        must_update: { type: Boolean, default: false },
        app_url: { type: String, default: '' },
    },
    institution_app: {
        description: { type: String, default: '' },
        version: { type: String, default: '' },
        must_update: { type: Boolean, default: false },
        app_url: { type: String, default: '' },
    },
    affiliations_app: {
        description: { type: String, default: '' },
        version: { type: String, default: '' },
        must_update: { type: Boolean, default: false },
        app_url: { type: String, default: '' },
    }
}, {
    timestamps: true,
});


export default model('Application_Version', applicationVersionSchema, 'Application_Versions');