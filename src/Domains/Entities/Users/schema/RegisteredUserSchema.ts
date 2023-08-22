import Joi from 'joi';

const RegisteredUserSchema = Joi.object({
    id: Joi.string().max(255),
    name: Joi.string().min(3).max(100).required(),
    username: Joi.string().min(3).max(100).required(),
})

export default RegisteredUserSchema;