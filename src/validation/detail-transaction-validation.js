import Joi from "joi";

const createDetailTransactionValidation = Joi.object({
    transaction_id: Joi.number().positive().required(),
    product_id: Joi.number().positive().required(),
    quantity: Joi.number().integer().min(1).required(),
    sub_total: Joi.number().positive().required(),
});

const getDetailTransactionValidation = Joi.number().positive().required();

const searchDetailTransactionValidation = Joi.object({
    transaction_id: Joi.number().positive().optional(),
    product_id: Joi.number().positive().optional(),
    quantity: Joi.number().integer().min(1).optional(),
    sub_total: Joi.number().positive().optional(),
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().default(10),
});

export {
    createDetailTransactionValidation,
    getDetailTransactionValidation,
    searchDetailTransactionValidation,
};