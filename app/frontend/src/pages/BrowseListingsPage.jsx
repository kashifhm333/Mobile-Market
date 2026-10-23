import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api.js';
import ListingCard from '../components/common/ListingCard.jsx';
import ListingFilters from '../components/common/ListingFilters.jsx';
import SafetyBanner from '../components/common/SafetyBanner.jsx';

const BrowseListingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    brand: searchParams.get('brand') || '',
    condition: searchParams.get('condition') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    storage: searchParams.get('storage') || '',
    city: searchParams.get('city') || '',
    sort: searchParams.get('sort') || 'newest',
    page: parseInt(searchParams.get('page'), 10) || 1
  });

  const [listings, setListings] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 12, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  // Sync state to URL params
  const updateUrlParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) params.set(key, val);
    });
    setSearchParams(params);
  };

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, val]) => {
        if (val) params.append(key, val);
      });
      params.set('limit', '12');

      const res = await api.get(`/listings?${params.toString()}`);
      setListings(res.data.data);
      setMeta(res.data.meta || { total: res.data.data.length, page: 1, limit: 12, totalPages: 1 });
    } catch (err) {
      console.error('Failed to load listings', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    updateUrlParams(newFilters);
  };

  const handleReset = () => {
    const cleared = {
      search: '',
      brand: '',
      condition: '',
      minPrice: '',
      maxPrice: '',
      storage: '',
      city: '',
      sort: 'newest',
      page: 1
    };
    setFilters(cleared);
    updateUrlParams(cleared);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Sorting Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surface-container">
        <div>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">
            Browse Mobile Phones
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Showing <strong className="text-on-surface">{meta.total}</strong> verified listings available
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort-select" className="text-xs font-bold text-outline">Sort By:</label>
          <select
            id="sort-select"
            value={filters.sort}
            onChange={(e) => handleFilterChange({ ...filters, sort: e.target.value })}
            className="bg-surface-container-low border border-surface-container rounded-xl px-3 py-1.5 text-xs text-on-surface font-semibold focus:outline-none focus:border-primary"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      <SafetyBanner compact />

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Column: Filter Sidebar */}
        <div className="lg:col-span-1">
          <ListingFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
        </div>

        {/* Right Column: Listing Cards */}
        <div className="lg:col-span-3 space-y-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-surface-container-low rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="bg-surface-container-lowest border border-surface-container rounded-2xl p-16 text-center space-y-3">
              <span className="material-symbols-outlined text-5xl text-outline">search_off</span>
              <h3 className="font-bold text-base text-on-surface">No phones matched your filters</h3>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                Try loosening your price range or clearing selected brand/condition filters.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-2 px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                type="button"
                disabled={filters.page <= 1}
                onClick={() => handleFilterChange({ ...filters, page: filters.page - 1 })}
                className="px-3.5 py-1.5 rounded-xl border border-surface-container text-xs font-bold disabled:opacity-40 hover:bg-surface-container transition-colors"
              >
                Previous
              </button>
              <span className="text-xs font-semibold px-2">
                Page {filters.page} of {meta.totalPages}
              </span>
              <button
                type="button"
                disabled={filters.page >= meta.totalPages}
                onClick={() => handleFilterChange({ ...filters, page: filters.page + 1 })}
                className="px-3.5 py-1.5 rounded-xl border border-surface-container text-xs font-bold disabled:opacity-40 hover:bg-surface-container transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseListingsPage;
