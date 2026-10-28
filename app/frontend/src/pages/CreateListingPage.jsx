import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera,
  ArrowRight,
  ArrowLeft,
  X,
  Rocket
} from 'lucide-react';
import api from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';
import SafetyBanner from '../components/common/SafetyBanner.jsx';

const BRANDS = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Motorola', 'Sony', 'Other'];
const STORAGES = ['64GB', '128GB', '256GB', '512GB', '1TB'];
const CONDITIONS = [
  {
    id: 'NEW',
    title: 'Factory Sealed New',
    desc: 'Unopened retail packaging, manufacturer seal intact, 0 battery cycles.'
  },
  {
    id: 'LIKE_NEW',
    title: 'Pristine (Like New)',
    desc: 'Flawless display & body, no visible scratches, battery health ≥ 90%.'
  },
  {
    id: 'GOOD',
    title: 'Good (Minor Wear)',
    desc: 'Light micro-abrasions, screen fully responsive, 100% functional diagnostic.'
  },
  {
    id: 'FAIR',
    title: 'Fair (Value Tier)',
    desc: 'Noticeable cosmetic scuffs or scratches, heavily discounted price.'
  }
];

const CreateListingPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    brand: 'Apple',
    model: '',
    storage: '256GB',
    ram: '8GB',
    color: '',
    carrier: 'Unlocked',
    condition: 'LIKE_NEW',
    batteryHealth: 95,
    screenCondition: 'Flawless',
    title: '',
    price: '',
    negotiable: false,
    city: '',
    description: ''
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (['brand', 'model', 'storage', 'carrier'].includes(field)) {
        const b = field === 'brand' ? value : prev.brand;
        const m = field === 'model' ? value : prev.model;
        const s = field === 'storage' ? value : prev.storage;
        const c = field === 'carrier' ? value : prev.carrier;
        if (m) {
          updated.title = `${b} ${m} - ${s} (${c})`;
        }
      }
      return updated;
    });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 8) {
      showToast('Maximum 8 photos allowed', 'error');
      return;
    }

    setSelectedFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const removePhoto = (idx) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.model.trim()) {
      showToast('Please specify the phone model', 'error');
      setStep(1);
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      showToast('Please specify a valid price', 'error');
      setStep(3);
      return;
    }
    if (!formData.city.trim()) {
      showToast('Please specify your city location', 'error');
      setStep(3);
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        title: formData.title || `${formData.brand} ${formData.model}`,
        brand: formData.brand,
        model: formData.model,
        variant: `${formData.storage} / ${formData.ram}`,
        condition: formData.condition,
        price: Number(formData.price),
        negotiable: formData.negotiable,
        city: formData.city,
        description: formData.description || `Selling genuine ${formData.brand} ${formData.model}. Clean condition, tested and ready for meetup.`,
        specifications: {
          storage: formData.storage,
          ram: formData.ram,
          batteryHealth: Number(formData.batteryHealth),
          color: formData.color,
          carrier: formData.carrier,
          screenCondition: formData.screenCondition
        }
      };

      const res = await api.post('/listings', payload);
      const newListing = res.data.data.listing;

      if (selectedFiles.length > 0) {
        const uploadData = new FormData();
        selectedFiles.forEach((f) => uploadData.append('images', f));
        await api.post(`/listings/${newListing._id}/images`, uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      showToast('Listing published successfully!', 'success');
      navigate('/my-listings');
    } catch (err) {
      showToast(err.message || 'Failed to create listing', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Step Indicator Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">Sell Your Device</span>
        <h1 className="text-2xl sm:text-3xl font-black text-on-surface">Create a Phone Listing</h1>
        <p className="text-xs text-on-surface-variant max-w-md mx-auto">
          Accurate specifications and genuine device photos attract the fastest direct peer-to-peer offers.
        </p>
      </div>

      {/* Step Tabs Bar */}
      <div className="flex items-center justify-between border-b border-surface-container pb-4 text-xs font-bold">
        <button
          type="button"
          onClick={() => setStep(1)}
          className={`flex items-center gap-1.5 pb-2 transition-colors ${
            step === 1 ? 'text-secondary border-b-2 border-secondary font-black' : 'text-outline hover:text-on-surface'
          }`}
        >
          <span>1. Brand & Model</span>
        </button>
        <button
          type="button"
          onClick={() => setStep(2)}
          className={`flex items-center gap-1.5 pb-2 transition-colors ${
            step === 2 ? 'text-secondary border-b-2 border-secondary font-black' : 'text-outline hover:text-on-surface'
          }`}
        >
          <span>2. Condition & Diagnostics</span>
        </button>
        <button
          type="button"
          onClick={() => setStep(3)}
          className={`flex items-center gap-1.5 pb-2 transition-colors ${
            step === 3 ? 'text-secondary border-b-2 border-secondary font-black' : 'text-outline hover:text-on-surface'
          }`}
        >
          <span>3. Pricing & Photos</span>
        </button>
      </div>

      <SafetyBanner compact />

      <form onSubmit={handleSubmit} className="bg-surface p-6 sm:p-8 rounded-3xl border border-surface-container shadow-sm space-y-8">
        {/* STEP 1: Brand & Model Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-3">
                Select Manufacturer Brand
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {BRANDS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => handleInputChange('brand', b)}
                    className={`py-3 px-4 rounded-xl border text-xs font-bold text-center transition-all ${
                      formData.brand === b
                        ? 'border-accent bg-accent text-on-accent shadow-sm'
                        : 'border-surface-container bg-surface-container-low text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold block mb-1">Specific Model *</label>
                <input
                  type="text"
                  placeholder="e.g. iPhone 16 Pro, Galaxy S24 Ultra, Pixel 9"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-secondary"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold block mb-1">Color Finish</label>
                <input
                  type="text"
                  placeholder="e.g. Desert Titanium, Obsidian Black, Phantom Silver"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-secondary"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-2">
                Internal Storage Capacity
              </label>
              <div className="grid grid-cols-5 gap-2">
                {STORAGES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleInputChange('storage', s)}
                    className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition-all ${
                      formData.storage === s
                        ? 'border-accent bg-accent text-on-accent'
                        : 'border-surface-container bg-surface-container-low text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold block mb-1">Network / Carrier Lock</label>
                <select
                  value={formData.carrier}
                  onChange={(e) => handleInputChange('carrier', e.target.value)}
                  className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs text-on-surface"
                >
                  <option value="Unlocked">Factory Unlocked (Worldwide GSM/CDMA)</option>
                  <option value="Verizon">Verizon</option>
                  <option value="AT&T">AT&T</option>
                  <option value="T-Mobile">T-Mobile</option>
                  <option value="Other">Other Carrier</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold block mb-1">RAM Capacity</label>
                <select
                  value={formData.ram}
                  onChange={(e) => handleInputChange('ram', e.target.value)}
                  className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs text-on-surface"
                >
                  <option value="6GB">6GB RAM</option>
                  <option value="8GB">8GB RAM</option>
                  <option value="12GB">12GB RAM</option>
                  <option value="16GB">16GB RAM</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-accent text-on-accent font-bold text-xs shadow hover:opacity-90 flex items-center gap-1.5"
              >
                Next: Condition Diagnostics <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Condition & Diagnostics */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-3">
                Select Cosmetic & Functional Condition Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CONDITIONS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleInputChange('condition', c.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      formData.condition === c.id
                        ? 'border-secondary bg-surface-container-high ring-1 ring-secondary'
                        : 'border-surface-container bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <span className="font-extrabold text-sm text-on-surface block">{c.title}</span>
                    <span className="text-xs text-on-surface-variant block mt-1 leading-relaxed">{c.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold block mb-1">Battery Maximum Capacity (% Health)</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={formData.batteryHealth}
                  onChange={(e) => handleInputChange('batteryHealth', e.target.value)}
                  className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-secondary"
                />
                <span className="text-[10px] text-on-surface-variant mt-1 block">Check in device Settings &gt; Battery Health</span>
              </div>
              <div>
                <label className="text-xs font-bold block mb-1">Screen Condition</label>
                <select
                  value={formData.screenCondition}
                  onChange={(e) => handleInputChange('screenCondition', e.target.value)}
                  className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs text-on-surface"
                >
                  <option value="Flawless">Flawless (Zero scratches)</option>
                  <option value="Minor Scratches">Minor hairline scratches (invisible with screen on)</option>
                  <option value="Noticeable Wear">Noticeable scratches</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-surface-container font-bold text-xs hover:bg-surface-container flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-accent text-white font-bold text-xs shadow hover:opacity-90 flex items-center gap-1.5"
              >
                Next: Pricing & Photos <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Pricing, Photos & Final Publish */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold block mb-1">Selling Price ($ USD) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-bold text-outline">$</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="999"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="w-full bg-surface-container-low border border-surface-container rounded-xl pl-7 pr-3 py-2 text-sm font-bold text-on-surface focus:outline-none focus:border-secondary"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold block mb-1">City / Meetup Location *</label>
                <input
                  type="text"
                  placeholder="e.g. Austin, TX (Downtown / Public Area)"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-secondary"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="negotiable-check"
                checked={formData.negotiable}
                onChange={(e) => handleInputChange('negotiable', e.target.checked)}
                className="rounded text-secondary focus:ring-secondary"
              />
              <label htmlFor="negotiable-check" className="text-xs font-semibold cursor-pointer">
                I am open to reasonable buyer price negotiation
              </label>
            </div>

            <div>
              <label className="text-xs font-bold block mb-1">Listing Headline Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs font-bold text-on-surface focus:outline-none focus:border-secondary"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold block mb-1">Detailed Description</label>
              <textarea
                rows="4"
                placeholder="Include details about cosmetic state, reason for selling, accessories included, and safe public meetup availability..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            {/* Photo Upload Box */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-2">
                Device Photos (Up to 8 high-res photos)
              </label>
              <div className="border-2 border-dashed border-surface-container-high rounded-2xl p-6 text-center hover:bg-surface-container-low/50 transition-colors">
                <input
                  type="file"
                  id="photo-upload-input"
                  multiple
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label htmlFor="photo-upload-input" className="cursor-pointer space-y-2 block">
                  <Camera className="w-8 h-8 text-secondary mx-auto" />
                  <p className="text-xs font-bold text-on-surface">Click to select photos or drag & drop</p>
                  <p className="text-[11px] text-on-surface-variant">Supported formats: JPEG, PNG, WebP (Max 8MB each)</p>
                </label>
              </div>

              {/* Previews */}
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4">
                  {previewUrls.map((url, i) => (
                    <div key={url} className="relative rounded-xl overflow-hidden border border-surface-container group">
                      <img src={url} alt={`Upload preview ${i}`} className="w-full h-20 object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute top-1 right-1 w-5 h-5 bg-error text-white rounded-full text-xs flex items-center justify-center opacity-80 group-hover:opacity-100"
                        aria-label="Remove photo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t border-surface-container">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl border border-surface-container font-bold text-xs hover:bg-surface-container flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 rounded-xl bg-accent text-on-accent font-bold text-xs shadow-md hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
              >
                <Rocket className="w-3.5 h-3.5" />
                {submitting ? 'Publishing Device Ad...' : 'Publish Listing Now'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateListingPage;
