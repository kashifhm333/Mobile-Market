import { Router } from 'express';
import { body } from 'express-validator';
import * as adminController from '../controllers/adminController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/roleMiddleware.js';
import { validateRequest } from '../middleware/validationMiddleware.js';

const router = Router();

// Guard all admin routes with authentication AND admin role
router.use(authenticate, requireAdmin);

router.get('/stats', adminController.getStats);
router.get('/users', adminController.getUsers);
router.patch('/users/:id/status', adminController.updateUserStatus);
router.get('/listings', adminController.getListings);
router.patch(
  '/listings/:id/moderate',
  validateRequest([
    body('action').isIn(['APPROVE', 'REJECT', 'ARCHIVE']).withMessage('Action must be APPROVE, REJECT, or ARCHIVE')
  ]),
  adminController.moderateListing
);
router.get('/reports', adminController.getReports);
router.patch('/reports/:id', adminController.resolveReport);
router.get('/audit-logs', adminController.getAuditLogs);

export default router;
