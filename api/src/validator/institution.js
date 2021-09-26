import joi from 'joi';


const institutionSchema = joi.object({
    entity_name: joi.string().required(),
    country: joi.string().required(),
    institution_phone: joi.string().required(),

    firstname: joi.string().required(),
    lastname: joi.string().required(),
    gender: joi.string().valid('male', 'female', '').required(),
    email: joi.string().email().required(),
    job_title: joi.string().required(),

    creator_phone: joi.string().required(),
    phone_ext:  joi.string().optional().allow(null, ''),
    password: joi.string().min(8).max(14).required(),
    confirm_password: joi.string().min(8).max(14).required(),
});

const validate_institution_fn = async (institution) => {
    try {
        const values = await institutionSchema.validateAsync(institution, { abortEarly: true, allowUnknown: true });
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

const toInstitutionDto = (institution) => {
    return ({
        name: institution.entity_name,
        country: institution.country,
        phone: institution.institution_phone,
    })
}

const toInstitutionUserDto = (institutionUser) => {
    return({
        firstname: institutionUser.firstname,
        lastname: institutionUser.lastname,
        gender: institutionUser.gender,
        email: institutionUser.email,
        phone: institutionUser.creator_phone,
        job_title: institutionUser.job_title,
        role: "creator",
        creator: true,
        password: institutionUser.password,
    })

}

export {
    toInstitutionDto,
    toInstitutionUserDto,
}
export default validate_institution_fn;
