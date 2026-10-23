import { Router } from 'express';
import { body } from 'express-validator';
import * as conversationController from '../controllers/conversationController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validationMiddleware.js';

const router = Router();

router.use(authenticate);

const inquiryValidations = [
  body('listingId').notEmpty().withMessage('Listing ID is required'),
  body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Message must be between 1 and 2000 characters')
];

const messageValidations = [
  body('body').trim().isLength({ min: 1, max: 2000 }).withMessage('Message cannot be empty')
];

router.get('/', conversationController.getConversations);
router.post('/', validateRequest(inquiryValidations), conversationController.startInquiry);
router.get('/:id', conversationController.getConversationById);
router.post('/:id/messages', validateRequest(messageValidations), conversationController.postMessage);
router.patch('/:id/deal', conversationController.updateDealStatus);

export default router;
