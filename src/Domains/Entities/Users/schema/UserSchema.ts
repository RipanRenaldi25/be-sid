import Joi from "joi";

const UserSchema = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    name: Joi.string().required().min(2).max(100),
    password: Joi.string().min(6).max(100).required(),
    role: Joi.string().required(),
})

export default UserSchema;