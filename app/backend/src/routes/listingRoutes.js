import { Router } from 'express';
import { body } from 'express-validator';
import * as listingController from '../controllers/listingController.js';
import { authenticate, optionalAuthenticate } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validationMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { BRANDS, LISTING_CONDITIONS } from '../constants/index.js';

const router = Router();

const createListingValidations = [
  body('title').trim().isLength({ min: 3, max: 150 }).withMessage('Title must be between 3 and 150 characters'),
  body('brand').isIn(BRANDS).withMessage('Please select a valid phone manufacturer brand'),
  body('model').trim().notEmpty().withMessage('Model is required'),
  body('condition').isIn(Object.values(LISTING_CONDITIONS)).withMessage('Please select a valid condition'),
  body('price').isFloat({ min: 1 }).withMessage('Price must be greater than zero'),
  body('city').trim().notEmpty().withMessage('Location city is required'),
  body('description').trim().isLength({ min: 5, max: 3000 }).withMessage('Description must be between 5 and 3000 characters')
];

// Public search & view
router.get('/', listingController.getListings);
router.get('/my', authenticate, listingController.getMyListings);
router.get('/:id', optionalAuthenticate, listingController.getListingById);

// Authenticated CRUD
router.post('/', authenticate, validateRequest(createListingValidations), listingController.createListing);
router.put('/:id', authenticate, listingController.updateListing);
router.patch('/:id/status', authenticate, listingController.updateListingStatus);
router.post('/:id/images', authenticate, upload.array('images', 8), listingController.uploadImages);

export default router;
