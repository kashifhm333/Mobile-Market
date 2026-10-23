import React from 'react';

const SafetyBanner = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 flex items-center gap-2 text-xs">
        <span className="material-symbols-outlined text-amber-600 text-lg">shield</span>
        <span>
          <strong>Direct P2P Settlement:</strong> MobileMart does not collect payments. Inspect the phone and settle in person in a safe public place.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 my-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
          <span className="material-symbols-outlined text-2xl">verified_user</span>
        </div>
        <div>
          <h4 className="font-bold text-sm text-on-surface">Safe Peer-to-Peer Marketplace Notice</h4>
          <p className="text-xs text-on-surface-variant mt-0.5 max-w-2xl leading-relaxed">
            MobileMart is an inquiry and listing coordination platform. We do not hold funds, process credit cards, or provide escrow. Always inspect hardware, test IMEI numbers, and finalize payment directly with the seller in a secure public location.
          </p>
        </div>
      </div>
      <a
        href="/safety-guidelines"
        className="text-xs font-bold text-primary hover:underline whitespace-nowrap flex items-center gap-1 self-end sm:self-center"
      >
        Read Safety Guidelines <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </a>
    </div>
  );
};

export default SafetyBanner;
