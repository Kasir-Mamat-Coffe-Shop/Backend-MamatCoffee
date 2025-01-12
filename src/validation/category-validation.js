import Joi from "joi";

const createCategoryValidation = Joi.object({
    category_name: Joi.string().max(100).required(),
});

const updateCategoryValidation = Joi.object({
    id: Joi.number().positive().required(),
    category_name: Joi.string().max(100).optional(),
});

const getCategoryValidation = Joi.number().positive().required();

const searchCategoryValidation = Joi.object({
    category_name: Joi.string().max(100).optional(),
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().default(10),
});

export {
    createCategoryValidation,
    updateCategoryValidation,
    getCategoryValidation,
    searchCategoryValidation,
};