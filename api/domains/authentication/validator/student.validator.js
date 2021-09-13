import joi from 'joi';


const studentSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    phone: joi.string().required(),
    email:  joi.string().required(),
    gender: joi.string().valid('male', 'female', '').required(),
    country: joi.string().required(),
    state: joi.string().required(),
    birth_day: joi.string().required(),
    birth_month: joi.string().required(),
    birth_year: joi.string().required(),
    whatsup_phone: joi.string().required(),
    password: joi.string().required(),
    confirm_password: joi.string().required(),
    type: joi.string().valid('student', 'parent').required(),
    fullname: joi.alternatives().conditional('type', { is: "parent", then: joi.string().required(), otherwise: joi.allow(null, "") }),
});

const validate_student_fn = async (student) => {
    try {
        const values = await studentSchema.validateAsync(student, { abortEarly: true, allowUnknown: true });
        return {
            values,
            valid: true,
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

export default validate_student_fn;
