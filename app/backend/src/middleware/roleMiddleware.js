import { ForbiddenError } from '../utils/errors.js';
import { USER_ROLES } from '../constants/index.js';

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ForbiddenError('Authentication required.'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('You do not have permission to perform this action.'));
    }

    next();
  };
};

export const requireAdmin = requireRole(USER_ROLES.ADMIN);
