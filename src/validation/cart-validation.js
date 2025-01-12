import Joi from "joi";

const createCartValidation = Joi.object({
    id: Joi.number().positive().required(),
    quantity: Joi.number().integer().min(1).required(),
});

const updateCartValidation = Joi.object({
    id: Joi.number().positive().required(),
    quantity: Joi.number().integer().min(1).optional(),
});

const getCartValidation = Joi.number().positive().required();

const removeCartValidation = Joi.object({
    id: Joi.number().positive().required(),
});

const checkoutCartValidation = Joi.object({
    payment_method: Joi.string().valid('CASH', 'QRIS',).default('CASH'),
    cashPaid: Joi.number().positive().optional()
});

export {
    createCartValidation,
    updateCartValidation,
    getCartValidation,
    removeCartValidation,
    checkoutCartValidation
};