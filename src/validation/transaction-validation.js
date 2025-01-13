import Joi from "joi";

const getTransactionValidation = Joi.number().positive().required();

const searchTransactionValidation = Joi.object({
    total: Joi.number().positive().optional(),
    date: Joi.string().isoDate().optional(),
    email: Joi.string().max(255).optional(),
    status: Joi.string().max(25).optional(),
    transaction_code: Joi.string().max(100).optional(),
    transaction_method: Joi.string().max(10).optional(),
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().default(10),
});

export {
    getTransactionValidation,
    searchTransactionValidation,
};