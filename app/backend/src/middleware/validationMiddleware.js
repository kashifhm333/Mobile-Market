import { validationResult } from 'express-validator';
import { BadRequestError } from '../utils/errors.js';

export const validateRequest = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((err) => ({
        field: err.path || err.param,
        message: err.msg
      }));
      return next(new BadRequestError('Validation failed', formattedErrors));
    }

    next();
  };
};
