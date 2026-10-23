import React from 'react';
import { Link } from 'react-router-dom';
import ConditionBadge from './ConditionBadge.jsx';
import { useFavorites } from '../../context/FavoritesContext.jsx';

const ListingCard = ({ listing }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(listing._id);

  const fallbackImage =
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80';
  const displayImage = listing.images && listing.images.length > 0 ? listing.images[0] : fallbackImage;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(listing._id);
  };

  const monthlyPrice = (listing.price / 24).toFixed(2);

  return (
    <div className="group relative bg-surface-container-lowest rounded-2xl border border-surface-container-low p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top bar: Badge and Favorite Button */}
        <div className="flex items-center justify-between mb-3">
          <ConditionBadge condition={listing.condition} />
          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label="Save to favorites"
            className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center transition-colors text-outline hover:text-error"
          >
            <span
              className={`material-symbols-outlined text-[18px] transition-colors ${
                favorited ? 'text-error fill-current' : ''
              }`}
            >
              favorite
            </span>
          </button>
        </div>

        {/* Product Image */}
        <Link to={`/listings/${listing._id}`} className="block overflow-hidden rounded-xl bg-surface-container-low p-4 mb-4">
          <img
            src={displayImage}
            alt={listing.title}
            className="w-full h-48 object-contain transform group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = fallbackImage;
            }}
          />
        </Link>

        {/* Brand & Specs tag */}
        <div className="flex items-center gap-2 mb-1.5 text-xs text-on-surface-variant font-medium">
          <span className="uppercase tracking-wider font-bold text-primary">{listing.brand}</span>
          <span>•</span>
          <span>{listing.specifications?.storage || listing.variant || 'Standard'}</span>
          <span>•</span>
          <span>{listing.city}</span>
        </div>

        {/* Title */}
        <Link to={`/listings/${listing._id}`} className="block">
          <h3 className="font-bold text-sm text-on-surface line-clamp-2 hover:text-primary transition-colors">
            {listing.title}
          </h3>
        </Link>
      </div>

      {/* Pricing & Footer Actions */}
      <div className="mt-4 pt-3 border-t border-surface-container-low flex items-end justify-between">
        <div>
          <span className="font-extrabold text-xl text-on-surface">
            ${listing.price.toLocaleString()}
          </span>
          <span className="block text-[11px] text-secondary font-semibold">
            or ${monthlyPrice}/mo
          </span>
        </div>
        <Link
          to={`/listings/${listing._id}`}
          className="px-3.5 py-1.5 rounded-xl bg-surface-container-low hover:bg-primary hover:text-on-primary text-primary text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
        >
          View Phone <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
