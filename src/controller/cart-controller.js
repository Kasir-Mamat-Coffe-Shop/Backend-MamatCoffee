import cartService from "../service/cart-service.js";

const createOrder = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await cartService.createOrder(request);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const getOrder = async (req, res, next) => {
    try {
        const result = await cartService.getOrder();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const updateOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const result = await cartService.updateOrder(orderId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const deleteOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        await cartService.deleteOrder(orderId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const checkout = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await paymentService.createPayment(request);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export default {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    checkout,
};