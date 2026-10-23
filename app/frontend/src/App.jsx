import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

import PublicLayout from './layouts/PublicLayout.jsx';
import { ProtectedRoute, AdminRoute } from './routes/ProtectedRoute.jsx';

import HomePage from './pages/HomePage.jsx';
import BrowseListingsPage from './pages/BrowseListingsPage.jsx';
import ListingDetailPage from './pages/ListingDetailPage.jsx';
import SellerProfilePage from './pages/SellerProfilePage.jsx';
import CreateListingPage from './pages/CreateListingPage.jsx';
import MyListingsPage from './pages/MyListingsPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import ConversationsPage from './pages/ConversationsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import GradingStandardsPage from './pages/GradingStandardsPage.jsx';
import SafetyGuidelinesPage from './pages/SafetyGuidelinesPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <FavoritesProvider>
              <Routes>
              <Route element={<PublicLayout />}>
                {/* Public Discovery Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/browse" element={<BrowseListingsPage />} />
                <Route path="/listings/:id" element={<ListingDetailPage />} />
                <Route path="/sellers/:id" element={<SellerProfilePage />} />
                <Route path="/grading-standards" element={<GradingStandardsPage />} />
                <Route path="/safety-guidelines" element={<SafetyGuidelinesPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Authenticated Dual-Role User Routes */}
                <Route
                  path="/create-listing"
                  element={
                    <ProtectedRoute>
                      <CreateListingPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-listings"
                  element={
                    <ProtectedRoute>
                      <MyListingsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <FavoritesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/conversations"
                  element={
                    <ProtectedRoute>
                      <ConversationsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/conversations/:id"
                  element={
                    <ProtectedRoute>
                      <ConversationsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Management Portal */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboardPage />
                    </AdminRoute>
                  }
                />

                {/* 404 Catch-All */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </FavoritesProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  </BrowserRouter>
);
}

export default App;
