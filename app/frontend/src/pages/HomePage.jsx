import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.js';
import ListingCard from '../components/common/ListingCard.jsx';
import SafetyBanner from '../components/common/SafetyBanner.jsx';

const HomePage = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/listings?limit=6');
        setFeaturedListings(res.data.data);
      } catch (err) {
        console.error('Failed to load featured listings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-12">
      {/* Real-time Hardware Lab Micro-ticker */}
      <div className="bg-surface-container-low border-b border-surface-container py-2.5 px-4 text-xs text-on-surface-variant font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-secondary font-bold">
              <span className="material-symbols-outlined text-base">verified</span>
              90-Point Hardware Lab Pass Guaranteed
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-primary font-semibold">
              <span className="material-symbols-outlined text-base">inventory_2</span>
              100% Carrier-Unlocked Flexibility
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-on-surface font-semibold">Live Marketplace Volume: 2,400+ Verified Upgraders</span>
          </div>
        </div>
      </div>

      {/* DUAL-PATH HERO SHOWCASE (From Stitch Image 10.html & Image 12.html) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Hero Card: Brand New Flagships */}
          <div className="lg:col-span-6 relative overflow-hidden rounded-3xl bg-surface-container-low p-8 flex flex-col justify-between border border-surface-container shadow-sm hover:shadow-md transition-all group">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary text-[11px] font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[14px]">verified</span> Factory Sealed
                </span>
                <span className="text-xs font-bold text-on-surface-variant">Latest 2024–2025 Generation</span>
              </div>
              <h1 className="font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight leading-tight">
                Brand New Flagships. <br />
                <span className="text-primary">Uncompromising Performance.</span>
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed max-w-md">
                Direct from verified sellers. Factory sealed retail packaging, full carrier unlocked flexibility, and 1-year manufacturer guarantee.
              </p>

              {/* Price Badges Preview */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container">
                  <span className="text-[10px] uppercase font-bold text-outline block">iPhone 16 Pro</span>
                  <span className="font-extrabold text-base text-on-surface block mt-0.5">$999</span>
                  <span className="text-[10px] text-secondary font-semibold">or $41.62/mo</span>
                </div>
                <div className="bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container">
                  <span className="text-[10px] uppercase font-bold text-outline block">S24 Ultra</span>
                  <span className="font-extrabold text-base text-on-surface block mt-0.5">$1,299</span>
                  <span className="text-[10px] text-secondary font-semibold">or $54.12/mo</span>
                </div>
                <div className="bg-surface-container-lowest p-2.5 rounded-xl border border-surface-container">
                  <span className="text-[10px] uppercase font-bold text-outline block">Pixel 9 Pro</span>
                  <span className="font-extrabold text-base text-on-surface block mt-0.5">$899</span>
                  <span className="text-[10px] text-secondary font-semibold">or $37.45/mo</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-surface-container">
              <Link
                to="/browse?condition=NEW"
                className="px-5 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-sm hover:bg-primary-container transition-all flex items-center gap-2"
              >
                Explore Factory New <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <span className="text-xs text-on-surface-variant flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-secondary text-base">check_circle</span> 0% P2P Negotiation Fees
              </span>
            </div>
          </div>

          {/* Right Hero Card: Certified Pre-Owned */}
          <div className="lg:col-span-6 relative overflow-hidden rounded-3xl bg-surface-container p-8 flex flex-col justify-between border border-surface-container-high shadow-sm hover:shadow-md transition-all group">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[14px]">eco</span> Up to 50% Off Retail
                </span>
                <span className="text-xs font-bold text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span> Lab Certified
                </span>
              </div>
              <h2 className="font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight leading-tight">
                Certified Pre-Owned. <br />
                <span className="text-secondary">Flagship Power, Smarter Price.</span>
              </h2>
              <p className="text-sm text-on-surface-variant leading-relaxed max-w-md">
                Strict 90-point diagnostic pass. Battery capacity guaranteed ≥ 85%, pristine cosmetic grades, and transparent hardware test reports.
              </p>

              {/* Quality Checklist */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-on-surface font-semibold">
                <div className="flex items-center gap-2 bg-surface-container-lowest/80 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-secondary text-base">battery_charging_full</span>
                  <span>Battery Health ≥ 85%</span>
                </div>
                <div className="flex items-center gap-2 bg-surface-container-lowest/80 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-secondary text-base">phonelink_lock</span>
                  <span>Clean IMEI & Carrier Unlocked</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-surface-container-high">
              <Link
                to="/browse?condition=LIKE_NEW"
                className="px-5 py-3 rounded-xl bg-secondary text-on-secondary font-bold text-sm shadow-sm hover:opacity-90 transition-all flex items-center gap-2"
              >
                Shop Certified Pre-Owned <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <Link to="/grading-standards" className="text-xs text-primary font-bold hover:underline">
                View Grading Standards →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Notice Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SafetyBanner />
      </div>

      {/* Featured Phones Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Live Inventory</span>
            <h2 className="text-2xl font-black text-on-surface tracking-tight">Featured Phone Listings</h2>
            <p className="text-xs text-on-surface-variant mt-1">
              Top selected smartphones verified by community sellers and ready for fast local meetup or direct purchase.
            </p>
          </div>
          <Link
            to="/browse"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            Explore all listings <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-surface-container-low rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : featuredListings.length === 0 ? (
          <div className="bg-surface-container-lowest border border-surface-container rounded-2xl p-12 text-center">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">inventory_2</span>
            <p className="font-bold text-sm text-on-surface">No active listings available right now.</p>
            <Link to="/create-listing" className="inline-block mt-3 px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-xl">
              Post the First Phone Ad
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </section>

      {/* 3-Step Rapid Trading CTA (From Stitch Image 12.html & 15.html) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Simple & Safe</span>
            <h2 className="text-2xl sm:text-3xl font-black text-on-surface">
              Trade In or Sell Your Phone in 3 Clicks
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Post your phone listing with photos, negotiate directly with genuine local buyers, and get paid with zero commissions taken by MobileMart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2 p-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center mx-auto text-xl font-bold">
                1
              </div>
              <h3 className="font-bold text-sm text-on-surface">Select Model & Specs</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Choose manufacturer, storage, color, and upload real photos showing honest condition.
              </p>
            </div>

            <div className="text-center space-y-2 p-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center mx-auto text-xl font-bold">
                2
              </div>
              <h3 className="font-bold text-sm text-on-surface">Connect & Chat</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Receive offers, answer buyer questions, and agree on price through built-in inquiry messaging.
              </p>
            </div>

            <div className="text-center space-y-2 p-4">
              <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center mx-auto text-xl font-bold">
                3
              </div>
              <h3 className="font-bold text-sm text-on-surface">Direct Settlement</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Meet safely in public, hand over the verified phone, receive payment directly, and confirm sold!
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/create-listing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm shadow hover:bg-primary-container transition-all"
            >
              Start Listing Your Device Now <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
