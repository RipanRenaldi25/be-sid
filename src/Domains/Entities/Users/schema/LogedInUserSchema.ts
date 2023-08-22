import Joi from 'joi';

const UserLogedInSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(3).max(100).required(),
    token: Joi.string().required(),
    role: Joi.string().required(),
});

export default UserLogedInSchema;