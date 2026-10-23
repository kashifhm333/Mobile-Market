import { Conversation } from '../models/Conversation.js';
import { Message } from '../models/Message.js';
import { Listing } from '../models/Listing.js';
import { BadRequestError, ForbiddenError, NotFoundError } from '../utils/errors.js';

export const getUserConversations = async (userId) => {
  return Conversation.find({
    $or: [{ buyerId: userId }, { sellerId: userId }]
  })
    .populate('listingId', 'title brand model price images status city')
    .populate('buyerId', 'name avatarUrl city')
    .populate('sellerId', 'name avatarUrl city')
    .sort({ lastMessageAt: -1 });
};

export const startInquiry = async (buyerId, { listingId, message, proposedPrice = null }) => {
  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new NotFoundError('Listing not found');
  }

  if (String(listing.sellerId) === String(buyerId)) {
    throw new BadRequestError('You cannot initiate an inquiry on your own listing.');
  }

  let conversation = await Conversation.findOne({ listingId, buyerId });

  if (!conversation) {
    conversation = await Conversation.create({
      listingId,
      buyerId,
      sellerId: listing.sellerId,
      proposedPrice: proposedPrice ? Number(proposedPrice) : null,
      lastMessage: message,
      lastMessageAt: new Date()
    });
  } else {
    if (proposedPrice) {
      conversation.proposedPrice = Number(proposedPrice);
    }
    conversation.lastMessage = message;
    conversation.lastMessageAt = new Date();
    await conversation.save();
  }

  // Create initial message
  await Message.create({
    conversationId: conversation._id,
    senderId: buyerId,
    body: message
  });

  return conversation;
};

export const getConversationById = async (conversationId, userId, isAdmin = false) => {
  const conversation = await Conversation.findById(conversationId)
    .populate('listingId', 'title brand model price currency images status city')
    .populate('buyerId', 'name email phone avatarUrl city')
    .populate('sellerId', 'name email phone avatarUrl city');

  if (!conversation) {
    throw new NotFoundError('Conversation not found');
  }

  const isBuyer = String(conversation.buyerId._id) === String(userId);
  const isSeller = String(conversation.sellerId._id) === String(userId);

  if (!isBuyer && !isSeller && !isAdmin) {
    throw new ForbiddenError('You do not have access to this conversation');
  }

  // Fetch messages
  const messages = await Message.find({ conversationId })
    .populate('senderId', 'name avatarUrl')
    .sort({ createdAt: 1 });

  // Mark unread messages as read
  Message.updateMany(
    { conversationId, senderId: { $ne: userId }, readAt: null },
    { readAt: new Date() }
  ).exec();

  return { conversation, messages };
};

export const postMessage = async (conversationId, senderId, body) => {
  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    throw new NotFoundError('Conversation not found');
  }

  const isBuyer = String(conversation.buyerId) === String(senderId);
  const isSeller = String(conversation.sellerId) === String(senderId);

  if (!isBuyer && !isSeller) {
    throw new ForbiddenError('You are not a participant in this conversation');
  }

  const message = await Message.create({
    conversationId,
    senderId,
    body
  });

  conversation.lastMessage = body;
  conversation.lastMessageAt = new Date();
  await conversation.save();

  return message;
};

export const updateDealStatus = async (conversationId, userId, { status, proposedPrice }) => {
  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    throw new NotFoundError('Conversation not found');
  }

  const isBuyer = String(conversation.buyerId) === String(userId);
  const isSeller = String(conversation.sellerId) === String(userId);

  if (!isBuyer && !isSeller) {
    throw new ForbiddenError('You are not authorized to update this deal');
  }

  if (status) conversation.status = status;
  if (proposedPrice !== undefined) conversation.proposedPrice = proposedPrice;

  await conversation.save();
  return conversation;
};
