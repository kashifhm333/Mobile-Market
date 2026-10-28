import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

const BRANDS = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Motorola', 'Other'];
const CONDITIONS = [
  { value: 'NEW', label: 'Factory Sealed New' },
  { value: 'LIKE_NEW', label: 'Pristine (Like New)' },
  { value: 'GOOD', label: 'Good (Minor Wear)' },
  { value: 'FAIR', label: 'Fair (Value Tier)' }
];
const STORAGES = ['64GB', '128GB', '256GB', '512GB', '1TB'];

const ListingFilters = ({ filters, onFilterChange, onReset }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value, page: 1 });
  };

  return (
    <div className="bg-surface p-5 rounded-2xl border border-surface-container shadow-sm space-y-6 text-xs text-on-surface">
      <div className="flex items-center justify-between pb-3 border-b border-surface-container">
        <h3 className="font-bold text-sm text-on-surface flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-secondary" /> Filters
        </h3>
        <button
          type="button"
          onClick={onReset}
          className="text-secondary font-semibold hover:underline text-xs"
        >
          Reset All
        </button>
      </div>

      {/* Brand Selection */}
      <div>
        <label className="font-bold text-xs uppercase tracking-wider text-on-surface-variant block mb-2">
          Manufacturer Brand
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => handleChange('brand', '')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors border ${
              !filters.brand
                ? 'bg-accent text-white font-bold border-accent'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container border-surface-container'
            }`}
          >
            All
          </button>
          {BRANDS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => handleChange('brand', b === filters.brand ? '' : b)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors border ${
                filters.brand === b
                  ? 'bg-accent text-white font-bold border-accent'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container border-surface-container'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Condition Grade */}
      <div>
        <label className="font-bold text-xs uppercase tracking-wider text-on-surface-variant block mb-2">
          Condition Tier
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="condition"
              checked={!filters.condition}
              onChange={() => handleChange('condition', '')}
              className="text-secondary focus:ring-secondary"
            />
            <span>All Conditions</span>
          </label>
          {CONDITIONS.map((c) => (
            <label key={c.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="condition"
                checked={filters.condition === c.value}
                onChange={() => handleChange('condition', c.value)}
                className="text-secondary focus:ring-secondary"
              />
              <span>{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Storage Capacity */}
      <div>
        <label className="font-bold text-xs uppercase tracking-wider text-on-surface-variant block mb-2">
          Internal Storage
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {STORAGES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleChange('storage', filters.storage === s ? '' : s)}
              className={`py-1.5 px-2 text-center rounded-lg font-medium transition-colors border ${
                filters.storage === s
                  ? 'bg-accent text-white font-bold border-accent'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container border-surface-container'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="font-bold text-xs uppercase tracking-wider text-on-surface-variant block mb-2">
          Price Range ($ USD)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            className="w-full bg-surface-container-low border border-surface-container rounded-lg px-2.5 py-1.5 text-xs text-on-surface focus:outline-none focus:border-secondary"
          />
          <span className="text-outline">-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            className="w-full bg-surface-container-low border border-surface-container rounded-lg px-2.5 py-1.5 text-xs text-on-surface focus:outline-none focus:border-secondary"
          />
        </div>
      </div>

      {/* City Location */}
      <div>
        <label className="font-bold text-xs uppercase tracking-wider text-on-surface-variant block mb-2">
          City Location
        </label>
        <input
          type="text"
          placeholder="e.g. Austin, New York, Seattle"
          value={filters.city || ''}
          onChange={(e) => handleChange('city', e.target.value)}
          className="w-full bg-surface-container-low border border-surface-container rounded-lg px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:border-secondary"
        />
      </div>
    </div>
  );
};

export default ListingFilters;
