import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
    createCartValidation,
    updateCartValidation,
    removeCartValidation,
    checkoutCartValidation
} from "../validation/cart-validation.js";
import { validate } from "../validation/validation.js";
import { logger } from "../application/logging.js";

const createOrder = async (request) => {
    const order = validate(createCartValidation, request);
    const product = await prismaClient.product.findUnique({
        where: { id: order.productId },
    });

    if (!product) {
        throw new ResponseError(404, "Product not found");
    }

    if (product.stock < order.quantity) {
        throw new ResponseError(400, "Not enough stock");
    }

    const existingOrder = await prismaClient.temp.findUnique({
        where: { product_id: order.productId },
    });

    if (existingOrder) {
        // Update existing order
        return prismaClient.temp.update({
            where: { id: existingOrder.id },
            data: {
                quantity: existingOrder.quantity + order.quantity,
                sub_total: (existingOrder.quantity + order.quantity) * product.price,
            },
        });
    } else {
        // Create new order
        return prismaClient.temp.create({
            data: {
                quantity: order.quantity,
                sub_total: order.quantity * product.price,
                product: { connect: { id: order.productId } },
            },
        });
    }
};

const getOrder = async () => {
    return prismaClient.temp.findMany({
        include: {
            product: true,
        },
    });
};

const updateOrder = async (request) => {
    const order = validate(updateCartValidation, request);
    const orderInDatabase = await prismaClient.temp.findUnique({
        where: { id: order.id },
    });

    if (!orderInDatabase) {
        throw new ResponseError(404, "Order not found");
    }

    const product = await prismaClient.product.findUnique({
        where: { id: orderInDatabase.product_id },
    });

    if (product.stock < order.quantity) {
        throw new ResponseError(400, "Not enough stock");
    }

    return prismaClient.temp.update({
        where: { id: order.id },
        data: {
            quantity: order.quantity,
            sub_total: order.quantity * product.price,
        },
    });
};

const deleteOrder = async (id) => {
    const order = await prismaClient.temp.findUnique({
        where: { id: order.id },
    });

    if (!order) {
        throw new ResponseError(404, "Order not found");
    }

    return prismaClient.temp.delete({
        where: { id: order.id },
    });
};

const checkout = async (request) => {
    const order = validate(checkoutCartValidation, request);

    const cartItems = await prismaClient.temp.findMany({
        include: {
            product: true,
        },
    });
    logger.info('Cart Items: ', cartItems);

    if (cartItems.length === 0) {
        throw new ResponseError(400, "Cart is empty");
    }

    const totalAmount = cartItems.reduce((total, item) => total + item.sub_total, 0);
    logger.info('Total Amount: ', totalAmount);

    let paymentResponse;
    try {
        if (order.paymentMethod === 'QRIS') {
            paymentResponse = await paymentService.createQrisPayment(cartItems, totalAmount, order);
        } else if (order.paymentMethod === 'CASH') {
            paymentResponse = await paymentService.createCashPayment(cartItems, totalAmount, order);
        } else {
            throw new ResponseError(400, "Invalid payment method");
        }
    } catch (error) {
        throw new ResponseError(500, `Payment failed: ${error.message}`);
    }

    // Clear the temp table and reset AUTO_INCREMENT
    await prismaClient.temp.deleteMany({});
    await prismaClient.$executeRawUnsafe(`ALTER TABLE temp AUTO_INCREMENT = 1`);

    return { transaction: paymentResponse };
};

export default {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    checkout
};