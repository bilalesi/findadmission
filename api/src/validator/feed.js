import joi from 'joi';

const feedSchema = joi.object({
    title: joi.string().min(5).allow(null, ''),
    description: joi.string().min(20).required(),
    institution: joi.alternatives().conditional('ambassador', { is: joi.any().valid(null, ""), then: joi.string().required(), otherwise: joi.allow(null, "") }),
    ambassador: joi.alternatives().conditional('institution', { is: joi.any().valid(null, ""), then: joi.string().required(), otherwise: joi.allow(null, "") }),
    regions: joi.array().items(joi.string().allow(null, '')).required(),
    youtube: joi.string().uri().allow(null, ''),
    pictures: joi.array().items(joi.string().uri().allow(null, '')).required(),
    videos: joi.array().items(joi.string().uri().allow(null, '')).required(),
});

const validateFeedFn = async (feed) => {
    try {
        const values = await feedSchema.validateAsync(feed, { abortEarly: true, allowUnknown: true });
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

export default validateFeedFn;
