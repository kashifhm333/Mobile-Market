import * as favoriteService from '../services/favoriteService.js';

export const getFavorites = async (req, res, next) => {
  try {
    const favorites = await favoriteService.getUserFavorites(req.user._id);
    res.status(200).json({
      success: true,
      data: favorites
    });
  } catch (err) {
    next(err);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    const favorite = await favoriteService.addFavorite(req.user._id, req.params.listingId);
    res.status(201).json({
      success: true,
      message: 'Listing saved to favorites',
      data: favorite
    });
  } catch (err) {
    next(err);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    await favoriteService.removeFavorite(req.user._id, req.params.listingId);
    res.status(200).json({
      success: true,
      message: 'Listing removed from favorites'
    });
  } catch (err) {
    next(err);
  }
};

export const checkFavorite = async (req, res, next) => {
  try {
    const result = await favoriteService.checkFavorite(req.user._id, req.params.listingId);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};
