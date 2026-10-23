import * as conversationService from '../services/conversationService.js';

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await conversationService.getUserConversations(req.user._id);
    res.status(200).json({
      success: true,
      data: conversations
    });
  } catch (err) {
    next(err);
  }
};

export const startInquiry = async (req, res, next) => {
  try {
    const { listingId, message, proposedPrice } = req.body;
    const conversation = await conversationService.startInquiry(req.user._id, {
      listingId,
      message,
      proposedPrice
    });
    res.status(201).json({
      success: true,
      message: 'Inquiry sent to seller',
      data: conversation
    });
  } catch (err) {
    next(err);
  }
};

export const getConversationById = async (req, res, next) => {
  try {
    const isAdmin = req.user.role === 'ADMIN';
    const result = await conversationService.getConversationById(req.params.id, req.user._id, isAdmin);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const postMessage = async (req, res, next) => {
  try {
    const { body } = req.body;
    const message = await conversationService.postMessage(req.params.id, req.user._id, body);
    res.status(201).json({
      success: true,
      data: message
    });
  } catch (err) {
    next(err);
  }
};

export const updateDealStatus = async (req, res, next) => {
  try {
    const conversation = await conversationService.updateDealStatus(req.params.id, req.user._id, req.body);
    res.status(200).json({
      success: true,
      message: 'Deal status updated',
      data: conversation
    });
  } catch (err) {
    next(err);
  }
};
