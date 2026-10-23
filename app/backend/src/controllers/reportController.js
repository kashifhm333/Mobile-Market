import { Report } from '../models/Report.js';

export const createReport = async (req, res, next) => {
  try {
    const { targetType, targetId, reason, description } = req.body;
    const report = await Report.create({
      reporterId: req.user._id,
      targetType,
      targetId,
      reason,
      description
    });
    res.status(201).json({
      success: true,
      message: 'Report submitted. Our moderation team will investigate.',
      data: report
    });
  } catch (err) {
    next(err);
  }
};
