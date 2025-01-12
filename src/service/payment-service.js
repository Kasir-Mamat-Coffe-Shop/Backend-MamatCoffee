import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import midtransClient from 'midtrans-client';

const createQrisPayment = async (cartItems, totalAmount, email) => {
    const serverKey = process.env.SERVER_KEY;
    const clientKey = process.env.CLIENT_KEY;

    const midtrans = new midtransClient.CoreApi({
        isProduction: false,
        serverKey: serverKey,
        clientKey: clientKey,
    });

    const transactionCode = `ORDER-${Date.now()}`;

    const parameter = {
        "payment_type": "qris",
        "transaction_details": {
            "order_id": transactionCode,
            "gross_amount": totalAmount,
        },
        "item_details": cartItems.map(item => ({
            "id": item.product_id,
            "price": item.price,
            "quantity": item.quantity,
            "name": item.name,
        })),
        "customer_details": {
            "first_name": "Tws",
            "last_name": "Kasir",
            "email": "tws.kasir@example.com",
            "phone": "081234567890",
        },
    };

    try {
        const chargeResponse = await midtrans.charge(parameter);

        const qrCodeUrl = chargeResponse.actions.find(action => action.name === 'generate-qr-code').url;
        logger.info(`Payment created for ${transactionCode}, QR Code URL: ${qrCodeUrl}`);
        if (!qrCodeAction) {
            throw new ResponseError(500, "Failed to get QR code URL");
        }

        // Create transaction
        const transaction = await prismaClient.transaction.create({
            data: {
                transaction_code: transactionCode,
                transaction_method: 'QRIS',
                total: totalAmount,
                date: new Date(),
                status: chargeResponse.transaction_status,
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

    return { message: 'Payment created successfully', transaction, change };
};

const updatePaymentStatus = async (transactionCode, transactionStatus) => {
    try {
        const payment = await prisma.payment.findFirst({
            where: { transaction_code: transactionCode },
        });

        if (!payment) {
            throw new Error('Payment not found');
        }

        // Update the payment status
        await prisma.transaction.update({
            where: { id: transaction.id },
            data: { status: transactionStatus },
        });

        logger.info(`Payment status updated for order ID ${transactionCode}: ${transactionStatus}`);
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