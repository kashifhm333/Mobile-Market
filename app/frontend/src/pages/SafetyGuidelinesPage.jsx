import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  CheckSquare,
  MapPin,
  Shield,
  Building,
  Store,
  Coffee,
  ArrowRight
} from 'lucide-react';

const SafetyGuidelinesPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">Trust, Transparency & Security</span>
        <h1 className="text-3xl sm:text-4xl font-black text-on-surface tracking-tight">
          Peer-to-Peer Safety Guidelines
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          MobileMart provides listing discoverability, specifications validation, and direct negotiation messaging. Because all payments occur outside MobileMart, follow these mandatory guidelines for every transaction.
        </p>
      </div>

      {/* Golden Rule Card */}
      <div className="bg-surface-container-low border border-surface-container rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
        <div className="flex items-center gap-3 text-on-surface">
          <AlertTriangle className="w-6 h-6 text-warning shrink-0" />
          <h2 className="font-black text-lg">The Golden Rule: Never Transfer Money in Advance</h2>
        </div>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          <strong className="text-on-surface">MobileMart NEVER collects payments, guarantees wire transfers, holds escrow, or sends payment verification emails.</strong>{' '}
          Anyone claiming that MobileMart is holding their funds or requiring you to pay online before an in-person inspection is attempting fraud. Report such accounts immediately.
        </p>
      </div>

      {/* Inspection Checklist */}
      <div className="bg-surface border border-surface-container rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <h2 className="font-extrabold text-xl text-on-surface flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-secondary" />
          In-Person Device Inspection Checklist
        </h2>

        <div className="space-y-4 text-xs text-on-surface-variant leading-relaxed">
          <div className="p-4 bg-surface-container-low rounded-2xl border border-surface-container">
            <h4 className="font-bold text-sm text-on-surface mb-1">1. IMEI & Blacklist Verification</h4>
            <p>
              Turn on the phone, open the dialer, and input <code className="bg-surface px-1.5 py-0.5 rounded border border-surface-container font-mono text-on-surface">*#06#</code> to display the 15-digit IMEI. Cross-reference this number with the listing details and run a free carrier blacklist check to verify clean status.
            </p>
          </div>

          <div className="p-4 bg-surface-container-low rounded-2xl border border-surface-container">
            <h4 className="font-bold text-sm text-on-surface mb-1">2. Cloud Activation Lock Check (iCloud / Google FRP)</h4>
            <p>
              Ensure the seller has completely signed out of Apple ID / Google Account and completed a factory reset. You should be able to navigate to the initial setup screen without a password prompt.
            </p>
          </div>

          <div className="p-4 bg-surface-container-low rounded-2xl border border-surface-container">
            <h4 className="font-bold text-sm text-on-surface mb-1">3. Live SIM Card & Cellular Test</h4>
            <p>
              Insert your own active SIM card or test WiFi and make a 30-second phone call to verify the cellular antenna, earpiece, and microphone.
            </p>
          </div>

          <div className="p-4 bg-surface-container-low rounded-2xl border border-surface-container">
            <h4 className="font-bold text-sm text-on-surface mb-1">4. Battery & Biometrics Verification</h4>
            <p>
              Check the battery health indicator in Settings. Test Face ID, Touch ID / Fingerprint sensor, front and rear camera autofocus, and charging port connection.
            </p>
          </div>
        </div>
      </div>

      {/* Safe Meetup Locations */}
      <div className="bg-surface border border-surface-container rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="font-extrabold text-xl text-on-surface flex items-center gap-2">
          <MapPin className="w-5 h-5 text-secondary" />
          Recommended Public Meetup Locations
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-on-surface font-semibold">
          <li className="p-3 bg-surface-container-low rounded-xl border border-surface-container flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-secondary shrink-0" />
            <span>Police Station Safe Exchange Zones</span>
          </li>
          <li className="p-3 bg-surface-container-low rounded-xl border border-surface-container flex items-center gap-2.5">
            <Building className="w-4 h-4 text-secondary shrink-0" />
            <span>Local Bank Lobbies (cash counting & security cameras)</span>
          </li>
          <li className="p-3 bg-surface-container-low rounded-xl border border-surface-container flex items-center gap-2.5">
            <Store className="w-4 h-4 text-secondary shrink-0" />
            <span>Carrier Retail Stores (e.g. Apple, Verizon, AT&T)</span>
          </li>
          <li className="p-3 bg-surface-container-low rounded-xl border border-surface-container flex items-center gap-2.5">
            <Coffee className="w-4 h-4 text-secondary shrink-0" />
            <span>Busy public coffee shops or shopping mall food courts</span>
          </li>
        </ul>
      </div>

      <div className="text-center pt-2">
        <Link to="/browse" className="text-xs font-bold text-secondary hover:underline inline-flex items-center gap-1">
          Return to Browse Phones <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default SafetyGuidelinesPage;
