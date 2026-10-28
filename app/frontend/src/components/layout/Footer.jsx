import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, ShieldCheck, AlertTriangle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface-container-low border-t border-surface-container mt-16 text-xs text-on-surface-variant">
      {/* Top Banner Warning */}
      <div className="bg-surface-container-high py-3 px-4 border-b border-surface-container text-center">
        <p className="max-w-4xl mx-auto text-xs text-on-surface flex items-center justify-center gap-1.5 flex-wrap">
          <AlertTriangle className="w-4 h-4 text-warning shrink-0" />
          <span className="font-bold text-on-surface">Marketplace Safety Policy:</span>
          <span>
            MobileMart never collects payments, requests wire transfers, or provides escrow services. All transactions must be inspected and concluded directly between buyer and seller in safe public locations.
          </span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-accent text-on-accent flex items-center justify-center font-black">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-on-surface">
              Mobile<span className="text-secondary">Mart</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-on-surface-variant">
            The premier marketplace for factory-sealed smartphones and certified pre-owned devices. Connecting genuine buyers and sellers with verified inspection grading and transparent direct deal coordination.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-secondary">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Peer-to-Peer Verified
            </span>
          </div>
        </div>

        {/* Col 2: Marketplace Navigation */}
        <div>
          <h4 className="font-bold text-xs text-on-surface mb-3 uppercase tracking-wider">
            Marketplace
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/browse" className="hover:text-secondary transition-colors">
                Browse All Phones
              </Link>
            </li>
            <li>
              <Link to="/browse?condition=NEW" className="hover:text-secondary transition-colors">
                Brand New Flagships
              </Link>
            </li>
            <li>
              <Link to="/browse?condition=LIKE_NEW" className="hover:text-secondary transition-colors">
                Certified Pre-Owned
              </Link>
            </li>
            <li>
              <Link to="/create-listing" className="hover:text-secondary transition-colors">
                Sell Your Phone
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Standards & Trust */}
        <div>
          <h4 className="font-bold text-xs text-on-surface mb-3 uppercase tracking-wider">
            Standards & Safety
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/grading-standards" className="hover:text-secondary transition-colors">
                90-Point Hardware Lab Standards
              </Link>
            </li>
            <li>
              <Link to="/safety-guidelines" className="hover:text-secondary transition-colors text-secondary font-semibold">
                Safe Meetup & P2P Guidelines
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-secondary transition-colors">
                Terms of Marketplace Use
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Support & Security Notice */}
        <div className="space-y-2">
          <h4 className="font-bold text-xs text-on-surface mb-3 uppercase tracking-wider">
            Trust & Security
          </h4>
          <p className="text-xs leading-relaxed">
            Report any suspicious listings or misleading device specifications directly through the report button on any listing page.
          </p>
          <div className="pt-2">
            <span className="inline-block px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-[11px] font-bold border border-surface-container-high">
              Direct Settlement • Zero Platform Fees
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-surface-container py-6 px-4 text-center text-xs text-on-surface-variant">
        <p>© 2026 MobileMart Inc. All rights reserved. Peer-to-peer smartphone marketplace.</p>
      </div>
    </footer>
  );
};

export default Footer;
