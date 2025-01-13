import { WebSocketServer } from "ws";
import { logger } from './logging.js';

// Store connected clients
let connectedClients = [];

// Function to start the WebSocket server
export function startWebSocketServer(server) {
    const wss = new WebSocketServer({ server, path: "/ws" });

    // Handle new WebSocket connections
    wss.on("connection", (ws) => {
        connectedClients.push(ws);
        logger.info("WebSocket connection established");


        // Handle client disconnection
        ws.on("close", () => {
            connectedClients = connectedClients.filter((client) => client !== ws);
            logger.info("WebSocket connection closed");
        });

        // Send a welcome message to the new client
        ws.send("Welcome to the WebSocket server!");
    });

    logger.info("WebSocket server is running");
}

// Function to broadcast messages to all connected clients
export function sendToClients(message) {
    logger.info("Sending to clients:", message);
    connectedClients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(message));
            logger.info("Sent to client:", JSON.stringify(message));
        } else {
            logger.error("Client not open, cannot send message:", client.readyState);
        }
    });
}
