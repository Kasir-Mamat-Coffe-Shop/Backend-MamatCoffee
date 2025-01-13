import Joi from "joi";

const createCartValidation = Joi.object({
    productId: Joi.number().positive().required(),
    quantity: Joi.number().integer().min(1).required(),
});

const updateCartValidation = Joi.object({
    id: Joi.number().positive().required(),
    quantity: Joi.number().integer().min(1).optional(),
});

const getCartValidation = Joi.number().positive().required();

const checkoutCartValidation = Joi.object({
    paymentMethod: Joi.string().valid('CASH', 'QRIS',).default('CASH'),
    cashPaid: Joi.number().positive().optional(),
    email: Joi.string().max(255).required()
});

export {
    createCartValidation,
    updateCartValidation,
    getCartValidation,
    checkoutCartValidation
};