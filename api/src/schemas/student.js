import mongoose from 'mongoose';
import paginator from 'mongoose-paginate-v2';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 8);

const { Schema, model, Types } = mongoose;

const studentSchema = new Schema({
    uri: { type: String, default: nanoid },
    internalId: { type: String, default: nanoid, unique: true },
    firstname: { type: String, default: '' },
    lastname: { type: String, default: '' },
    fullname: { type: String, default: '' },
    descriptif_name: { type: String, default: '' },
    gender: { type: String, enum: ['male', 'female', ''], default: '' },
    birthday: { type: Date, default: '' },
    email: { type: String, default: '', unique: true },
    phone: { type: String, default: '', unique: true },
    whatsup: { type: String, default: '' },
    address: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        zip: { type: String, default: '' },
        country: { type: String, default: '' },
    },
    country: { type: Types.ObjectId, ref: 'Countries' },
    password: { type: String, default: '' },
    is_parent: { type: Boolean, default: false },
    type: { type: String, enum: ['student', 'parent'], default: 'student' },
    parent_fullname: { type: String, default: '' },
    follows: [{ type: Types.ObjectId, ref: 'Institutions' }],
    follows_ambassadors: [{ type: Types.ObjectId, ref: 'Ambassadors' }],
    wishlist: [{ type: Types.ObjectId, ref: 'Institutions' }],
    applications: [{ type: Types.ObjectId, ref: 'Applications' }],
    events: [{ type: Types.ObjectId, ref: 'Events' }],
    points: { type: Number, default: 0 },
    my_plan: {
        study_level: { type: Types.ObjectId, ref: 'Study_levels' },
        start_date: { type: Date, default: '' },
        budget: {
            from: { type: Number, default: 0 },
            to: { type: Number, default: 0 },
        },
        study_countries: [{ type: Types.ObjectId, ref: 'Study_countries' }],
        courses: [{ type: Types.ObjectId, ref: 'Courses' }],
    },
    personal_info: {
        passport: { type: String, default: '' },
        surname: { type: String, default: '' },
        other_name: { type: String, default: '' },
        addressline: { type: String, default: '' },
    },
    funding_source: {
        type: { type: String, enum: ['self', 'parents', 'family_friends', 'goverment_organisation', 'loadn', 'other'], default: '' },
        family_friends: {
            firstname: { type: String, default: '' },
            lastname: { type: String, default: '' },
            relationship: { type: String, default: '' },
            phone: { type: String, default: '' },
            email: { type: String, default: '' },
        },
        parents: {
            firstname: { type: String, default: '' },
            lastname: { type: String, default: '' },
            relationship: { type: String, default: '' },
            phone: { type: String, default: '' },
            email: { type: String, default: '' },
        },
        goverment_organisation: {
            applied_for_goverment: { type: Boolean, default: false },
            can_provide_evidence: { type: Boolean, default: false },
        },
        self: {
            how_intend_pay: { type: String, default: '' },
        },
        loan: {
            how_intend_pay: { type: String, default: '' },
        }
    },
    immegration_info: {
        refused_visa: { type: Boolean, default: false },
        need_visa: { type: Boolean, default: false },
        who_sponsor_education: { type: String, default: '' },
    },
    education: {
        secondary_education: {
            school: { type: String, default: '' },
            year_graduated: { type: Date, default: '' },
            grade: { type: String, default: '' },
            award_body: { type: String, default: '' },
            english_level: { type: String, default: '' },
        },
        heigher_education: { type: [{
            college: { type: String, default: '' },
            degree: { type: String, default: '' },
            area_study: { type: String, default: '' },
            year_graduated: { type: Date, default: '' },
            grade: { type: String, default: '' },
            gpa: { type: Number, default: '' },
            transcript_option: { type: String, default: '' },
            reference_letter_status: { type: String, default: '' },
        }], default: [] },
    },
    work_experience: {
        type: [{
            organisation: { type: String, default: '' },
            address: { type: String, default: '' },
            date: {
                from: { type: Date, default: '' },
                to: { type: Date, default: '' },
            },
            job_title: { type: String, default: '' },
            job_description: { type: String, default: '' },
        }],
        default: [],
    },
    documents: {
        type: [{
            passport: { type: [String], default: [] },
            certificate_bachelor: { type: [String], default: [] },
            transcript_bachelor: { type: [String], default: [] },
            certificate_secondary: { type: [String], default: [] },
            transcript_secondary: { type: [String], default: [] },
            transcript_certificate_secondary_en: { type: [String], default: [] },
        }],
        default: [],
    },
    is_verified: { type: Boolean, default: false },
    is_phone_verified: { type: Boolean, default: false },
    sms_verification: { type: Number, default: false },
    six_6_degit_pin: { type: Number, default: false },
    email_verification_token: { type: String, default: false },
    email_verification_token_expire: { type: Date, default: false },
    auth_token: { type: String, default: '' },
    reset_password_counter: { type: Number, default: 0 },
    subscription: { type: Types.ObjectId, ref: 'SSubscriptions', default: null },
}, {
    timestamps: true,
});


const hashedPassword = (password) => {
    const salt = bcrypt.genSaltSync(PASSWORD_SALT_ROUNDS);
    return bcrypt.hashSync(password, salt);
};

studentSchema.pre('save', function (next) {
    const student = this;
    student.email = student.email.toLowerCase();
    if (!student.isModified('password')) return next();
    student.password = hashedPassword(student.password);
    student.uri = _.kebabCase(`${student.type === 'student' ? 'student' : 'parent' } ${student.lastName} ${student.firstName} ${nanoid()}`);
    student.descriptif_name = student.type === 'student' ? `${student.firstName} ${student.lastName} ${student.email.split('@')[0]}`.toLocaleLowerCase() : '';
    student.fullname = student.type === 'student' ? `${student.firstName} ${student.lastName}`.toUpperCase() : '';
    return next();
});

studentSchema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.password);
};
studentSchema.index({ lastname: 1 });
studentSchema.index({ firstname: 1 });
studentSchema.index({ email: 1 });
studentSchema.index({ phone: 1 });
studentSchema.index({ fullname: 'text', email: 'text' });





studentSchema.plugin(paginator);
export default model('Student', studentSchema, 'Students');