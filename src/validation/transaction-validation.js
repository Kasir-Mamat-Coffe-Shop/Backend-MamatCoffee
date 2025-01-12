import Joi from "joi";

const createTransactionValidation = Joi.object({
    cart_items: Joi.array().items(
        Joi.object({
            product_id: Joi.number().positive().required(),
            quantity: Joi.number().integer().min(1).required(),
        })
    ).required(),
    payment_method: Joi.string().valid("cash", "qris").required(),
});

const getTransactionValidation = Joi.number().positive().required();

const searchTransactionValidation = Joi.object({
    payment_method: Joi.string().valid("cash", "qris").optional(),
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().default(10),
});

export {
    createTransactionValidation,
    getTransactionValidation,
    searchTransactionValidation,
};