import joi from 'joi';
const institutionSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    country: joi.string().required(),
    institute_phone: joi.string().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    phone: joi.string().required(),
    email:  joi.string().required(),
    gender: joi.string().valid('male', 'female', '').required(),
    password: joi.string().required(),
    confirm_password: joi.string().required(),
    job_title: joi.string().required(),
});

const validate_institution_fn = async (institution) => {
    try {
        const values = await institutionSchema.validateAsync(institution, { abortEarly: true, allowUnknown: true });
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

export default validate_institution_fn;
