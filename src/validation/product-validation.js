import Joi from "joi";

const createProductValidation = Joi.object({
    product_name: Joi.string().max(100).required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required(),
    image: Joi.string().uri().required(),
    category_id: Joi.number().positive().required()
});

const updateProductValidation = Joi.object({
    id: Joi.number().positive().required(),
    product_name: Joi.string().max(100).optional(),
    price: Joi.number().positive().optional(),
    stock: Joi.number().integer().min(0).optional(),
    image: Joi.string().optional(),
    category_id: Joi.number().positive().optional()
});

const getProductValidation = Joi.number().positive().required();

const searchProductValidation = Joi.object({
    product_name: Joi.string().max(100).optional(),
    price: Joi.number().positive().optional(),
    stock: Joi.number().integer().min(0).optional(),
    category_id: Joi.number().positive().optional(),
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().default(10)
});

export {
    createProductValidation,
    updateProductValidation,
    getProductValidation,
    searchProductValidation
};
