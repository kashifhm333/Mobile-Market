import { verifyToken } from '../utils/tokens.js';
import { User } from '../models/User.js';
import { UnauthorizedError } from '../utils/errors.js';

export const authenticate = async (req, res, next) => {
  try {
    let token = null;

    // Check cookie first
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // Check Authorization header fallback
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedError('Authentication required. Please login.');
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new UnauthorizedError('User no longer exists.');
    }

    if (user.status === 'SUSPENDED') {
      throw new UnauthorizedError('Your account has been suspended. Please contact support.');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      next(new UnauthorizedError('Invalid or expired authentication token.'));
    } else {
      next(error);
    }
  }
};

export const optionalAuthenticate = async (req, res, next) => {
  try {
    let token = null;
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id);
      if (user && user.status !== 'SUSPENDED') {
        req.user = user;
      }
    }
  } catch {
    // Ignore invalid token for optional auth
  }
  next();
};
