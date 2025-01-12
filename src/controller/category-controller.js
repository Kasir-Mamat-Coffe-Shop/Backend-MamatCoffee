import categoryService from "../service/category-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await categoryService.create(request);
        res.status(201).json(result);
    } catch (e) {
        next(e);
    }
};

const get = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const result = await categoryService.get(categoryId);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};

const update = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const request = req.body;
        request.id = categoryId;
        const result = await categoryService.update(request);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        await categoryService.remove(categoryId);
        res.status(204).send();
    } catch (e) {
        next(e);
    }
};

const search = async (req, res, next) => {
    try {
        const request = req.query;
        const result = await categoryService.search(request);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};

export default {
    create,
    get,
    update,
    remove,
    search,
};