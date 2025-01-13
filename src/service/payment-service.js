import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import axios from "axios";
import { logger } from "../application/logging.js";
import { sendToClients } from "../application/websocket.js";

const createQrisPayment = async (cartItems, totalAmount, order) => {
    const serverKey = process.env.SERVER_KEY;
    const midtransUrl = process.env.MIDTRANS_URL;

    const transactionCode = `ORDER-${Date.now()}`;

    const parameter = {
        payment_type: "qris",
        transaction_details: {
            order_id: transactionCode,
            gross_amount: totalAmount,
        },
        item_details: cartItems.map(item => ({
            id: item.product_id,
            price: item.product.price,
            quantity: item.quantity,
            name: item.product.product_name,
        })),
        customer_details: {
            first_name: "Tws",
            last_name: "Kasir",
            email: "tws.kasir@example.com",
            phone: "081234567890",
        },
    };

    try {
        const chargeResponse = await axios.post(midtransUrl, parameter, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(serverKey).toString('base64')
            }
        });

        logger.info(`charge response ${JSON.stringify(chargeResponse.data, null, 2)}`);

        if (!chargeResponse.data) {
            throw new Error('Data not found in Midtrans response');
        }

        const qrCodeAction = chargeResponse.data.actions?.find(action => action.name === 'generate-qr-code');

        if (!qrCodeAction || !qrCodeAction.url) {
            throw new ResponseError(500, "Failed to get QR code URL from Midtrans response");
        }

        const qrCodeUrl = qrCodeAction.url;

        logger.info(`Payment created for ${transactionCode}, QR Code URL: ${qrCodeUrl}`);

        // Create transaction
        const transaction = await prismaClient.transaction.create({
            data: {
                transaction_code: transactionCode,
                transaction_method: 'QRIS',
                total: totalAmount,
                date: new Date(),
                status: chargeResponse.data.transaction_status,
                user: {
                    connect: {
                        email: order.email,
                    },
                },
                transaction_details: {
                    create: cartItems.map((item) => ({
                        quantity: item.quantity,
                        sub_total: item.sub_total,
                        product: {
                            connect: { id: item.product_id },
                        },
                    })),
                },
            },
            include: {
                transaction_details: true,
            },
        });
        return { message: 'Payment created successfully', qrCodeUrl, transaction };
    } catch (error) {
        console.error("Error with Midtrans API:", {
            message: error.message,
            responseData: error.response?.data,
            responseStatus: error.response?.status,
            headers: error.response?.headers,
        });
        throw new ResponseError(500, "Payment processing failed");
    }
};

const createCashPayment = async (cartItems, totalAmount, order) => {
    const transactionCode = `ORDER-${Date.now()}`;

    const change = order.cashPaid - totalAmount;

    if (change < 0) {
        return res.status(400).json({ message: "Your cash is not enough" });
    }

    const transaction = await prismaClient.transaction.create({
        data: {
            transaction_code: transactionCode,
            transaction_method: 'CASH',
            total: totalAmount,
            date: new Date(),
            status: 'settlement',
            user: {
                connect: {
                    email: order.email,
                },
            },
            transaction_details: {
                create: cartItems.map((item) => ({
                    quantity: item.quantity,
                    sub_total: item.sub_total,
                    product: {
                        connect: { id: item.product_id },
                    },
                })),
            },
        },
        include: {
            transaction_details: true,
        },
    });

    return { message: 'Payment paid successfully', transaction, change };
};

const updatePaymentStatus = async (order_id, transaction_status) => {
    try {
        const payment = await prismaClient.transaction.findFirst({
            where: { transaction_code: order_id },
        });

        if (!payment) {
            throw new Error('Payment not found');
        }

        // Update the payment status
        await prismaClient.transaction.update({
            where: { id: payment.id },
            data: { status: transaction_status },
        });

        logger.info(`Payment status updated for order ID ${order_id}: ${transaction_status}`);

    } catch (error) {
        logger.error(`Failed to update payment status: ${error.message}`);
        throw new Error('Failed to update payment status');
    }
};

export default {
    createQrisPayment,
    createCashPayment,
    updatePaymentStatus,
};