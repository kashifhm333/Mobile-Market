import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { env } from './config/env.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { globalLimiter } from './middleware/rateLimiter.js';
import { NotFoundError } from './utils/errors.js';

import authRoutes from './routes/authRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

// CORS configuration
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// Logging
if (env.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// Cookie parser
app.use(cookieParser());

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply rate limiter on API
app.use('/api', globalLimiter);

// Serve static upload directory
app.use('/uploads', express.static(env.uploadDir));

// Swagger API Documentation
try {
  const swaggerDoc = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs/swagger.json'), 'utf8'));
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
} catch (err) {
  console.warn('[Swagger] Documentation file not loaded:', err.message);
}

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: env.nodeEnv
  });
});

// Mount API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/listings', listingRoutes);
app.use('/api/v1/favorites', favoriteRoutes);
app.use('/api/v1/conversations', conversationRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/admin', adminRoutes);

// Catch-all for undefined routes
app.all('*', (req, res, next) => {
  next(new NotFoundError(`Route ${req.originalUrl} not found on this server`));
});

// Global error handler
app.use(errorHandler);

export default app;
