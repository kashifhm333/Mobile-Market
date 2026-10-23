import { AppError } from '../utils/errors.js';
import { env } from '../config/env.js';

export const errorHandler = (err, req, res, next) => {
  let error = err;

  // Handle Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    error = new AppError(`Resource not found with id: ${err.value}`, 404, 'NOT_FOUND');
  }

  // Handle Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const fields = Object.keys(err.keyValue || {});
    error = new AppError(`Duplicate field value entered: ${fields.join(', ')}. Must be unique.`, 409, 'DUPLICATE_KEY');
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message
    }));
    error = new AppError('Validation failed', 400, 'VALIDATION_ERROR', details);
  }

  // Handle Multer upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = new AppError(`File exceeds maximum size of ${env.maxFileSizeMB}MB`, 400, 'FILE_TOO_LARGE');
  }

  const statusCode = error.statusCode || 500;
  const response = {
    success: false,
    error: {
      code: error.code || 'INTERNAL_ERROR',
      message: error.message || 'An unexpected internal error occurred'
    }
  };

  if (error.details) {
    response.error.details = error.details;
  }

  if (!env.isProduction && statusCode === 500) {
    response.error.stack = err.stack;
  }

  if (statusCode === 500) {
    console.error('[Error Middleware] 500 Unhandled Error:', err);
  }

  res.status(statusCode).json(response);
};
