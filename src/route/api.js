import express from "express";
import userController from "../controller/user-controller.js";
import productController from "../controller/product-controller.js";
import categoryController from "../controller/category-controller.js";
import cartController from "../controller/cart-controller.js";
import transactionController from "../controller/transaction-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// Product API
userRouter.post('/api/products', productController.create);
userRouter.get('/api/products/:id', productController.get);
userRouter.put('/api/products/:id', productController.update);
userRouter.delete('/api/products/:id', productController.remove);
userRouter.get('/api/products', productController.search);

// Category API
userRouter.post('/api/categorys', categoryController.create);
userRouter.get('/api/categorys/:id', categoryController.get);
userRouter.put('/api/categorys/:id', categoryController.update);
userRouter.delete('/api/categorys/:id', categoryController.remove);
userRouter.get('/api/categorys', categoryController.search);

// Transaction API
userRouter.get('/api/transactions/:transactionId', transactionController.get);
userRouter.get('/api/transactions', transactionController.search);
userRouter.get('/api/transactions/list', transactionController.list);
userRouter.get('/api/transactions/list/details', transactionController.listTransactionDetails);

// Order API
userRouter.post('/api/orders', cartController.createOrder);
userRouter.get('/api/orders', cartController.getOrder);
userRouter.put('/api/orders/:orderId', cartController.updateOrder);
userRouter.delete('/api/orders/:orderId', cartController.deleteOrder);
userRouter.post('/api/orders/checkout', cartController.checkout);

export {
    userRouter
};