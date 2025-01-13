import Joi from "joi";

const registerUserValidation = Joi.object({
    email: Joi.string().max(100).required(),
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    address: Joi.string().max(200).required(),
    birth_date: Joi.date().optional(),
    is_active: Joi.string().valid('ACTIVE', 'INACTIVE',).default('ACTIVE')
});

const loginUserValidation = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
    email: Joi.string().max(100).required(),
    first_name: Joi.string().max(100).optional(),
    last_name: Joi.string().max(100).optional(),
    password: Joi.string().max(100).optional(),
    address: Joi.string().max(200).optional(),
    birth_date: Joi.date().optional(),
    image: Joi.string().max(100).optional(),
    is_active: Joi.string().valid('ACTIVE', 'INACTIVE').optional
});

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
};