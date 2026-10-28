import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Package,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BatteryCharging,
  Lock,
  PlusCircle,
  Inbox
} from 'lucide-react';
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
      {/* Real-time Hardware Standards Micro-ticker */}
      <div className="bg-surface-container-low border-b border-surface-container py-2.5 px-4 text-xs text-on-surface-variant font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-secondary font-bold">
              <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
              90-Point Hardware Lab Pass Guaranteed
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-on-surface font-semibold">
              <Package className="w-4 h-4 text-secondary shrink-0" />
              100% Carrier-Unlocked Flexibility
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-on-surface font-semibold">Peer-to-Peer Direct Settlement • Zero Platform Fees</span>
          </div>
        </div>
      </div>

      {/* DUAL-PATH HERO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Hero Card: Brand New Flagships */}
          <div className="lg:col-span-6 relative overflow-hidden rounded-3xl bg-surface p-8 flex flex-col justify-between border border-surface-container shadow-sm hover:border-outline-variant transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-wider border border-secondary/20">
                  <Package className="w-3.5 h-3.5 text-secondary" /> Factory Sealed
                </span>
                <span className="text-xs font-bold text-on-surface-variant">Latest 2024–2025 Flagships</span>
              </div>
              <h1 className="font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight leading-tight">
                Brand New Flagships. <br />
                <span className="text-secondary">Uncompromising Performance.</span>
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed max-w-md">
                Direct from verified sellers. Factory sealed retail packaging, full carrier unlocked flexibility, and authentic manufacturer warranty.
              </p>

              {/* Price Badges Preview */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-surface-container-low p-2.5 rounded-xl border border-surface-container">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant block">iPhone 16 Pro</span>
                  <span className="font-extrabold text-base text-on-surface block mt-0.5">$999</span>
                  <span className="text-[10px] text-secondary font-semibold">Direct P2P</span>
                </div>
                <div className="bg-surface-container-low p-2.5 rounded-xl border border-surface-container">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant block">S24 Ultra</span>
                  <span className="font-extrabold text-base text-on-surface block mt-0.5">$1,299</span>
                  <span className="text-[10px] text-secondary font-semibold">Direct P2P</span>
                </div>
                <div className="bg-surface-container-low p-2.5 rounded-xl border border-surface-container">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Pixel 9 Pro</span>
                  <span className="font-extrabold text-base text-on-surface block mt-0.5">$899</span>
                  <span className="text-[10px] text-secondary font-semibold">Direct P2P</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-surface-container">
              <Link
                to="/browse?condition=NEW"
                className="px-5 py-2.5 rounded-xl bg-accent text-on-accent font-bold text-xs shadow-sm hover:opacity-90 transition-all flex items-center gap-2"
              >
                Explore Factory New <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-xs text-on-surface-variant flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" /> Direct Buyer-Seller Deal
              </span>
            </div>
          </div>

          {/* Right Hero Card: Certified Pre-Owned */}
          <div className="lg:col-span-6 relative overflow-hidden rounded-3xl bg-surface-container-low p-8 flex flex-col justify-between border border-surface-container shadow-sm hover:border-outline-variant transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-[11px] font-bold uppercase tracking-wider border border-outline-variant">
                  <Sparkles className="w-3.5 h-3.5 text-secondary" /> Certified Pre-Owned
                </span>
                <span className="text-xs font-bold text-secondary flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Lab Diagnostic Pass
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
                <div className="flex items-center gap-2 bg-surface p-2.5 rounded-xl border border-surface-container">
                  <BatteryCharging className="w-4 h-4 text-secondary shrink-0" />
                  <span>Battery Health ≥ 85%</span>
                </div>
                <div className="flex items-center gap-2 bg-surface p-2.5 rounded-xl border border-surface-container">
                  <Lock className="w-4 h-4 text-secondary shrink-0" />
                  <span>Clean IMEI & Carrier Unlocked</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-surface-container">
              <Link
                to="/browse?condition=LIKE_NEW"
                className="px-5 py-2.5 rounded-xl bg-secondary text-on-secondary font-bold text-xs shadow-sm hover:opacity-90 transition-all flex items-center gap-2"
              >
                Shop Certified Pre-Owned <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/grading-standards" className="text-xs text-secondary font-bold hover:underline">
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
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Live Inventory</span>
            <h2 className="text-2xl font-black text-on-surface tracking-tight">Featured Phone Listings</h2>
            <p className="text-xs text-on-surface-variant mt-1">
              Top selected smartphones verified by community sellers and ready for fast local meetup or direct purchase.
            </p>
          </div>
          <Link
            to="/browse"
            className="text-xs font-bold text-secondary hover:underline flex items-center gap-1"
          >
            Explore all listings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-surface-container-low rounded-2xl h-80 animate-pulse border border-surface-container" />
            ))}
          </div>
        ) : featuredListings.length === 0 ? (
          <div className="bg-surface border border-surface-container rounded-2xl p-12 text-center">
            <Inbox className="w-10 h-10 text-outline mx-auto mb-2" />
            <p className="font-bold text-sm text-on-surface">No active listings available right now.</p>
            <Link to="/create-listing" className="inline-block mt-3 px-4 py-2 bg-accent text-white text-xs font-bold rounded-xl">
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

      {/* 3-Step Rapid Trading CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface border border-surface-container rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Simple & Safe</span>
            <h2 className="text-2xl sm:text-3xl font-black text-on-surface">
              Trade In or Sell Your Phone in 3 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Post your phone listing with honest photos, negotiate directly with genuine buyers, and get paid with zero commissions taken by MobileMart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2 p-4">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-surface-container text-on-surface flex items-center justify-center mx-auto text-base font-bold">
                1
              </div>
              <h3 className="font-bold text-sm text-on-surface">Select Model & Specs</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Choose manufacturer, storage, color, and upload real photos showing honest condition.
              </p>
            </div>

            <div className="text-center space-y-2 p-4">
              <div className="w-10 h-10 rounded-xl bg-secondary-container border border-secondary/20 text-on-secondary-container flex items-center justify-center mx-auto text-base font-bold">
                2
              </div>
              <h3 className="font-bold text-sm text-on-surface">Connect & Chat</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Receive inquiries, answer buyer questions, and agree on price through built-in messaging.
              </p>
            </div>

            <div className="text-center space-y-2 p-4">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-surface-container text-on-surface flex items-center justify-center mx-auto text-base font-bold">
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-on-accent font-bold text-xs shadow hover:opacity-90 transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Start Listing Your Device Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
