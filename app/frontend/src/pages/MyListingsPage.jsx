import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import ConditionBadge from '../components/common/ConditionBadge.jsx';
import { useToast } from '../context/ToastContext.jsx';

const MyListingsPage = () => {
  const { showToast } = useToast();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchMyListings = useCallback(async () => {
    try {
      setLoading(true);
      const url = statusFilter ? `/listings/my?status=${statusFilter}` : '/listings/my';
      const res = await api.get(url);
      setListings(res.data.data);
    } catch (err) {
      showToast(err.message || 'Failed to load your listings', 'error');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, showToast]);

  useEffect(() => {
    fetchMyListings();
  }, [fetchMyListings]);

  const handleUpdateStatus = async (listingId, newStatus) => {
    try {
      await api.patch(`/listings/${listingId}/status`, { status: newStatus });
      showToast(`Listing status updated to ${newStatus}`, 'success');
      fetchMyListings();
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-secondary-container text-on-secondary-container">ACTIVE</span>;
      case 'RESERVED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-200 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200">RESERVED</span>;
      case 'SOLD':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-surface-container-high text-on-surface">SOLD</span>;
      case 'DRAFT':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-surface-container text-outline">DRAFT</span>;
      case 'ARCHIVED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-surface-container-low text-outline">ARCHIVED</span>;
      case 'REJECTED':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-error-container text-on-error-container">REJECTED</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-surface-container">
        <div>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">My Listings & Inventory</h1>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Manage your phone advertisements, adjust pricing, and confirm sales.
          </p>
        </div>
        <Link
          to="/create-listing"
          className="px-4 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-sm hover:bg-primary-container flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">add_circle</span> Post New Phone
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold">
        {[
          { label: 'All Listings', value: '' },
          { label: 'Active', value: 'ACTIVE' },
          { label: 'Reserved', value: 'RESERVED' },
          { label: 'Sold', value: 'SOLD' },
          { label: 'Archived', value: 'ARCHIVED' }
        ].map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setStatusFilter(tab.value)}
            className={`px-3 py-1.5 rounded-xl border transition-colors whitespace-nowrap ${
              statusFilter === tab.value
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface-container-low text-on-surface border-surface-container hover:bg-surface-container'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-surface-container-low rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-12 text-center space-y-3">
          <span className="material-symbols-outlined text-5xl text-outline">inventory_2</span>
          <h3 className="font-bold text-base text-on-surface">No listings found</h3>
          <p className="text-xs text-on-surface-variant">You have not posted any phones in this status category yet.</p>
          <Link to="/create-listing" className="inline-block mt-2 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold">
            Create Your First Listing
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((l) => (
            <div
              key={l._id}
              className="bg-surface-container-lowest border border-surface-container rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    l.images && l.images.length > 0
                      ? l.images[0]
                      : 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80'
                  }
                  alt={l.title}
                  className="w-20 h-20 rounded-xl object-contain bg-surface-container-low p-2 shrink-0 border border-surface-container"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(l.status)}
                    <ConditionBadge condition={l.condition} />
                  </div>
                  <Link to={`/listings/${l._id}`} className="font-bold text-sm text-on-surface hover:text-primary transition-colors block">
                    {l.title}
                  </Link>
                  <p className="text-xs text-on-surface-variant font-medium">
                    ${l.price.toLocaleString()} • {l.city} • Views: {l.viewsCount} • Created {new Date(l.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 self-end md:self-center">
                <Link
                  to={`/listings/${l._id}`}
                  className="px-3 py-1.5 rounded-xl border border-surface-container bg-surface-container-low text-xs font-bold hover:bg-surface-container transition-colors"
                >
                  View Ad
                </Link>

                {l.status === 'ACTIVE' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(l._id, 'RESERVED')}
                    className="px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700/50 text-xs font-bold hover:bg-amber-200 dark:hover:bg-amber-900/60 transition-colors"
                  >
                    Mark Reserved
                  </button>
                )}

                {(l.status === 'ACTIVE' || l.status === 'RESERVED') && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(l._id, 'SOLD')}
                    className="px-3 py-1.5 rounded-xl bg-secondary text-on-secondary text-xs font-bold hover:opacity-90 transition-opacity"
                  >
                    Confirm Sold
                  </button>
                )}

                {l.status === 'RESERVED' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(l._id, 'ACTIVE')}
                    className="px-3 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors"
                  >
                    Unreserve (Make Active)
                  </button>
                )}

                {l.status !== 'ARCHIVED' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(l._id, 'ARCHIVED')}
                    className="px-2.5 py-1.5 text-outline hover:text-error text-xs font-bold transition-colors"
                    title="Archive listing"
                  >
                    Archive
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListingsPage;
