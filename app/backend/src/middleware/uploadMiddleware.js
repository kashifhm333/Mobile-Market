import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { env } from '../config/env.js';
import { BadRequestError } from '../utils/errors.js';

// Ensure upload directory exists
if (!fs.existsSync(env.uploadDir)) {
  fs.mkdirSync(env.uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, env.uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `phone-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestError('Only JPEG, PNG, and WebP image files are allowed.'));
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: env.maxFileSizeMB * 1024 * 1024, // 8MB limit
    files: 8 // Max 8 images per upload
  },
  fileFilter
});
