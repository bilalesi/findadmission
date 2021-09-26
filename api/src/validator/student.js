import joi from 'joi';
import dayjs from 'dayjs';
import phoneValidator from 'phone';


const studentSchema = joi.object({
    firstname: joi.string().min(2).required(),
    lastname: joi.string().min(2).required(),
    phone: joi.string().custom((value, helper) => !phoneValidator(value).isValid ? helper.message('Phone must be valid') : value).required(),
    whatsup: joi.string().required(),
    email:  joi.string().email().required(),
    gender: joi.string().valid('male', 'female', '').allow(null,''),
    country: joi.string().required(),
    state: joi.string().required(),
    birthday: joi.string().isoDate().required(),
    // birth_month: joi.string().min(1).max(2).required(),
    // birth_year: joi.string().min(4).max(4).required(),
    password: joi.string().min(8).max(14).required(),
    confirm_password: joi.string().min(8).max(14).required().valid(joi.ref('password')),
    type: joi.string().valid('student', 'parent').required(),
    parent_fullname: joi.alternatives().conditional('type', { is: "parent", then: joi.string().required(), otherwise: joi.allow(null, "") }),
});

const validateStudentFn = async (student) => {
    try {
        const values = await studentSchema.validateAsync(student, { abortEarly: true, allowUnknown: true });
        return {
            valid: true,
            values,
        }
    } catch (error) {
        return {
            valid: false,
            error: {
                message: error.details[0].message,
                field: error.details[0].path,
            },
        }
    }
}

const toDto = (student) => {
    return ({
        ...student,
        birthday: dayjs(student.birthday).toDate(),
    })
}
export { toDto };
export default validateStudentFn;
