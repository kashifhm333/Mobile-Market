import { User } from '../models/User.js';
import { Listing } from '../models/Listing.js';
import { Report } from '../models/Report.js';
import { AuditLog } from '../models/AuditLog.js';
import { LISTING_STATUSES, REPORT_STATUSES, USER_STATUSES } from '../constants/index.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';
import { logAudit } from './auditService.js';

export const getDashboardStats = async () => {
  const [totalUsers, activeListings, soldListings, pendingReports, totalAuditLogs] = await Promise.all([
    User.countDocuments(),
    Listing.countDocuments({ status: LISTING_STATUSES.ACTIVE }),
    Listing.countDocuments({ status: LISTING_STATUSES.SOLD }),
    Report.countDocuments({ status: REPORT_STATUSES.PENDING }),
    AuditLog.countDocuments()
  ]);

  return {
    totalUsers,
    activeListings,
    soldListings,
    pendingReports,
    totalAuditLogs
  };
};

export const getUsers = async ({ search, status, page = 1, limit = 20 }) => {
  const query = {};
  if (search && search.trim()) {
    query.$or = [
      { name: { $regex: search.trim(), $options: 'i' } },
      { email: { $regex: search.trim(), $options: 'i' } }
    ];
  }
  if (status) query.status = status;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const [users, total] = await Promise.all([
    User.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    User.countDocuments(query)
  ]);

  return { users, total, page: pageNum, totalPages: Math.ceil(total / limitNum) };
};

export const updateUserStatus = async (adminId, userId, newStatus) => {
  if (!Object.values(USER_STATUSES).includes(newStatus)) {
    throw new BadRequestError('Invalid user status');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const prevStatus = user.status;
  user.status = newStatus;
  await user.save();

  await logAudit({
    actorId: adminId,
    action: `USER_STATUS_CHANGE_${newStatus}`,
    targetType: 'USER',
    targetId: userId,
    metadata: { previousStatus: prevStatus, newStatus }
  });

  return user;
};

export const getAllListings = async ({ search, status, brand, page = 1, limit = 20 }) => {
  const query = {};
  if (search && search.trim()) {
    query.$or = [
      { title: { $regex: search.trim(), $options: 'i' } },
      { model: { $regex: search.trim(), $options: 'i' } }
    ];
  }
  if (status) query.status = status;
  if (brand) query.brand = brand;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const [listings, total] = await Promise.all([
    Listing.find(query).populate('sellerId', 'name email').sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Listing.countDocuments(query)
  ]);

  return { listings, total, page: pageNum, totalPages: Math.ceil(total / limitNum) };
};

export const moderateListing = async (adminId, listingId, action, reason) => {
  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new NotFoundError('Listing not found');
  }

  let newStatus;
  if (action === 'APPROVE') {
    newStatus = LISTING_STATUSES.ACTIVE;
    listing.rejectionReason = null;
  } else if (action === 'REJECT') {
    newStatus = LISTING_STATUSES.REJECTED;
    listing.rejectionReason = reason || 'Rejected by marketplace moderator';
  } else if (action === 'ARCHIVE') {
    newStatus = LISTING_STATUSES.ARCHIVED;
  } else {
    throw new BadRequestError('Invalid moderation action (must be APPROVE, REJECT, or ARCHIVE)');
  }

  listing.status = newStatus;
  await listing.save();

  await logAudit({
    actorId: adminId,
    action: `MODERATE_LISTING_${action}`,
    targetType: 'LISTING',
    targetId: listingId,
    metadata: { action, reason }
  });

  return listing;
};

export const getReports = async ({ status, page = 1, limit = 20 }) => {
  const query = {};
  if (status) query.status = status;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const [reports, total] = await Promise.all([
    Report.find(query)
      .populate('reporterId', 'name email')
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Report.countDocuments(query)
  ]);

  return { reports, total, page: pageNum, totalPages: Math.ceil(total / limitNum) };
};

export const resolveReport = async (adminId, reportId, status, resolutionNote = '') => {
  if (!Object.values(REPORT_STATUSES).includes(status)) {
    throw new BadRequestError('Invalid report status');
  }

  const report = await Report.findById(reportId);
  if (!report) {
    throw new NotFoundError('Report not found');
  }

  report.status = status;
  report.reviewedBy = adminId;
  report.resolutionNote = resolutionNote;
  await report.save();

  await logAudit({
    actorId: adminId,
    action: `REPORT_${status}`,
    targetType: 'REPORT',
    targetId: reportId,
    metadata: { status, resolutionNote }
  });

  return report;
};

export const getAuditLogs = async ({ page = 1, limit = 50 }) => {
  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  const [logs, total] = await Promise.all([
    AuditLog.find().populate('actorId', 'name email role').sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    AuditLog.countDocuments()
  ]);

  return { logs, total, page: pageNum, totalPages: Math.ceil(total / limitNum) };
};
