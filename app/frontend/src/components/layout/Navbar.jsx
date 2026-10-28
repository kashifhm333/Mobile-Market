import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Smartphone,
  Search,
  Heart,
  MessageSquare,
  Plus,
  ChevronDown,
  List,
  User,
  ShieldAlert,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  Package,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { favoriteIds } = useFavorites();
  const { theme, isDark, toggleTheme } = useTheme();
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
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-surface-container">
      {/* Top Utility Strip */}
      <div className="bg-surface-container-low py-1.5 px-4 text-xs text-on-surface-variant border-b border-surface-container hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/browse?condition=NEW" className="hover:text-secondary transition-colors flex items-center gap-1.5 font-medium">
              <Package className="w-3.5 h-3.5 text-secondary" /> Factory Sealed New
            </Link>
            <span className="text-outline-variant">•</span>
            <Link to="/browse?condition=LIKE_NEW" className="hover:text-secondary transition-colors flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-secondary" /> Certified Pre-Owned
            </Link>
            <span className="text-outline-variant">•</span>
            <Link to="/grading-standards" className="hover:text-secondary transition-colors flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-secondary" /> 90-Point Hardware Standards
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/safety-guidelines" className="text-secondary font-semibold hover:underline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Safe P2P Guidelines
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-accent text-on-accent flex items-center justify-center font-black shadow-sm">
            <Smartphone className="w-5 h-5 text-on-accent" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-on-surface leading-none">
              Mobile<span className="text-secondary">Mart</span>
            </span>
            <span className="text-[10px] text-on-surface-variant tracking-wider uppercase font-semibold mt-0.5">
              Verified Smartphone Exchange
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
              placeholder="Search by model, brand, or specs..."
              className="w-full bg-surface-container-low border border-surface-container rounded-xl pl-9 pr-4 py-2 text-xs md:text-sm text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all placeholder:text-outline"
            />
            <Search className="absolute left-2.5 top-2.5 text-outline w-4 h-4" />
          </div>
        </form>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-on-surface uppercase tracking-wider">
          <Link
            to="/browse"
            className={`hover:text-secondary transition-colors ${
              location.pathname === '/browse' ? 'text-secondary font-bold' : ''
            }`}
          >
            Browse Phones
          </Link>
          <Link
            to="/grading-standards"
            className={`hover:text-secondary transition-colors ${
              location.pathname === '/grading-standards' ? 'text-secondary font-bold' : ''
            }`}
          >
            Grading Guide
          </Link>
        </nav>

        {/* Right Action Icons & Auth */}
        <div className="flex items-center gap-2.5">
          {isAuthenticated ? (
            <>
              {/* Favorites Icon */}
              <Link
                to="/favorites"
                className="relative p-2 rounded-xl text-on-surface hover:bg-surface-container-low transition-colors"
                title="Saved Favorites"
                aria-label="Saved Favorites"
              >
                <Heart className="w-5 h-5" />
                {favoriteIds.size > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-error text-white text-[10px] font-bold flex items-center justify-center">
                    {favoriteIds.size}
                  </span>
                )}
              </Link>

              {/* Conversations Icon */}
              <Link
                to="/conversations"
                className="p-2 rounded-xl text-on-surface hover:bg-surface-container-low transition-colors"
                title="Messages & Inquiries"
                aria-label="Messages & Inquiries"
              >
                <MessageSquare className="w-5 h-5" />
              </Link>

              {/* Sell Phone Button */}
              <Link
                to="/create-listing"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent text-on-accent font-bold text-xs shadow-sm hover:opacity-90 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Sell a Phone
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-surface-container-low transition-colors"
                  aria-expanded={userMenuOpen}
                  aria-label={`${user?.name?.split(' ')[0] || 'User'} account menu`}
                >
                  <img
                    src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                    alt={user?.name || 'User avatar'}
                    className="w-8 h-8 rounded-full object-cover border border-outline-variant"
                  />
                  <span className="hidden md:inline font-semibold text-xs text-on-surface max-w-[100px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-outline" />
                </button>

                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-surface rounded-2xl shadow-xl border border-surface-container py-2 z-50 text-xs"
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
                      <List className="w-4 h-4 text-outline" /> My Listings
                    </Link>
                    <Link
                      to="/conversations"
                      className="flex items-center gap-2 px-4 py-2 text-on-surface hover:bg-surface-container-low"
                    >
                      <MessageSquare className="w-4 h-4 text-outline" /> Inquiries & Messages
                    </Link>
                    <Link
                      to="/favorites"
                      className="flex items-center gap-2 px-4 py-2 text-on-surface hover:bg-surface-container-low"
                    >
                      <Heart className="w-4 h-4 text-outline" /> Saved Favorites
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-on-surface hover:bg-surface-container-low"
                    >
                      <User className="w-4 h-4 text-outline" /> Profile & Settings
                    </Link>

                    {isAdmin && (
                      <div className="border-t border-surface-container my-1 pt-1">
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-secondary font-bold hover:bg-surface-container-low"
                        >
                          <ShieldAlert className="w-4 h-4 text-secondary" /> Admin Portal
                        </Link>
                      </div>
                    )}

                    <div className="border-t border-surface-container my-1 pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-error hover:bg-error-container/30 transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-error" /> Log Out
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
                className="px-3 py-1.5 rounded-xl font-bold text-xs text-secondary hover:bg-surface-container-low transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-3.5 py-1.5 rounded-xl font-bold text-xs bg-accent text-white hover:opacity-90 shadow-sm transition-all"
              >
                Register
              </Link>
            </div>
          )}

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            id="theme-toggle-btn"
            className="p-2 rounded-xl text-on-surface hover:bg-surface-container-low transition-colors border border-transparent hover:border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary flex items-center justify-center group"
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-secondary transition-transform group-hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 text-on-surface-variant transition-transform group-hover:-rotate-12" />
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 lg:hidden text-on-surface hover:bg-surface-container-low rounded-xl"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-surface-container bg-surface px-4 py-3 space-y-2 text-sm font-semibold">
          <form onSubmit={handleSearchSubmit} className="mb-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search phones..."
                className="w-full bg-surface-container-low border border-surface-container rounded-xl pl-8 pr-3 py-2 text-xs text-on-surface"
              />
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-outline" />
            </div>
          </form>
          <Link
            to="/browse"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-on-surface hover:text-secondary"
          >
            Browse All Phones
          </Link>
          <Link
            to="/browse?condition=NEW"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-on-surface hover:text-secondary"
          >
            Brand New Flagships
          </Link>
          <Link
            to="/browse?condition=LIKE_NEW"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-on-surface hover:text-secondary"
          >
            Certified Pre-Owned
          </Link>
          <Link
            to="/grading-standards"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-on-surface hover:text-secondary"
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
              className="block py-2 text-secondary font-bold"
            >
              + Sell a Phone
            </Link>
          )}

          {/* Theme Switcher in Mobile Drawer */}
          <div className="pt-2 border-t border-surface-container flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-medium">
              Appearance
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low border border-surface-container text-xs font-bold text-on-surface hover:bg-surface-container transition-colors"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-secondary" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-on-surface-variant" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
