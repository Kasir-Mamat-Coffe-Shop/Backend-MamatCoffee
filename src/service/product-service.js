import { validate } from "../validation/validation.js";
import {
    createProductValidation,
    updateProductValidation,
    getProductValidation,
    searchProductValidation
} from "../validation/product-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (request) => {
    const product = validate(createProductValidation, request);

    const countProduct = await prismaClient.product.count({
        where: {
            product_name: product.product_name
        }
    });

    if (countProduct === 1) {
        throw new ResponseError(400, "Product name already exists");
    }

    return prismaClient.product.create({
        data: product,
        select: {
            id: true,
            product_name: true,
            price: true,
            stock: true,
            image: true,
            category_id: true
        }
    });
};

const get = async (productId) => {
    productId = validate(getProductValidation, productId);

    const product = await prismaClient.product.findUnique({
        where: {
            id: productId
        },
        include: {
            category: true
        },
    });

    if (!product) {
        throw new ResponseError(404, "Product is not found");
    }

    return product;
};

const update = async (request) => {
    const product = validate(updateProductValidation, request);

    const totalProductInDatabase = await prismaClient.product.count({
        where: {
            id: product.id
        }
    });

    if (totalProductInDatabase !== 1) {
        throw new ResponseError(404, "Product is not found");
    }

    return prismaClient.product.update({
        where: {
            id: product.id
        },
        data: {
            product_name: product.product_name,
            price: product.price,
            stock: product.stock,
            image: product.image,
            category_id: product.category_id
        }, include: {
            category: true
        },
        select: {
            id: true,
            product_name: true,
            price: true,
            stock: true,
            image: true,
            category_id: true
        }
    });
};

const remove = async (productId) => {
    productId = validate(getProductValidation, productId);

    const totalProductInDatabase = await prismaClient.product.count({
        where: {
            id: productId
        }
    });

    if (totalProductInDatabase !== 1) {
        throw new ResponseError(404, "Product is not found");
    }

    return prismaClient.product.delete({
        where: {
            id: productId
        }
    });
};

const search = async (request) => {
    request = validate(searchProductValidation, request);

    const skip = (request.page - 1) * request.size;

    const filters = [];

    if (request.product_name) {
        filters.push({
            product_name: {
                contains: request.product_name,
            }
        });
    }
    if (request.price) {
        filters.push({
            price: {
                equals: request.price,
            }
        });
    }
    if (request.stock) {
        filters.push({
            stock: {
                equals: request.stock,
            }
        });
    }
    if (request.category_id) {
        filters.push({
            category_id: {
                equals: request.category_id,
            }
        });
    }

    const products = await prismaClient.product.findMany({
        where: {
            AND: filters
        },
        include: {
            category: true
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.product.count({
        where: {
            AND: filters
        }
    });

    return {
        data: products,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    };
};

export default {
    create,
    get,
    update,
    remove,
    search
};