import * as listingService from '../services/listingService.js';

export const getListings = async (req, res, next) => {
  try {
    const result = await listingService.searchListings(req.query);
    res.status(200).json({
      success: true,
      data: result.listings,
      meta: result.meta
    });
  } catch (err) {
    next(err);
  }
};

export const getListingById = async (req, res, next) => {
  try {
    const listing = await listingService.getListingById(req.params.id, req.user);
    res.status(200).json({
      success: true,
      data: { listing }
    });
  } catch (err) {
    next(err);
  }
};

export const getMyListings = async (req, res, next) => {
  try {
    const listings = await listingService.getMyListings(req.user._id, req.query.status);
    res.status(200).json({
      success: true,
      data: listings
    });
  } catch (err) {
    next(err);
  }
};

export const createListing = async (req, res, next) => {
  try {
    const listing = await listingService.createListing(req.user._id, req.body);
    res.status(201).json({
      success: true,
      message: 'Listing created successfully',
      data: { listing }
    });
  } catch (err) {
    next(err);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const isAdmin = req.user.role === 'ADMIN';
    const updated = await listingService.updateListing(req.params.id, req.user._id, req.body, isAdmin);
    res.status(200).json({
      success: true,
      message: 'Listing updated successfully',
      data: { listing: updated }
    });
  } catch (err) {
    next(err);
  }
};

export const updateListingStatus = async (req, res, next) => {
  try {
    const isAdmin = req.user.role === 'ADMIN';
    const { status, reservedFor, reason } = req.body;
    const updated = await listingService.updateListingStatus(
      req.params.id,
      req.user._id,
      status,
      { reservedFor, reason },
      isAdmin
    );
    res.status(200).json({
      success: true,
      message: `Listing status updated to ${status}`,
      data: { listing: updated }
    });
  } catch (err) {
    next(err);
  }
};

export const uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: { code: 'NO_FILES', message: 'No images were uploaded' }
      });
    }

    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
    const updated = await listingService.addListingImages(req.params.id, req.user._id, imageUrls);

    res.status(200).json({
      success: true,
      message: 'Photos uploaded successfully',
      data: { listing: updated, uploaded: imageUrls }
    });
  } catch (err) {
    next(err);
  }
};
