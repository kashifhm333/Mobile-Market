import { Router } from 'express';
import * as favoriteController from '../controllers/favoriteController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/', favoriteController.getFavorites);
router.post('/:listingId', favoriteController.addFavorite);
router.delete('/:listingId', favoriteController.removeFavorite);
router.get('/check/:listingId', favoriteController.checkFavorite);

export default router;
