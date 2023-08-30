import Joi from 'joi';

const documentSchema = Joi.object({
    name: Joi.string().required(),
    url: Joi.string().required(),
    kind: Joi.string().required(),
    created_at: Joi.string()
});

export default documentSchema;