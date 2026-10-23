import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface-container-low border-t border-surface-container mt-16 text-xs text-on-surface-variant">
      {/* Top Banner Warning */}
      <div className="bg-surface-container-high py-3 px-4 border-b border-surface-container text-center">
        <p className="max-w-4xl mx-auto text-xs text-on-surface">
          <span className="font-bold text-amber-800">⚠️ Marketplace Safety Policy:</span>{' '}
          MobileMart never collects payments, requests wire transfers, or provides escrow services. All transactions must be inspected and concluded directly between buyer and seller in safe public locations.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center font-black">
              <span className="material-symbols-outlined text-xl">smartphone</span>
            </div>
            <span className="font-extrabold text-base tracking-tight text-on-surface">
              Mobile<span className="text-primary">Mart</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-on-surface-variant">
            The premier marketplace for factory-sealed smartphones and certified pre-owned devices. Connecting genuine buyers and sellers with verified inspection grading and transparent direct deal coordination.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary">
              <span className="material-symbols-outlined text-sm">verified</span> 100% Peer-to-Peer Verified
            </span>
          </div>
        </div>

        {/* Col 2: Marketplace Navigation */}
        <div>
          <h4 className="font-bold text-sm text-on-surface mb-3 uppercase tracking-wider text-[11px]">
            Marketplace
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/browse" className="hover:text-primary transition-colors">
                Browse All Phones
              </Link>
            </li>
            <li>
              <Link to="/browse?condition=NEW" className="hover:text-primary transition-colors">
                Brand New Flagships
              </Link>
            </li>
            <li>
              <Link to="/browse?condition=LIKE_NEW" className="hover:text-primary transition-colors">
                Certified Pre-Owned
              </Link>
            </li>
            <li>
              <Link to="/create-listing" className="hover:text-primary transition-colors">
                Sell Your Phone
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Standards & Trust */}
        <div>
          <h4 className="font-bold text-sm text-on-surface mb-3 uppercase tracking-wider text-[11px]">
            Standards & Safety
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/grading-standards" className="hover:text-primary transition-colors">
                90-Point Hardware Lab Standards
              </Link>
            </li>
            <li>
              <Link to="/safety-guidelines" className="hover:text-primary transition-colors text-secondary font-semibold">
                Safe Meetup & P2P Guidelines
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Marketplace Use
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Support & Security Notice */}
        <div className="space-y-2">
          <h4 className="font-bold text-sm text-on-surface mb-3 uppercase tracking-wider text-[11px]">
            Trust & Security
          </h4>
          <p className="text-xs leading-relaxed">
            Report any suspicious listings or misleading device specifications directly through the report button on any listing page.
          </p>
          <div className="pt-2">
            <span className="inline-block px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-[11px] font-bold">
              No Escrow • No Hidden Fees
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-surface-container py-6 px-4 text-center text-xs text-outline">
        <p>© 2026 MobileMart Inc. All rights reserved. Designed to production-grade engineering standards.</p>
      </div>
    </footer>
  );
};

export default Footer;
