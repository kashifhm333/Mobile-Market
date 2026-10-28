import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

const SafetyBanner = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-surface-container-low border border-surface-container text-on-surface rounded-xl p-3 flex items-center gap-2.5 text-xs">
        <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
        <span>
          <strong className="font-bold text-on-surface">Direct P2P Settlement:</strong> MobileMart does not collect payments. Inspect the phone and settle in person in a safe public place.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low border border-surface-container rounded-2xl p-5 my-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-surface-container flex items-center justify-center shrink-0 text-secondary">
          <ShieldCheck className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <p className="font-bold text-sm text-on-surface">Safe Peer-to-Peer Marketplace Notice</p>
          <p className="text-xs text-on-surface-variant mt-0.5 max-w-2xl leading-relaxed">
            MobileMart is an inquiry and listing coordination platform. We do not hold funds, process credit cards, or provide escrow. Always inspect hardware, test IMEI numbers, and finalize payment directly with the seller in a secure public location.
          </p>
        </div>
      </div>
      <a
        href="/safety-guidelines"
        className="text-xs font-bold text-secondary hover:underline whitespace-nowrap flex items-center gap-1.5 self-end sm:self-center"
      >
        Read Safety Guidelines <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};

export default SafetyBanner;
