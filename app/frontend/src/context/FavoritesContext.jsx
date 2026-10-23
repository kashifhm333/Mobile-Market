import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api.js';
import { useAuth } from './AuthContext.jsx';
import { useToast } from './ToastContext.jsx';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavoriteIds(new Set());
      return;
    }
    try {
      setLoading(true);
      const res = await api.get('/favorites');
      const ids = new Set(res.data.data.map((item) => item._id));
      setFavoriteIds(ids);
    } catch (err) {
      console.error('Failed to load favorites', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const toggleFavorite = async (listingId) => {
    if (!isAuthenticated) {
      showToast('Please login to save favorites', 'error');
      return false;
    }

    const isFav = favoriteIds.has(listingId);
    try {
      if (isFav) {
        await api.delete(`/favorites/${listingId}`);
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          next.delete(listingId);
          return next;
        });
        showToast('Removed from favorites', 'info');
      } else {
        await api.post(`/favorites/${listingId}`);
        setFavoriteIds((prev) => new Set(prev).add(listingId));
        showToast('Saved to favorites', 'success');
      }
      return !isFav;
    } catch (err) {
      showToast(err.message || 'Failed to update favorite', 'error');
      return isFav;
    }
  };

  const isFavorite = (listingId) => favoriteIds.has(listingId);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite, loading, refreshFavorites: fetchFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
