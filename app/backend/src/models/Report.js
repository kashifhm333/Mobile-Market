import mongoose from 'mongoose';
import { REPORT_REASONS, REPORT_STATUSES, REPORT_TARGETS } from '../constants/index.js';

const reportSchema = new mongoose.Schema(
  {
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    targetType: {
      type: String,
      required: true,
      enum: Object.values(REPORT_TARGETS)
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },
    reason: {
      type: String,
      required: true,
      enum: Object.values(REPORT_REASONS)
    },
    description: {
      type: String,
      required: [true, 'Please explain the issue'],
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    status: {
      type: String,
      enum: Object.values(REPORT_STATUSES),
      default: REPORT_STATUSES.PENDING,
      index: true
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    resolutionNote: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

reportSchema.index({ status: 1, createdAt: -1 });

export const Report = mongoose.model('Report', reportSchema);
