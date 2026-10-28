import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
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

  return (
    <div className="group relative bg-surface rounded-2xl border border-surface-container p-4 shadow-sm hover:border-outline-variant hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top bar: Badge and Favorite Button */}
        <div className="flex items-center justify-between mb-3">
          <ConditionBadge condition={listing.condition} />
          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
            className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center transition-colors text-outline hover:text-error"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                favorited ? 'text-error fill-current' : ''
              }`}
            />
          </button>
        </div>

        {/* Product Image */}
        <Link to={`/listings/${listing._id}`} className="block overflow-hidden rounded-xl bg-surface-container-low p-4 mb-4">
          <img
            src={displayImage}
            alt={listing.title}
            className="w-full h-48 object-contain transform group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = fallbackImage;
            }}
          />
        </Link>

        {/* Brand & Specs tag */}
        <div className="flex items-center gap-1.5 mb-1.5 text-xs text-on-surface-variant font-medium">
          <span className="uppercase tracking-wider font-bold text-secondary">{listing.brand}</span>
          <span className="text-outline-variant">•</span>
          <span>{listing.specifications?.storage || listing.variant || 'Standard'}</span>
          <span className="text-outline-variant">•</span>
          <span className="truncate max-w-[100px]">{listing.city}</span>
        </div>

        {/* Title */}
        <Link to={`/listings/${listing._id}`} className="block">
          <h3 className="font-bold text-sm text-on-surface line-clamp-2 hover:text-secondary transition-colors">
            {listing.title}
          </h3>
        </Link>
      </div>

      {/* Pricing & Footer Actions */}
      <div className="mt-4 pt-3 border-t border-surface-container flex items-end justify-between">
        <div>
          <span className="font-extrabold text-xl text-on-surface">
            ${listing.price.toLocaleString()}
          </span>
          <span className="block text-[11px] text-on-surface-variant font-medium">
            {listing.negotiable ? 'Direct Deal • Negotiable' : 'Direct Deal • Firm'}
          </span>
        </div>
        <Link
          to={`/listings/${listing._id}`}
          className="px-3.5 py-1.5 rounded-xl bg-surface-container-low hover:bg-accent hover:text-white text-on-surface text-xs font-bold transition-all flex items-center gap-1.5 border border-surface-container"
        >
          View Phone <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
