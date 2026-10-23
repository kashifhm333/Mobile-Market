import { Listing } from '../models/Listing.js';
import { LISTING_STATUSES } from '../constants/index.js';
import { BadRequestError, ForbiddenError, NotFoundError } from '../utils/errors.js';
import { logAudit } from './auditService.js';

export const searchListings = async ({
  search,
  brand,
  condition,
  minPrice,
  maxPrice,
  city,
  storage,
  carrier,
  sort = 'newest',
  page = 1,
  limit = 12,
  includeAllStatus = false
}) => {
  const query = {};

  if (!includeAllStatus) {
    query.status = LISTING_STATUSES.ACTIVE;
  }

  if (search && search.trim()) {
    query.$or = [
      { title: { $regex: search.trim(), $options: 'i' } },
      { model: { $regex: search.trim(), $options: 'i' } },
      { description: { $regex: search.trim(), $options: 'i' } }
    ];
  }

  if (brand) {
    query.brand = brand;
  }

  if (condition) {
    query.condition = condition;
  }

  if (city) {
    query.city = { $regex: city.trim(), $options: 'i' };
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (storage) {
    query['specifications.storage'] = storage;
  }

  if (carrier) {
    query['specifications.carrier'] = carrier;
  }

  // Sorting
  const sortOptions = {};
  switch (sort) {
    case 'price_asc':
      sortOptions.price = 1;
      break;
    case 'price_desc':
      sortOptions.price = -1;
      break;
    case 'popular':
      sortOptions.viewsCount = -1;
      break;
    case 'newest':
    default:
      sortOptions.createdAt = -1;
      break;
  }

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const [listings, total] = await Promise.all([
    Listing.find(query)
      .populate('sellerId', 'name city avatarUrl createdAt')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Listing.countDocuments(query)
  ]);

  return {
    listings,
    meta: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum)
    }
  };
};

export const getListingById = async (listingId, currentUser = null) => {
  const listing = await Listing.findById(listingId).populate(
    'sellerId',
    'name email phone city avatarUrl bio createdAt'
  );

  if (!listing) {
    throw new NotFoundError('Phone listing not found.');
  }

  const isSeller = currentUser && listing.sellerId && String(listing.sellerId._id) === String(currentUser._id);
  const isAdmin = currentUser && currentUser.role === 'ADMIN';

  // If not ACTIVE, only the owner or an admin can view
  if (listing.status !== LISTING_STATUSES.ACTIVE && !isSeller && !isAdmin) {
    throw new NotFoundError('This listing is no longer active.');
  }

  // Increment view count asynchronously
  Listing.findByIdAndUpdate(listingId, { $inc: { viewsCount: 1 } }).exec();

  return listing;
};

export const createListing = async (sellerId, listingData) => {
  const listing = await Listing.create({
    ...listingData,
    sellerId,
    status: listingData.status === LISTING_STATUSES.DRAFT ? LISTING_STATUSES.DRAFT : LISTING_STATUSES.ACTIVE
  });
  return listing;
};

export const updateListing = async (listingId, userId, updateData, isAdmin = false) => {
  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new NotFoundError('Listing not found.');
  }

  const isOwner = String(listing.sellerId) === String(userId);
  if (!isOwner && !isAdmin) {
    throw new ForbiddenError('You can only edit your own listings.');
  }

  // Prevent overriding sellerId or viewsCount
  delete updateData.sellerId;
  delete updateData.viewsCount;

  Object.assign(listing, updateData);
  await listing.save();
  return listing;
};

export const updateListingStatus = async (listingId, userId, newStatus, { reservedFor = null, reason = '' } = {}, isAdmin = false) => {
  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new NotFoundError('Listing not found.');
  }

  const isOwner = String(listing.sellerId) === String(userId);
  if (!isOwner && !isAdmin) {
    throw new ForbiddenError('You can only update status for your own listings.');
  }

  // Allowed transitions
  const current = listing.status;
  if (newStatus === LISTING_STATUSES.SOLD) {
    // Only seller or admin can mark sold
    listing.status = LISTING_STATUSES.SOLD;
  } else if (newStatus === LISTING_STATUSES.RESERVED) {
    listing.status = LISTING_STATUSES.RESERVED;
    if (reservedFor) listing.reservedFor = reservedFor;
  } else if (newStatus === LISTING_STATUSES.ACTIVE) {
    listing.status = LISTING_STATUSES.ACTIVE;
    listing.reservedFor = null;
  } else if (newStatus === LISTING_STATUSES.ARCHIVED) {
    listing.status = LISTING_STATUSES.ARCHIVED;
  } else if (newStatus === LISTING_STATUSES.REJECTED && isAdmin) {
    listing.status = LISTING_STATUSES.REJECTED;
    listing.rejectionReason = reason || 'Listing violates marketplace guidelines';
    await logAudit({
      actorId: userId,
      action: 'LISTING_REJECTED',
      targetType: 'LISTING',
      targetId: listing._id,
      metadata: { reason }
    });
  } else {
    throw new BadRequestError(`Invalid status transition from ${current} to ${newStatus}`);
  }

  await listing.save();
  return listing;
};

export const getMyListings = async (sellerId, status = null) => {
  const filter = { sellerId };
  if (status && Object.values(LISTING_STATUSES).includes(status)) {
    filter.status = status;
  }
  return Listing.find(filter).sort({ createdAt: -1 });
};

export const addListingImages = async (listingId, userId, newImageUrls) => {
  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new NotFoundError('Listing not found.');
  }

  if (String(listing.sellerId) !== String(userId)) {
    throw new ForbiddenError('You can only add photos to your own listings.');
  }

  listing.images.push(...newImageUrls);
  if (listing.images.length > 8) {
    listing.images = listing.images.slice(0, 8); // Max 8 photos
  }
  await listing.save();
  return listing;
};
