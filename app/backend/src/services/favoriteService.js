import { Favorite } from '../models/Favorite.js';
import { Listing } from '../models/Listing.js';
import { NotFoundError } from '../utils/errors.js';

export const getUserFavorites = async (userId) => {
  const favorites = await Favorite.find({ userId })
    .populate({
      path: 'listingId',
      populate: { path: 'sellerId', select: 'name city avatarUrl' }
    })
    .sort({ createdAt: -1 });

  // Filter out any deleted/null listing references
  return favorites
    .filter((fav) => fav.listingId !== null)
    .map((fav) => fav.listingId);
};

export const addFavorite = async (userId, listingId) => {
  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new NotFoundError('Listing not found');
  }

  const favorite = await Favorite.findOneAndUpdate(
    { userId, listingId },
    { userId, listingId },
    { upsert: true, new: true }
  );

  return favorite;
};

export const removeFavorite = async (userId, listingId) => {
  await Favorite.findOneAndDelete({ userId, listingId });
  return { success: true };
};

export const checkFavorite = async (userId, listingId) => {
  const exists = await Favorite.exists({ userId, listingId });
  return { isFavorite: Boolean(exists) };
};
