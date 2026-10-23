import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-xs text-on-surface-variant leading-relaxed">
      <h1 className="text-2xl font-black text-on-surface">Privacy Policy</h1>
      <p>Last updated: October 2026</p>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-on-surface">1. Information We Collect</h2>
        <p>
          We collect your name, email address, password hash, and optional phone/city details to operate your MobileMart marketplace account. We do not collect credit cards, banking credentials, or financial identifiers.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-on-surface">2. How Data is Used</h2>
        <p>
          Your data enables listing creation, favorites synchronization, in-app buyer/seller inquiry messaging, and trust & safety moderation. We do not sell user data to advertising third parties.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-bold text-on-surface">3. Cookies & Security</h2>
        <p>
          We use secure, HTTP-only cookies to store authentication session tokens, mitigating client-side cross-site scripting (XSS) risks.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPage;
