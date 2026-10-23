import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const generateToken = (payload) => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, env.jwtSecret);
};

export const setAuthCookie = (res, token) => {
  const isProduction = env.isProduction;
  res.cookie('token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

export const clearAuthCookie = (res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
};
