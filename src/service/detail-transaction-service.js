import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import {
    getDetailTransactionValidation,
    searchDetailTransactionValidation,
} from "../validation/detail-transaction-validation.js";

const get = async (detailTransactionId) => {
    const id = validate(getDetailTransactionValidation, detailTransactionId);

    const detailTransaction = await prismaClient.detailTransaction.findUnique({
        where: {
            id,
        },
    });

    if (!detailTransaction) {
        throw new ResponseError(404, "Detail transaction not found");
    }

    return detailTransaction;
};

const search = async (request) => {
    const query = validate(searchDetailTransactionValidation, request);

    const detailTransactions = await prismaClient.detailTransaction.findMany({
        where: {
            transaction_id: query.transaction_id,
        },
        take: query.size,
        skip: (query.page - 1) * query.size,
    });

    const totalItems = await prismaClient.detailTransaction.count({
        where: {
            transaction_id: query.transaction_id,
        },
    });

    return {
        data: detailTransactions,
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