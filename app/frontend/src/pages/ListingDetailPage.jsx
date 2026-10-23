import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api.js';
import ConditionBadge from '../components/common/ConditionBadge.jsx';
import SafetyBanner from '../components/common/SafetyBanner.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Inquiry modal state
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState('Hi! I am interested in this phone. Is it still available for inspection?');
  const [proposedPrice, setProposedPrice] = useState('');
  const [submittingInquiry, setSubmittingInquiry] = useState(false);

  // Report modal state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('FRAUD');
  const [reportDescription, setReportDescription] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/listings/${id}`);
        setListing(res.data.data.listing);
        if (res.data.data.listing?.price) {
          setProposedPrice(res.data.data.listing.price);
        }
      } catch (err) {
        showToast(err.message || 'Failed to load listing', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id, showToast]);

  const handleStartInquiry = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showToast('Please log in to contact the seller', 'error');
      navigate('/login');
      return;
    }

    try {
      setSubmittingInquiry(true);
      const res = await api.post('/conversations', {
        listingId: listing._id,
        message: inquiryMessage,
        proposedPrice: proposedPrice ? Number(proposedPrice) : null
      });
      showToast('Inquiry sent to seller successfully!', 'success');
      setInquiryModalOpen(false);
      navigate(`/conversations/${res.data.data._id}`);
    } catch (err) {
      showToast(err.message || 'Failed to send inquiry', 'error');
    } finally {
      setSubmittingInquiry(false);
    }
  };

  const handleSendReport = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showToast('Please log in to report a listing', 'error');
      navigate('/login');
      return;
    }

    try {
      setSubmittingReport(true);
      await api.post('/reports', {
        targetType: 'LISTING',
        targetId: listing._id,
        reason: reportReason,
        description: reportDescription
      });
      showToast('Report submitted. Our moderation team will investigate.', 'success');
      setReportModalOpen(false);
      setReportDescription('');
    } catch (err) {
      showToast(err.message || 'Failed to submit report', 'error');
    } finally {
      setSubmittingReport(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-on-surface-variant font-medium">Loading phone specifications...</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <span className="material-symbols-outlined text-5xl text-outline">search_off</span>
        <h2 className="text-xl font-bold text-on-surface">Listing not found or no longer active</h2>
        <Link to="/browse" className="inline-block px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold">
          Browse Active Phones
        </Link>
      </div>
    );
  }

  const isOwner = user && listing.sellerId && String(listing.sellerId._id) === String(user._id);
  const favorited = isFavorite(listing._id);

  const images =
    listing.images && listing.images.length > 0
      ? listing.images
      : ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-on-surface-variant">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to="/browse" className="hover:text-primary">Phones</Link>
        <span>/</span>
        <span className="text-on-surface font-semibold truncate max-w-xs">{listing.title}</span>
      </nav>

      {/* Reserved or Sold Alert */}
      {listing.status === 'RESERVED' && (
        <div className="bg-amber-100 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/50 text-amber-900 dark:text-amber-200 rounded-2xl p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl text-amber-700 dark:text-amber-400">lock_clock</span>
          <p className="text-xs font-bold">
            This phone is currently RESERVED for an agreed buyer. Inquiries may be paused.
          </p>
        </div>
      )}
      {listing.status === 'SOLD' && (
        <div className="bg-surface-container-high border border-outline-variant text-on-surface rounded-2xl p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl text-secondary">check_circle</span>
          <p className="text-xs font-bold">
            This phone has been SOLD. This listing is preserved for reference only.
          </p>
        </div>
      )}

      {/* Product Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-surface-container-low rounded-3xl p-6 border border-surface-container flex items-center justify-center overflow-hidden h-96">
            <img
              src={images[activeImageIndex] || images[0]}
              alt={listing.title}
              className="max-h-80 w-full object-contain drop-shadow-md"
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-xl border-2 p-1.5 bg-surface-container-lowest shrink-0 transition-all ${
                    activeImageIndex === idx ? 'border-primary ring-2 ring-primary/20' : 'border-surface-container'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Specs Micro-cards */}
          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
            <div className="bg-surface-container-lowest p-3 rounded-2xl border border-surface-container">
              <span className="text-[10px] uppercase font-bold text-outline block">Storage</span>
              <span className="font-extrabold text-on-surface block mt-0.5">
                {listing.specifications?.storage || '128GB'}
              </span>
            </div>
            <div className="bg-surface-container-lowest p-3 rounded-2xl border border-surface-container">
              <span className="text-[10px] uppercase font-bold text-outline block">Battery</span>
              <span className="font-extrabold text-secondary block mt-0.5">
                {listing.specifications?.batteryHealth ? `${listing.specifications.batteryHealth}% Health` : '100% (New)'}
              </span>
            </div>
            <div className="bg-surface-container-lowest p-3 rounded-2xl border border-surface-container">
              <span className="text-[10px] uppercase font-bold text-outline block">Carrier</span>
              <span className="font-extrabold text-on-surface block mt-0.5">
                {listing.specifications?.carrier || 'Unlocked'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Specs & Inquiry Box (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <ConditionBadge condition={listing.condition} />
              <button
                type="button"
                onClick={() => toggleFavorite(listing._id)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs font-semibold transition-colors"
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    favorited ? 'text-error fill-current' : 'text-outline'
                  }`}
                >
                  favorite
                </span>
                <span>{favorited ? 'Saved' : 'Save Favorite'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight leading-snug">
              {listing.title}
            </h1>

            <div className="flex items-center gap-3 text-xs text-on-surface-variant mt-2 font-medium">
              <span>Brand: <strong>{listing.brand}</strong></span>
              <span>•</span>
              <span>Location: <strong>{listing.city}</strong></span>
              <span>•</span>
              <span>Views: {listing.viewsCount}</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-3xl font-black text-on-surface">
                ${listing.price.toLocaleString()}
              </span>
              <span className="ml-2 text-xs font-bold text-secondary">
                {listing.negotiable ? '• Price Negotiable' : '• Firm Price'}
              </span>
              <span className="block text-xs text-on-surface-variant mt-0.5">
                Estimated ${(listing.price / 24).toFixed(2)}/mo on 24-month financing
              </span>
            </div>

            {/* Inquiry Action */}
            {listing.status === 'ACTIVE' && !isOwner && (
              <button
                type="button"
                onClick={() => setInquiryModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-container transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
                Contact Seller / Make Offer
              </button>
            )}

            {isOwner && (
              <Link
                to="/my-listings"
                className="px-5 py-2.5 rounded-xl bg-surface-container text-primary font-bold text-xs"
              >
                Manage This Listing
              </Link>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-on-surface">Seller's Description</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed whitespace-pre-line bg-surface-container-lowest p-4 rounded-2xl border border-surface-container">
              {listing.description}
            </p>
          </div>

          {/* Detailed Specifications Table */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-on-surface">Hardware & Verification Specs</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-surface-container">
                <span className="text-outline text-[11px] block">Model</span>
                <span className="font-bold text-on-surface">{listing.model}</span>
              </div>
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-surface-container">
                <span className="text-outline text-[11px] block">Color</span>
                <span className="font-bold text-on-surface">{listing.specifications?.color || 'Standard'}</span>
              </div>
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-surface-container">
                <span className="text-outline text-[11px] block">RAM Memory</span>
                <span className="font-bold text-on-surface">{listing.specifications?.ram || '8GB'}</span>
              </div>
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-surface-container">
                <span className="text-outline text-[11px] block">Screen Condition</span>
                <span className="font-bold text-on-surface">{listing.specifications?.screenCondition || 'Flawless'}</span>
              </div>
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-surface-container">
                <span className="text-outline text-[11px] block">Accessories</span>
                <span className="font-bold text-on-surface">
                  {listing.specifications?.accessoriesIncluded?.join(', ') || 'Original Cable'}
                </span>
              </div>
              <div className="p-3 bg-surface-container-lowest rounded-xl border border-surface-container">
                <span className="text-outline text-[11px] block">IMEI / Blacklist Check</span>
                <span className="font-bold text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span> Clean
                </span>
              </div>
            </div>
          </div>

          {/* Seller Profile Summary Card */}
          {listing.sellerId && (
            <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-container flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={
                    listing.sellerId.avatarUrl ||
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
                  }
                  alt={listing.sellerId.name}
                  className="w-12 h-12 rounded-full object-cover border border-outline-variant"
                />
                <div>
                  <h4 className="font-bold text-sm text-on-surface">{listing.sellerId.name}</h4>
                  <p className="text-[11px] text-on-surface-variant">
                    Location: {listing.sellerId.city || listing.city} • Member since{' '}
                    {new Date(listing.sellerId.createdAt || Date.now()).getFullYear()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/sellers/${listing.sellerId._id}`}
                  className="px-3 py-1.5 rounded-xl border border-surface-container bg-surface-container-lowest text-primary font-bold text-xs hover:bg-surface-container"
                >
                  View Profile
                </Link>
                <button
                  type="button"
                  onClick={() => setReportModalOpen(true)}
                  className="p-1.5 text-outline hover:text-error transition-colors"
                  title="Report Listing"
                >
                  <span className="material-symbols-outlined text-base">flag</span>
                </button>
              </div>
            </div>
          )}

          {/* External Payment Safety Banner */}
          <SafetyBanner />
        </div>
      </div>

      {/* Inquiry Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-surface-container space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-lg text-on-surface">Start Inquiry with Seller</h3>
              <button type="button" onClick={() => setInquiryModalOpen(false)} className="text-outline hover:text-on-surface">
                ✕
              </button>
            </div>

            <p className="text-xs text-on-surface-variant">
              Send a message directly to <strong>{listing.sellerId?.name}</strong> to ask questions, propose a meetup location, or negotiate price.
            </p>

            <form onSubmit={handleStartInquiry} className="space-y-4">
              <div>
                <label className="text-xs font-bold block mb-1">Your Proposed Price ($ USD)</label>
                <input
                  type="number"
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(e.target.value)}
                  className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Initial Message</label>
                <textarea
                  rows="3"
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div className="bg-amber-50 dark:bg-slate-800 p-3 rounded-xl border border-amber-200 dark:border-amber-700/50 text-[11px] text-amber-900 dark:text-amber-200">
                <strong className="dark:text-amber-100">Safety Reminder:</strong> Agree to inspect the phone before transferring any cash. MobileMart does not hold funds.
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setInquiryModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold hover:bg-surface-container-low"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingInquiry}
                  className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container disabled:opacity-50"
                >
                  {submittingInquiry ? 'Sending...' : 'Send Inquiry Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-6 shadow-2xl border border-surface-container space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-lg text-on-surface">Report Listing</h3>
              <button type="button" onClick={() => setReportModalOpen(false)} className="text-outline hover:text-on-surface">
                ✕
              </button>
            </div>

            <form onSubmit={handleSendReport} className="space-y-4">
              <div>
                <label className="text-xs font-bold block mb-1">Reason for Report</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs"
                >
                  <option value="FRAUD">Suspected Fraud or Scam</option>
                  <option value="MISLEADING_SPECS">Incorrect or Fake Hardware Specifications</option>
                  <option value="SPAM">Spam or Duplicate Post</option>
                  <option value="INAPPROPRIATE">Inappropriate Content or Photos</option>
                  <option value="OTHER">Other Issue</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Details & Description</label>
                <textarea
                  rows="3"
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Please describe why this listing should be investigated by moderators..."
                  className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold hover:bg-surface-container-low"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingReport}
                  className="px-5 py-2.5 rounded-xl bg-error text-on-error text-xs font-bold hover:opacity-90 disabled:opacity-50"
                >
                  {submittingReport ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetailPage;
