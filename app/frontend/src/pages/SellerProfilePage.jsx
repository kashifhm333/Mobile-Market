import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api.js';
import ListingCard from '../components/common/ListingCard.jsx';
import { useToast } from '../context/ToastContext.jsx';

const SellerProfilePage = () => {
  const { id } = useParams();
  const { showToast } = useToast();

  const [seller, setSeller] = useState(null);
  const [sellerListings, setSellerListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        setLoading(true);
        // Find listings by this seller
        const res = await api.get(`/listings?limit=20`);
        const matching = res.data.data.filter((l) => String(l.sellerId?._id) === String(id));
        setSellerListings(matching);

        if (matching.length > 0 && matching[0].sellerId) {
          setSeller(matching[0].sellerId);
        } else {
          setSeller({
            name: 'Verified Seller',
            city: 'United States',
            avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            bio: 'Verified community seller on MobileMart.'
          });
        }
      } catch (err) {
        showToast(err.message || 'Failed to load seller profile', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchSellerData();
  }, [id, showToast]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-outline">
        Loading seller profile...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Seller Header Profile Card */}
      <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-5">
          <img
            src={seller?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
            alt={seller?.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-primary"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-on-surface">{seller?.name}</h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-secondary bg-secondary-container px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-[13px]">verified</span> Verified Upgrader
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Location: <strong>{seller?.city || 'United States'}</strong> • Member since 2024
            </p>
            <p className="text-xs text-on-surface max-w-lg mt-2 leading-relaxed">
              {seller?.bio || 'Regularly upgrading personal mobile hardware. Dedicated to honest condition grading.'}
            </p>
          </div>
        </div>

        <div className="text-right sm:border-l border-surface-container sm:pl-6 space-y-1">
          <span className="text-xs font-bold text-outline block">Active Listings</span>
          <span className="text-3xl font-black text-primary block">{sellerListings.length}</span>
        </div>
      </div>

      {/* Seller's Active Phones */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-on-surface">Phones Listed by {seller?.name}</h2>

        {sellerListings.length === 0 ? (
          <div className="bg-surface-container-lowest border border-surface-container rounded-2xl p-12 text-center text-xs text-outline">
            This seller currently has no other active phone advertisements.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellerListings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProfilePage;
