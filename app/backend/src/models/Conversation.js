import mongoose from 'mongoose';
import { CONVERSATION_STATUSES } from '../constants/index.js';

const conversationSchema = new mongoose.Schema(
  {
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
      index: true
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    status: {
      type: String,
      enum: Object.values(CONVERSATION_STATUSES),
      default: CONVERSATION_STATUSES.OPEN
    },
    proposedPrice: {
      type: Number,
      default: null
    },
    lastMessage: {
      type: String,
      default: ''
    },
    lastMessageAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

conversationSchema.index({ listingId: 1, buyerId: 1 }, { unique: true });
conversationSchema.index({ buyerId: 1, lastMessageAt: -1 });
conversationSchema.index({ sellerId: 1, lastMessageAt: -1 });

export const Conversation = mongoose.model('Conversation', conversationSchema);
