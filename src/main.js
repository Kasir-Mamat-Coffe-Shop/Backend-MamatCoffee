import { web } from "./application/web.js";
import { logger } from "./application/logging.js";
import { startWebSocketServer } from "./application/websocket.js";

const PORT = 3000;

// Start the HTTP server
const server = web.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});


// Start the WebSocket server, sharing the same HTTP server
startWebSocketServer(server);