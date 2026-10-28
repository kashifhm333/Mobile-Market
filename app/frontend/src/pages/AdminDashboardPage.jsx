import React, { useEffect, useState, useCallback } from 'react';
import { Package, Users, Flag, History, Check, X, ShieldAlert } from 'lucide-react';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';
import ConditionBadge from '../components/common/ConditionBadge.jsx';

const AdminDashboardPage = () => {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('listings'); // 'listings', 'users', 'reports', 'audits'
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  // Listings state
  const [listings, setListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(false);

  // Users state
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Reports state
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);

  // Audits state
  const [auditLogs, setAuditLogs] = useState([]);
  const [loadingAudits, setLoadingAudits] = useState(false);

  // Rejection modal
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [targetListingId, setTargetListingId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const fetchStats = useCallback(async () => {
    try {
      setLoadingStats(true);
      const res = await api.get('/admin/stats');
      setStats(res.data.data);
    } catch (err) {
      console.error('Failed to load stats', err);
    } finally {
      setLoadingStats(false);
    }
  }, []);

  const fetchListings = useCallback(async () => {
    try {
      setLoadingListings(true);
      const res = await api.get('/admin/listings?limit=30');
      setListings(res.data.data);
    } catch (err) {
      showToast(err.message || 'Failed to load listings', 'error');
    } finally {
      setLoadingListings(false);
    }
  }, [showToast]);

  const fetchUsers = useCallback(async () => {
    try {
      setLoadingUsers(true);
      const res = await api.get('/admin/users?limit=30');
      setUsers(res.data.data);
    } catch (err) {
      showToast(err.message || 'Failed to load users', 'error');
    } finally {
      setLoadingUsers(false);
    }
  }, [showToast]);

  const fetchReports = useCallback(async () => {
    try {
      setLoadingReports(true);
      const res = await api.get('/admin/reports?limit=30');
      setReports(res.data.data);
    } catch (err) {
      showToast(err.message || 'Failed to load reports', 'error');
    } finally {
      setLoadingReports(false);
    }
  }, [showToast]);

  const fetchAudits = useCallback(async () => {
    try {
      setLoadingAudits(true);
      const res = await api.get('/admin/audit-logs?limit=40');
      setAuditLogs(res.data.data);
    } catch (err) {
      showToast(err.message || 'Failed to load audit logs', 'error');
    } finally {
      setLoadingAudits(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    if (activeTab === 'listings') fetchListings();
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'reports') fetchReports();
    if (activeTab === 'audits') fetchAudits();
  }, [activeTab, fetchListings, fetchUsers, fetchReports, fetchAudits]);

  const handleModerate = async (listingId, action, reason = '') => {
    try {
      await api.patch(`/admin/listings/${listingId}/moderate`, { action, reason });
      showToast(`Listing ${action.toLowerCase()}d successfully`, 'success');
      fetchListings();
      fetchStats();
    } catch (err) {
      showToast(err.message || 'Moderation action failed', 'error');
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      await api.patch(`/admin/users/${userId}/status`, { status: newStatus });
      showToast(`User marked as ${newStatus}`, 'success');
      fetchUsers();
    } catch (err) {
      showToast(err.message || 'Failed to update user', 'error');
    }
  };

  const handleResolveReport = async (reportId, status) => {
    try {
      await api.patch(`/admin/reports/${reportId}`, {
        status,
        resolutionNote: 'Reviewed and acted upon by admin'
      });
      showToast(`Report updated to ${status}`, 'success');
      fetchReports();
      fetchStats();
    } catch (err) {
      showToast(err.message || 'Failed to resolve report', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-error">Administration Portal</span>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">Marketplace Operations & Trust</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-surface-container text-xs font-bold text-on-surface border border-surface-container-high">
            Staff Role: SUPER_ADMIN
          </span>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-surface p-4 rounded-2xl border border-surface-container shadow-sm">
          <span className="text-[11px] font-bold text-on-surface-variant block">Registered Users</span>
          <span className="text-2xl font-black text-on-surface block mt-1">
            {loadingStats ? '...' : stats?.totalUsers || 0}
          </span>
        </div>
        <div className="bg-surface p-4 rounded-2xl border border-surface-container shadow-sm">
          <span className="text-[11px] font-bold text-secondary block">Active Listings</span>
          <span className="text-2xl font-black text-secondary block mt-1">
            {loadingStats ? '...' : stats?.activeListings || 0}
          </span>
        </div>
        <div className="bg-surface p-4 rounded-2xl border border-surface-container shadow-sm">
          <span className="text-[11px] font-bold text-secondary block">Confirmed Sales</span>
          <span className="text-2xl font-black text-secondary block mt-1">
            {loadingStats ? '...' : stats?.soldListings || 0}
          </span>
        </div>
        <div className="bg-surface p-4 rounded-2xl border border-surface-container shadow-sm">
          <span className="text-[11px] font-bold text-error block">Pending Reports</span>
          <span className="text-2xl font-black text-error block mt-1">
            {loadingStats ? '...' : stats?.pendingReports || 0}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-container pb-2 text-xs font-bold">
        {[
          { id: 'listings', label: 'Listing Moderation', IconComponent: Package },
          { id: 'users', label: 'User Accounts', IconComponent: Users },
          { id: 'reports', label: `Reports (${stats?.pendingReports || 0})`, IconComponent: Flag },
          { id: 'audits', label: 'Audit Trail Logs', IconComponent: History }
        ].map((t) => {
          const Icon = t.IconComponent;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-colors border ${
                activeTab === t.id
                  ? 'bg-accent text-on-accent border-accent font-black shadow-sm'
                  : 'text-on-surface border-transparent hover:bg-surface-container-low'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Listings Moderation */}
      {activeTab === 'listings' && (
        <div className="bg-surface border border-surface-container rounded-3xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-surface-container flex items-center justify-between">
            <h3 className="font-bold text-sm text-on-surface">Marketplace Listings</h3>
            <button type="button" onClick={fetchListings} className="text-xs text-secondary font-bold hover:underline">
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[10px] tracking-wider border-b border-surface-container">
                <tr>
                  <th className="py-3 px-4">Title & Phone</th>
                  <th className="py-3 px-4">Seller</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {loadingListings ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-on-surface-variant">Loading listings...</td>
                  </tr>
                ) : listings.map((l) => (
                  <tr key={l._id} className="hover:bg-surface-container-low/40">
                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-bold text-on-surface truncate">{l.title}</p>
                      <span className="text-[10px] text-on-surface-variant">{l.brand} • {l.model}</span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-on-surface">{l.sellerId?.name || 'Unknown'}</p>
                      <p className="text-[10px] text-on-surface-variant">{l.sellerId?.email}</p>
                    </td>
                    <td className="py-3 px-4 font-bold">${l.price?.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        l.status === 'ACTIVE' ? 'bg-secondary-container text-on-secondary-container border-secondary/30' :
                        l.status === 'REJECTED' ? 'bg-error-container text-on-error-container border-error/30' : 'bg-surface-container border-surface-container-high'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        {l.status !== 'ACTIVE' && (
                          <button
                            type="button"
                            onClick={() => handleModerate(l._id, 'APPROVE')}
                            className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-bold text-[10px]"
                          >
                            Approve
                          </button>
                        )}
                        {l.status !== 'REJECTED' && (
                          <button
                            type="button"
                            onClick={() => {
                              setTargetListingId(l._id);
                              setRejectModalOpen(true);
                            }}
                            className="px-2.5 py-1 rounded bg-error text-white font-bold text-[10px]"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: User Accounts */}
      {activeTab === 'users' && (
        <div className="bg-surface border border-surface-container rounded-3xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-surface-container">
            <h3 className="font-bold text-sm text-on-surface">Registered User Directory</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[10px] tracking-wider border-b border-surface-container">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {loadingUsers ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-on-surface-variant">Loading users...</td>
                  </tr>
                ) : users.map((u) => (
                  <tr key={u._id} className="hover:bg-surface-container-low/40">
                    <td className="py-3 px-4">
                      <p className="font-bold text-on-surface">{u.name}</p>
                      <p className="text-[10px] text-on-surface-variant">{u.email}</p>
                    </td>
                    <td className="py-3 px-4 font-bold">{u.role}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        u.status === 'ACTIVE' ? 'bg-secondary-container text-on-secondary-container border-secondary/30' : 'bg-error-container text-on-error-container border-error/30'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{u.city || 'Not specified'}</td>
                    <td className="py-3 px-4">
                      {u.role !== 'ADMIN' && (
                        <button
                          type="button"
                          onClick={() => handleToggleUserStatus(u._id, u.status)}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                            u.status === 'ACTIVE'
                              ? 'bg-error-container text-on-error-container hover:bg-error hover:text-white'
                              : 'bg-secondary text-on-secondary'
                          }`}
                        >
                          {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Reports */}
      {activeTab === 'reports' && (
        <div className="bg-surface border border-surface-container rounded-3xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-surface-container">
            <h3 className="font-bold text-sm text-on-surface">Community Safety Reports</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[10px] tracking-wider border-b border-surface-container">
                <tr>
                  <th className="py-3 px-4">Target & Reason</th>
                  <th className="py-3 px-4">Reporter</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {loadingReports ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-on-surface-variant">Loading reports...</td>
                  </tr>
                ) : reports.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-on-surface-variant">No community reports submitted.</td>
                  </tr>
                ) : reports.map((r) => (
                  <tr key={r._id} className="hover:bg-surface-container-low/40">
                    <td className="py-3 px-4">
                      <span className="font-bold text-on-surface block">{r.targetType}</span>
                      <span className="text-[10px] text-error font-bold">{r.reason}</span>
                    </td>
                    <td className="py-3 px-4">{r.reporterId?.name || 'Anonymous'}</td>
                    <td className="py-3 px-4 max-w-xs">{r.description}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container border border-surface-container-high">
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {r.status === 'PENDING' && (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleResolveReport(r._id, 'RESOLVED')}
                            className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-bold text-[10px]"
                          >
                            Resolve
                          </button>
                          <button
                            type="button"
                            onClick={() => handleResolveReport(r._id, 'DISMISSED')}
                            className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-bold text-[10px] border border-surface-container-high"
                          >
                            Dismiss
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Audit Logs */}
      {activeTab === 'audits' && (
        <div className="bg-surface border border-surface-container rounded-3xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-surface-container">
            <h3 className="font-bold text-sm text-on-surface">Administrative Audit Trail</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-container-low text-on-surface-variant uppercase text-[10px] tracking-wider border-b border-surface-container font-sans">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Target</th>
                  <th className="py-3 px-4">Metadata</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {loadingAudits ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-on-surface-variant font-sans">Loading audit logs...</td>
                  </tr>
                ) : auditLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-surface-container-low/40">
                    <td className="py-2.5 px-4 text-[11px] text-on-surface-variant">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4 font-sans font-bold">
                      {log.actorId?.name || log.actorId?.email || 'System'}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-secondary">{log.action}</td>
                    <td className="py-2.5 px-4 text-[11px]">{log.targetType}:{log.targetId?.slice(-6)}</td>
                    <td className="py-2.5 px-4 text-[10px] text-on-surface-variant max-w-xs truncate">
                      {JSON.stringify(log.metadata || {})}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl max-w-md w-full p-6 shadow-2xl border border-surface-container space-y-4">
            <h3 className="font-black text-lg text-on-surface">Reject Listing with Reason</h3>
            <p className="text-xs text-on-surface-variant">
              The recorded rejection reason will be audited and displayed to the seller.
            </p>
            <textarea
              rows="3"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Counterfeit device / Prohibited item / Unverified IMEI..."
              className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-error"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold hover:bg-surface-container border border-surface-container"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleModerate(targetListingId, 'REJECT', rejectionReason);
                  setRejectModalOpen(false);
                  setRejectionReason('');
                }}
                className="px-5 py-2.5 rounded-xl bg-error text-white font-bold text-xs"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
