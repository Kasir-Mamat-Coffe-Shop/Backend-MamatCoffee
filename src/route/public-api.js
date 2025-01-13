import express from "express";
import userController from "../controller/user-controller.js";
import webhookController from "../controller/webhook-controller.js";

const publicRouter = new express.Router();
publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/users/login', userController.login);

publicRouter.post('/api/webhook/midtrans', webhookController.handleWebhook);

export {
    publicRouter
};