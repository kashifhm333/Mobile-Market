import * as authService from '../services/authService.js';
import { setAuthCookie, clearAuthCookie } from '../utils/tokens.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, city } = req.body;
    const { user, token } = await authService.registerUser({ name, email, password, phone, city });
    setAuthCookie(res, token);
    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      data: { user, token }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    setAuthCookie(res, token);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { user, token }
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  clearAuthCookie(res);
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user._id);
    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updated = await authService.updateUserProfile(req.user._id, req.body);
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: updated }
    });
  } catch (err) {
    next(err);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await authService.updateUserPassword(req.user._id, currentPassword, newPassword);
    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (err) {
    next(err);
  }
};
