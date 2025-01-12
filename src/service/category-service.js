import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
    createCategoryValidation,
    updateCategoryValidation,
    getCategoryValidation,
    searchCategoryValidation,
} from "../validation/category-validation.js";
import { validate } from "../validation/validation.js";

const create = async (request) => {
    const category = validate(createCategoryValidation, request);

    const countCategory = await prismaClient.category.count({
        where: {
            category_name: category.category_name,
        },
    });

    if (countCategory === 1) {
        throw new ResponseError(400, "Category name already exists");
    }

    return prismaClient.category.create({
        data: category,
        select: {
            id: true,
            category_name: true,
        },
    });
};

const get = async (categoryId) => {
    categoryId = validate(getCategoryValidation, categoryId);

    const category = await prismaClient.category.findUnique({
        where: {
            id: categoryId,
        },
        select: {
            id: true,
            category_name: true,
        },
    });

    if (!category) {
        throw new ResponseError(404, "Category is not found");
    }

    return category;
};

const update = async (request) => {
    const category = validate(updateCategoryValidation, request);

    const totalCategoryInDatabase = await prismaClient.category.count({
        where: {
            id: category.id,
        },
    });

    if (totalCategoryInDatabase !== 1) {
        throw new ResponseError(404, "Category is not found");
    }

    return prismaClient.category.update({
        where: {
            id: category.id,
        },
        data: {
            category_name: category.category_name,
        },
        select: {
            id: true,
            category_name: true,
        },
    });
};

const remove = async (categoryId) => {
    categoryId = validate(getCategoryValidation, categoryId);

    const totalCategoryInDatabase = await prismaClient.category.count({
        where: {
            id: categoryId,
        },
    });

    if (totalCategoryInDatabase !== 1) {
        throw new ResponseError(404, "Category is not found");
    }

    return prismaClient.category.delete({
        where: {
            id: categoryId,
        },
    });
};

const search = async (request) => {
    request = validate(searchCategoryValidation, request);

    const skip = (request.page - 1) * request.size;

    const filters = [];

    if (request.category_name) {
        filters.push({
            category_name: {
                contains: request.category_name,
            },
        });
    }

    const categories = await prismaClient.category.findMany({
        where: {
            AND: filters,
        },
        take: request.size,
        skip: skip,
    });

    const totalItems = await prismaClient.category.count({
        where: {
            AND: filters,
        },
    });

    return {
        data: categories,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size),
        },
    };
};

export default {
    create,
    get,
    update,
    remove,
    search,
};