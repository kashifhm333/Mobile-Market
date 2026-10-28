import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartOff } from 'lucide-react';
import api from '../services/api.js';
import ListingCard from '../components/common/ListingCard.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';

const FavoritesPage = () => {
  const { favoriteIds } = useFavorites();
  const [favoriteListings, setFavoriteListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteListings = async () => {
      try {
        setLoading(true);
        const res = await api.get('/favorites');
        setFavoriteListings(res.data.data);
      } catch (err) {
        console.error('Failed to load favorites', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteListings();
  }, [favoriteIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="pb-4 border-b border-surface-container">
        <h1 className="text-2xl font-black text-on-surface tracking-tight">Saved Favorites</h1>
        <p className="text-xs text-on-surface-variant mt-0.5">
          Keep track of phone listings you are considering or negotiating for.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-surface-container-low rounded-2xl animate-pulse border border-surface-container" />
          ))}
        </div>
      ) : favoriteListings.length === 0 ? (
        <div className="bg-surface border border-surface-container rounded-3xl p-16 text-center space-y-3">
          <HeartOff className="w-12 h-12 text-outline mx-auto" />
          <h3 className="font-bold text-base text-on-surface">No saved favorites yet</h3>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
            Click the heart icon on any phone card to bookmark it for fast reference.
          </p>
          <Link
            to="/browse"
            className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-accent text-white font-bold text-xs shadow-sm hover:opacity-90 transition-all"
          >
            Explore Phones Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteListings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
