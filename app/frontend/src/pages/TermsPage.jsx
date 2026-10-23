import React from 'react';

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-xs text-on-surface-variant leading-relaxed">
      <h1 className="text-2xl font-black text-on-surface">Terms of Service</h1>
      <p>Last updated: October 2026</p>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-on-surface">1. Peer-to-Peer Marketplace Nature</h2>
        <p>
          MobileMart is an online platform that connects independent buyers and sellers of mobile phones. MobileMart is not an auctioneer, vendor, or payment processor. We do not inspect physical items on behalf of users, hold funds in escrow, or guarantee transactions.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-on-surface">2. Direct External Payments</h2>
        <p>
          All payments and settlements occur directly between buyers and sellers outside MobileMart. You agree that MobileMart has no liability for lost funds, unfulfilled deals, or payment disputes.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-on-surface">3. Prohibited Listings & Fraud</h2>
        <p>
          Users are strictly prohibited from listing stolen hardware, blacklisted IMEI numbers, counterfeit devices, or misrepresenting hardware health. Accounts violating these rules will be permanently terminated and reported to law enforcement.
        </p>
      </section>
    </div>
  );
};

export default TermsPage;
