import mongoose from 'mongoose';
import { BRANDS, LISTING_CONDITIONS, LISTING_STATUSES } from '../constants/index.js';

const listingSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Listing must belong to a seller'],
      index: true
    },
    title: {
      type: String,
      required: [true, 'Please provide a listing title'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [150, 'Title cannot exceed 150 characters']
    },
    brand: {
      type: String,
      required: [true, 'Please select a brand'],
      enum: BRANDS,
      index: true
    },
    model: {
      type: String,
      required: [true, 'Please specify the phone model'],
      trim: true
    },
    variant: {
      type: String,
      trim: true,
      default: '' // e.g. "256GB / 8GB RAM"
    },
    condition: {
      type: String,
      required: [true, 'Please specify the condition'],
      enum: Object.values(LISTING_CONDITIONS),
      index: true
    },
    price: {
      type: Number,
      required: [true, 'Please specify a price'],
      min: [1, 'Price must be greater than zero']
    },
    currency: {
      type: String,
      default: 'USD'
    },
    negotiable: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: [true, 'Please provide a detailed description'],
      maxlength: [3000, 'Description cannot exceed 3000 characters']
    },
    images: {
      type: [String],
      default: []
    },
    city: {
      type: String,
      required: [true, 'City / Location is required'],
      trim: true
    },
    specifications: {
      storage: { type: String, default: '128GB' },
      ram: { type: String, default: '8GB' },
      batteryHealth: { type: Number, min: 0, max: 100, default: null },
      color: { type: String, default: '' },
      carrier: { type: String, default: 'Unlocked' },
      screenCondition: { type: String, default: 'Flawless' },
      accessoriesIncluded: { type: [String], default: [] }
    },
    status: {
      type: String,
      enum: Object.values(LISTING_STATUSES),
      default: LISTING_STATUSES.ACTIVE,
      index: true
    },
    reservedFor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    rejectionReason: {
      type: String,
      default: null
    },
    viewsCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

listingSchema.index({ title: 'text', model: 'text', description: 'text' });
listingSchema.index({ status: 1, price: 1 });
listingSchema.index({ status: 1, brand: 1 });
listingSchema.index({ status: 1, createdAt: -1 });

export const Listing = mongoose.model('Listing', listingSchema);
