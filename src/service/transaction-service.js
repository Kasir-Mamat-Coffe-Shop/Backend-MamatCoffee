import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import {
    getTransactionValidation,
    searchTransactionValidation,
} from "../validation/transaction-validation.js";

const get = async (transactionId) => {
    const id = validate(getTransactionValidation, transactionId);

    const transaction = await prismaClient.transaction.findUnique({
        where: {
            id,
        },
        include: {
            cart_items: true,
        },
    });

    if (!transaction) {
        throw new ResponseError(404, "Transaction not found");
    }

    return transaction;
};

const search = async (request) => {
    const query = validate(searchTransactionValidation, request);

    const transactions = await prismaClient.transaction.findMany({
        where: {
            payment_method: query.payment_method,
        },
        take: query.size,
        skip: (query.page - 1) * query.size,
        include: {
            cart_items: true,
        },
    });

    const totalItems = await prismaClient.transaction.count({
        where: {
            payment_method: query.payment_method,
        },
    });

    return {
        data: transactions,
        paging: {
            page: query.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / query.size),
        },
    };
};

export default {
    get,
    search,
};