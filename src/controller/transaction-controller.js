import transactionService from "../service/transaction-service.js";

const get = async (req, res, next) => {
    try {
        const transactionId = req.params.transactionId;
        const result = await transactionService.get(transactionId);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};

const search = async (req, res, next) => {
    try {
        const request = req.query;
        const result = await transactionService.search(request);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};

const list = async (req, res, next) => {
    try {
        const result = await transactionService.list();
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};

const listTransactionDetails = async (req, res, next) => {
    try {
        const result = await transactionService.listTransactionDetails();
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};

export default {
    get,
    search,
    list,
    listTransactionDetails
};