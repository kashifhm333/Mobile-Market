import { AuditLog } from '../models/AuditLog.js';

export const logAudit = async ({ actorId, action, targetType, targetId, metadata = {} }) => {
  try {
    await AuditLog.create({
      actorId,
      action,
      targetType,
      targetId: String(targetId),
      metadata
    });
  } catch (err) {
    console.error('[AuditService Error] Failed to write audit record:', err.message);
  }
};
