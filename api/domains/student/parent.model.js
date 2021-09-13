import mongoose from 'mongoose';
import paginator from 'mongoose-paginate-v2';


const { Schema, Model, Types } = mongoose;

const parentSchema = new Schema({
    firstname: { type: String, default: '' },
    lastname: { type: String, default: '' },
    fullname: { type: String, default: '' },
    _fullname: { type: String, default: '' },
    gender: { type: String, enum: ['male', 'female', ''], default: '' },
    birthday: { type: Date, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    whatsup: { type: String, default: '' },
    address: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        zip: { type: String, default: '' },
        country: { type: String, default: '' },
    },
    password: { type: String, default: '' },
    parent_id: { type: Types.ObjectId, default: null },
    children: { type: [{ type: Types.ObjectId, ref: 'Students' }], default: [] },
},{
    timestamps: true,
})


const hashedPassword = (password) => {
    const salt = bcrypt.genSaltSync(PASSWORD_SALT_ROUNDS);
    return bcrypt.hashSync(password, salt);
};

parentSchema.pre('save', function (next) {
    const parent = this;
    parent.email = parent.email.toLowerCase();
    if (!parent.isModified('password')) return next();
    parent.password = hashedPassword(parent.password);
    parent.uri = _.kebabCase(`parent ${parent.lastName} ${parent.firstName} ${nanoid()}`);
    parent._fullname = `${parent.fullname} ${parent.email.split('@')[0]}`;
    return next();
});

parentSchema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.password);
};
parentSchema.index({ fullname: 1 });
parentSchema.index({ email: 1 });
parentSchema.index({ phone: 1 });
parentSchema.index({ fullname: 'text', email: 'text' });





parentSchema.plugin(paginator);
export default Model('Parent', parentSchema, 'Parents');