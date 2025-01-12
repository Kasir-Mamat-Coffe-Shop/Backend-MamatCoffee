import productService from "../service/product-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await productService.create(request);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const result = await productService.get(productId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const request = req.body;
        request.id = productId;
        const result = await productService.update(request);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const productId = req.params.id;
        await productService.remove(productId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const search = async (req, res, next) => {
    try {
        const request = req.query;
        const result = await productService.search(request);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export default {
    create,
    get,
    update,
    remove,
    search
};