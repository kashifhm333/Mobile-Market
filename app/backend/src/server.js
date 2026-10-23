import app from './app.js';
import { connectDB, disconnectDB } from './config/db.js';
import { env } from './config/env.js';

let server;

const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(env.port, () => {
      console.log(`[Server] MobileMart REST API running on http://localhost:${env.port}`);
      console.log(`[Server] Swagger Docs available on http://localhost:${env.port}/api/docs`);
      console.log(`[Server] Health check: http://localhost:${env.port}/api/v1/health`);
    });
  } catch (error) {
    console.error('[Server Error] Startup failed:', error);
    process.exit(1);
  }
};

const handleShutdown = async (signal) => {
  console.log(`\n[Server] Received ${signal}. Gracefully shutting down...`);
  if (server) {
    server.close(async () => {
      console.log('[Server] HTTP server closed.');
      await disconnectDB();
      process.exit(0);
    });
  } else {
    await disconnectDB();
    process.exit(0);
  }
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

startServer();
