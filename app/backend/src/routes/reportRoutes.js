import { Router } from 'express';
import { body } from 'express-validator';
import * as reportController from '../controllers/reportController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validationMiddleware.js';
import { REPORT_REASONS, REPORT_TARGETS } from '../constants/index.js';

const router = Router();

router.use(authenticate);

const reportValidations = [
  body('targetType').isIn(Object.values(REPORT_TARGETS)).withMessage('Invalid target type'),
  body('targetId').notEmpty().withMessage('Target ID is required'),
  body('reason').isIn(Object.values(REPORT_REASONS)).withMessage('Invalid report reason'),
  body('description').trim().isLength({ min: 5, max: 1000 }).withMessage('Description must be between 5 and 1000 characters')
];

router.post('/', validateRequest(reportValidations), reportController.createReport);

export default router;
