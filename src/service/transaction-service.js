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
            transaction_details: {
                include: {
                    product: true,
                },
            },
        },
    });

    if (!transaction) {
        throw new ResponseError(404, "Transaction not found");
    }

    return transaction;
};

const search = async (request) => {
    request = validate(searchTransactionValidation, request);

    const skip = (request.page - 1) * request.size;

    const filters = [];

    if (request.transaction_code) {
        filters.push({
            transaction_code: {
                contains: request.transaction_code,
            }
        });
    }
    if (request.transaction_method) {
        filters.push({
            transaction_method: {
                equals: request.transaction_method,
            }
        });
    }
    if (request.total) {
        filters.push({
            total: {
                equals: request.total,
            }
        });
    }
    if (request.date) {
        filters.push({
            date: {
                equals: request.date,
            }
        });
    }
    if (request.status) {
        filters.push({
            status: {
                contains: request.status,
            }
        });
    }
    if (request.email) {
        filters.push({
            email: {
                contains: request.email,
            }
        });
    }

    const transactions = await prismaClient.transaction.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.transaction.count({
        where: {
            AND: filters
        },
    });

    return {
        data: transactions,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size),
        },
    };
};

const list = async () => {
    return transactions = await prismaClient.transaction.findMany();
};

const listTransactionDetails = async () => {
    const transactionDetails = await prismaClient.transactionDetail.findMany({
        include: {
            product: true,
        },
    });

    return transactionDetails;
};

export default {
    get,
    search,
    list,
    listTransactionDetails
};