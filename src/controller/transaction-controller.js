import transactionService from "../service/transaction-service.js";

const create = async (req, res, next) => {
    try {
        const result = await transactionService.create(req.body);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
};

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
        const query = req.query;
        const result = await transactionService.search(query);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};

export default {
    create,
    get,
    search,
};