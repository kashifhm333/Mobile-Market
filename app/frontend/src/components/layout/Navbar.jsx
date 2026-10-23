import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useFavorites } from '../../context/FavoritesContext.jsx';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { favoriteIds } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/browse');
    }
  };

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container">
      {/* Top Utility Strip */}
      <div className="bg-surface-container-low py-1.5 px-4 text-xs text-on-surface-variant border-b border-surface-container/60 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/browse?condition=NEW" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">inventory_2</span> Factory Sealed New
            </Link>
            <span className="text-outline-variant">•</span>
            <Link to="/browse?condition=LIKE_NEW" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">eco</span> Certified Pre-Owned
            </Link>
            <span className="text-outline-variant">•</span>
            <Link to="/grading-standards" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span> 90-Point Hardware Standards
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/safety-guidelines" className="text-secondary font-semibold hover:underline flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">security</span> Safe P2P Guidelines
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center font-black text-lg shadow-sm">
            <span className="material-symbols-outlined text-2xl">smartphone</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-on-surface leading-none">
              Mobile<span className="text-primary">Mart</span>
            </span>
            <span className="text-[10px] text-on-surface-variant tracking-wider uppercase font-bold">
              Exchange & Marketplace
            </span>
          </div>
        </Link>

        {/* Global Search */}
        <form onSubmit={handleSearchSubmit} className="hidden sm:flex flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model, brand, or specs (e.g. iPhone 16, S24, 256GB)..."
              className="w-full bg-surface-container-low border border-surface-container rounded-xl pl-9 pr-4 py-2 text-xs md:text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline"
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-outline text-[18px]">
              search
            </span>
          </div>
        </form>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-on-surface">
          <Link
            to="/browse"
            className={`hover:text-primary transition-colors ${
              location.pathname === '/browse' ? 'text-primary font-bold' : ''
            }`}
          >
            Browse Phones
          </Link>
          <Link
            to="/grading-standards"
            className={`hover:text-primary transition-colors ${
              location.pathname === '/grading-standards' ? 'text-primary font-bold' : ''
            }`}
          >
            Grading Guide
          </Link>
        </nav>

        {/* Right Action Icons & Auth */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Favorites Icon */}
              <Link
                to="/favorites"
                className="relative p-2 rounded-xl text-on-surface hover:bg-surface-container-low transition-colors"
                title="Saved Favorites"
              >
                <span className="material-symbols-outlined text-xl">favorite</span>
                {favoriteIds.size > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-error text-on-error text-[10px] font-bold flex items-center justify-center">
                    {favoriteIds.size}
                  </span>
                )}
              </Link>

              {/* Conversations Icon */}
              <Link
                to="/conversations"
                className="p-2 rounded-xl text-on-surface hover:bg-surface-container-low transition-colors"
                title="Messages & Inquiries"
              >
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
              </Link>

              {/* Sell Phone Button */}
              <Link
                to="/create-listing"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-sm hover:bg-primary-container transition-all"
              >
                <span className="material-symbols-outlined text-sm">add_circle</span> Sell a Phone
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-surface-container-low transition-colors"
                >
                  <img
                    src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover border border-outline-variant"
                  />
                  <span className="hidden md:inline font-semibold text-xs text-on-surface max-w-[100px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <span className="material-symbols-outlined text-xs text-outline">expand_more</span>
                </button>

                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container py-2 z-50 text-xs"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-surface-container">
                      <p className="font-bold text-on-surface truncate">{user?.name}</p>
                      <p className="text-[11px] text-on-surface-variant truncate">{user?.email}</p>
                      {isAdmin && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-error-container text-on-error-container">
                          ADMINISTRATOR
                        </span>
                      )}
                    </div>
                    <Link
                      to="/my-listings"
                      className="flex items-center gap-2 px-4 py-2 text-on-surface hover:bg-surface-container-low"
                    >
                      <span className="material-symbols-outlined text-base">list_alt</span> My Listings
                    </Link>
                    <Link
                      to="/conversations"
                      className="flex items-center gap-2 px-4 py-2 text-on-surface hover:bg-surface-container-low"
                    >
                      <span className="material-symbols-outlined text-base">chat</span> Inquiries & Messages
                    </Link>
                    <Link
                      to="/favorites"
                      className="flex items-center gap-2 px-4 py-2 text-on-surface hover:bg-surface-container-low"
                    >
                      <span className="material-symbols-outlined text-base">favorite</span> Saved Favorites
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-on-surface hover:bg-surface-container-low"
                    >
                      <span className="material-symbols-outlined text-base">person</span> Profile & Settings
                    </Link>

                    {isAdmin && (
                      <div className="border-t border-surface-container my-1 pt-1">
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-primary font-bold hover:bg-surface-container-low"
                        >
                          <span className="material-symbols-outlined text-base">admin_panel_settings</span> Admin Portal
                        </Link>
                      </div>
                    )}

                    <div className="border-t border-surface-container my-1 pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-error hover:bg-error-container/30 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">logout</span> Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-xl font-bold text-xs text-primary hover:bg-surface-container-low transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-3.5 py-1.5 rounded-xl font-bold text-xs bg-primary text-on-primary hover:bg-primary-container shadow-sm transition-all"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 lg:hidden text-on-surface hover:bg-surface-container-low rounded-xl"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-surface-container bg-surface-container-lowest px-4 py-3 space-y-2 text-sm font-semibold">
          <form onSubmit={handleSearchSubmit} className="mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phones..."
              className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs"
            />
          </form>
          <Link
            to="/browse"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-on-surface hover:text-primary"
          >
            Browse All Phones
          </Link>
          <Link
            to="/browse?condition=NEW"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-on-surface hover:text-primary"
          >
            Brand New Flagships
          </Link>
          <Link
            to="/browse?condition=LIKE_NEW"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-on-surface hover:text-primary"
          >
            Certified Pre-Owned
          </Link>
          <Link
            to="/grading-standards"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-on-surface hover:text-primary"
          >
            Grading Standards
          </Link>
          <Link
            to="/safety-guidelines"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-secondary hover:underline"
          >
            Safety Guidelines
          </Link>
          {isAuthenticated && (
            <Link
              to="/create-listing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-primary font-bold"
            >
              + Sell a Phone
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
