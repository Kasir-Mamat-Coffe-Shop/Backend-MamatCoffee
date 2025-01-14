import paymentService from '../service/payment-service.js';
import { logger } from '../application/logging.js';
import { sendToClients } from '../application/websocket.js';

const handleWebhook = async (req, res, next) => {
    try {
        const notification = req.body;

        // Log the notification for debugging
        logger.info('Received webhook notification:', notification);

        // Validate the notification
        if (!notification.order_id || !notification.transaction_status) {
            return res.status(400).json({ message: 'Invalid notification' });
        }

        // Update payment status in the database using order_id
        await paymentService.updatePaymentStatus(notification.order_id, notification.transaction_status);

        // Notify frontend based on transaction status
        if (notification.transaction_status === "settlement") {
            res.status(200).json({ message: 'Pembayaran sukses' });
            sendToClients({ action: "qr_paid", message: 'Payment paid successfully' });
        } else if (notification.transaction_status === "pending") {
            res.status(200).json({ message: 'Pembayaran dalam proses' });
        } else if (notification.transaction_status === "cancel") {
            res.status(200).json({ message: 'Pembayaran dibatalkan' });
        } else if (notification.transaction_status === "expire") {
            res.status(200).json({ message: 'Pembayaran expire' });
        } else {
            res.status(200).json({ message: 'Status pembayaran tidak dikenali' });
        }
    } catch (error) {
        logger.error('Error handling webhook:', error);
        next(error);
    }
};

export default {
    handleWebhook,
};