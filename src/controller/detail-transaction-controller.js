import detailTransactionService from "../service/detail-transaction-service.js";

const create = async (req, res, next) => {
    try {
        const result = await detailTransactionService.create(req.body);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
};

const get = async (req, res, next) => {
    try {
        const detailTransactionId = req.params.detailTransactionId;
        const result = await detailTransactionService.get(detailTransactionId);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};

const search = async (req, res, next) => {
    try {
        const query = req.query;
        const result = await detailTransactionService.search(query);
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