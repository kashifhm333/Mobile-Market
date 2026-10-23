import { User } from '../models/User.js';
import { BadRequestError, UnauthorizedError, ConflictError, NotFoundError } from '../utils/errors.js';
import { generateToken } from '../utils/tokens.js';
import { USER_ROLES } from '../constants/index.js';

export const registerUser = async ({ name, email, password, phone = '', city = '' }) => {
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ConflictError('An account with this email already exists.');
  }

  const passwordHash = await User.hashPassword(password);

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    passwordHash,
    role: USER_ROLES.USER, // Enforce USER role on registration
    phone,
    city
  });

  const token = generateToken({ id: user._id, role: user.role });
  return { user, token };
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new BadRequestError('Please provide both email and password.');
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
  if (!user) {
    throw new UnauthorizedError('Invalid email or password.');
  }

  if (user.status === 'SUSPENDED') {
    throw new UnauthorizedError('Account is suspended. Please contact administrator.');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthorizedError('Invalid email or password.');
  }

  const token = generateToken({ id: user._id, role: user.role });
  const userJson = user.toJSON();
  return { user: userJson, token };
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError('User not found.');
  }
  return user;
};

export const updateUserProfile = async (userId, { name, phone, city, bio, avatarUrl }) => {
  const updates = {};
  if (name !== undefined) updates.name = name;
  if (phone !== undefined) updates.phone = phone;
  if (city !== undefined) updates.city = city;
  if (bio !== undefined) updates.bio = bio;
  if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl;

  const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
  if (!user) {
    throw new NotFoundError('User not found.');
  }
  return user;
};

export const updateUserPassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select('+passwordHash');
  if (!user) {
    throw new NotFoundError('User not found.');
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new BadRequestError('Incorrect current password.');
  }

  if (newPassword.length < 8) {
    throw new BadRequestError('New password must be at least 8 characters.');
  }

  user.passwordHash = await User.hashPassword(newPassword);
  await user.save();
  return { success: true };
};
