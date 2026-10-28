import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

const GradingStandardsPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">Quality Assurance</span>
        <h1 className="text-3xl sm:text-4xl font-black text-on-surface tracking-tight">
          MobileMart Hardware Grading Standards
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Every pre-owned smartphone listed on MobileMart is classified under our transparent cosmetic and hardware grading protocol to guarantee 100% buyer confidence.
        </p>
      </div>

      {/* 4 Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tier 1: Pristine (Like New) */}
        <div className="bg-surface border border-surface-container rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-outline-variant transition-all">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary-container text-on-secondary-container border border-secondary/20">
              Grade A+
            </span>
            <span className="text-xs font-bold text-secondary">Flagship Equivalent</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">Pristine (Like New)</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Cosmetically indistinguishable from brand new retail hardware. The screen, housing, and camera lens are 100% free of scratches, dings, or scuffs.
          </p>
          <ul className="text-xs space-y-2 text-on-surface pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Battery capacity: <strong>≥ 95% maximum health</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>OLED / LCD: Zero dead pixels, burn-in, or touch latency</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Cameras: Precision autofocus, spotless sensor glass</span>
            </li>
          </ul>
        </div>

        {/* Tier 2: Excellent */}
        <div className="bg-surface border border-surface-container rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-outline-variant transition-all">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-surface-container-high text-on-surface border border-outline-variant">
              Grade A
            </span>
            <span className="text-xs font-bold text-secondary">Best Balance Tier</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">Excellent (Minor Wear)</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Extremely gentle previous usage. The body may have very faint micro-abrasions visible only under harsh inspection light. Screen is crystal clear when illuminated.
          </p>
          <ul className="text-xs space-y-2 text-on-surface pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Battery capacity: <strong>≥ 88% maximum health</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>100% fully functioning biometrics (FaceID / Fingerprint)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Speakers, microphones, and charging port thoroughly cleared</span>
            </li>
          </ul>
        </div>

        {/* Tier 3: Good */}
        <div className="bg-surface border border-surface-container rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-outline-variant transition-all">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-surface-container text-on-surface border border-surface-container-high">
              Grade B
            </span>
            <span className="text-xs font-bold text-on-surface-variant">Smart Budget Tier</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">Good (Light Scratches)</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Light cosmetic scratches on back glass or aluminum bezel from everyday normal pocket carry. Completely resolved once placed inside a case. 100% operational hardware.
          </p>
          <ul className="text-xs space-y-2 text-on-surface pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Battery capacity: <strong>≥ 82% maximum health</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Zero cracks or deep gouges</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Full carrier unlocked network compatibility</span>
            </li>
          </ul>
        </div>

        {/* Tier 4: Fair */}
        <div className="bg-surface border border-surface-container rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-outline-variant transition-all">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-surface-container-low text-on-surface-variant border border-outline-variant">
              Grade C
            </span>
            <span className="text-xs font-bold text-on-surface-variant">Maximum Discount</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">Fair (Value Tier)</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Heavily discounted flagship hardware with evident cosmetic signs of usage (scuffs, paint wear on corners). Perfect for users prioritizing internal performance over exterior cosmetics.
          </p>
          <ul className="text-xs space-y-2 text-on-surface pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Battery capacity: <strong>≥ 75% maximum health</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Screen fully responsive to multi-touch gestures</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Deepest market price reductions (40-60% off MSRP)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-bold text-xs shadow hover:opacity-90 transition-all"
        >
          <ShieldCheck className="w-4 h-4" /> Browse Certified Phones <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default GradingStandardsPage;
