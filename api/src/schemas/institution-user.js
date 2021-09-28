import mongoose from 'mongoose';
import paginator from 'mongoose-paginate-v2';
import upperFirst from 'lodash/upperFirst';
import upperCase from 'lodash/upperCase';
import kebabCase from 'lodash/kebabCase';
import trim from 'lodash/trim';
import bcrypt from 'bcrypt';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 8);




const { Schema, model, Types } = mongoose;

const institutionUserSchema = new Schema({
    internalId: { type: String, default: nanoid },
    firstname: { type: String, default: '' },
    lastname: { type: String, default: '' },
    fullname: { type: String, default: '' },
    descriptif_name: { type: String, default: '' },
    gender: { type: String, enum: ['male', 'female', ''], default: '' },
    birthday: { type: Date, default: '' },
    email: { type: String, default: '', },
    phone: { type: String, default: '', },
    password: { type: String, default: '' },
    job_title: { type: String, default: '' },
    role: { type: String, default: 'admin', enum: ['creator', 'admin', 'user', 'guest'] },
    institution: { type: Types.ObjectId, ref: 'Institutions' },
    creator: { type: Boolean, default: false },
    points: { type: Number, default: 0 },
}, {
    timestamps: true,
});

const hashedPassword = (password) => {
    const salt = bcrypt.genSaltSync(Number(process.env.PASSWORD_SALT_ROUNDS));
    return bcrypt.hashSync(password, salt);
};

institutionUserSchema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.password);
};

institutionUserSchema.pre('save', function (next) {
    try {
        const institutionUser = this;
        institutionUser.email = trim(institutionUser.email.toLowerCase());
        if (!institutionUser.isModified('password')) 
            return next();
        institutionUser.password = hashedPassword(institutionUser.password);
        institutionUser.lastname= upperCase(institutionUser.lastname);
        institutionUser.firstname = upperFirst(institutionUser.firstname);
        institutionUser.uri = kebabCase(`${institutionUser.lastname} ${institutionUser.firstname} ${nanoid()}`);
        institutionUser.descriptif_name = `${institutionUser.lastname} ${institutionUser.firstname} ${institutionUser.email.split('@')[0].toLowerCase()}`;
        institutionUser.fullname = `${institutionUser.firstname} ${institutionUser.lastname}`.toLowerCase();
        return next();
    } catch (error) {
        console.log('institutionUserSchema', error);
    }
});

institutionUserSchema.index({ internalId: 1 });
institutionUserSchema.index({ fullname: 1 });


institutionUserSchema.plugin(paginator);
export default model('Institution_user', institutionUserSchema, 'Institution_users');