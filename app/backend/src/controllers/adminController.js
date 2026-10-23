import * as adminService from '../services/adminService.js';

export const getStats = async (req, res, next) => {
  try {
    const stats = await adminService.getDashboardStats();
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const result = await adminService.getUsers(req.query);
    res.status(200).json({
      success: true,
      data: result.users,
      meta: { total: result.total, page: result.page, totalPages: result.totalPages }
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const user = await adminService.updateUserStatus(req.user._id, req.params.id, status);
    res.status(200).json({
      success: true,
      message: `User status changed to ${status}`,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const result = await adminService.getAllListings(req.query);
    res.status(200).json({
      success: true,
      data: result.listings,
      meta: { total: result.total, page: result.page, totalPages: result.totalPages }
    });
  } catch (err) {
    next(err);
  }
};

export const moderateListing = async (req, res, next) => {
  try {
    const { action, reason } = req.body;
    const listing = await adminService.moderateListing(req.user._id, req.params.id, action, reason);
    res.status(200).json({
      success: true,
      message: `Listing moderation completed: ${action}`,
      data: listing
    });
  } catch (err) {
    next(err);
  }
};

export const getReports = async (req, res, next) => {
  try {
    const result = await adminService.getReports(req.query);
    res.status(200).json({
      success: true,
      data: result.reports,
      meta: { total: result.total, page: result.page, totalPages: result.totalPages }
    });
  } catch (err) {
    next(err);
  }
};

export const resolveReport = async (req, res, next) => {
  try {
    const { status, resolutionNote } = req.body;
    const report = await adminService.resolveReport(req.user._id, req.params.id, status, resolutionNote);
    res.status(200).json({
      success: true,
      message: 'Report resolved',
      data: report
    });
  } catch (err) {
    next(err);
  }
};

export const getAuditLogs = async (req, res, next) => {
  try {
    const result = await adminService.getAuditLogs(req.query);
    res.status(200).json({
      success: true,
      data: result.logs,
      meta: { total: result.total, page: result.page, totalPages: result.totalPages }
    });
  } catch (err) {
    next(err);
  }
};
