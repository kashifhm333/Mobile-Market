# MobileMart — Frontend Architecture Document

## 1. Overview
The MobileMart frontend is built with React and Vite. It faithfully implements the Google Stitch UI design system tokens, typography (`Plus Jakarta Sans`, `Inter`), and layout components.

## 2. Directory Structure (`app/frontend/src`)
- `assets/`: Static SVGs, logos, and fallback images.
- `components/common/`: Reusable primitive UI widgets (Button, Input, Badge, Modal, Spinner, Card, Dropdown, Alert).
- `components/layout/`: Navbar, Footer, MobileNav, PublicLayout, AuthLayout, AdminLayout.
- `context/`: React context providers for global state:
  - `AuthContext`: Authenticated user profile, login, signup, logout state.
  - `ToastContext`: Global notification toasts (success, error, info).
  - `FavoritesContext`: Fast client-side bookmark state cache.
- `features/`: Domain-oriented feature modules:
  - `listings/`: `ListingCard`, `ListingGrid`, `ListingFilters`, `ListingGallery`, `ConditionBadge`.
  - `inquiries/`: `InquiryModal`, `ChatThread`, `OfferCard`.
  - `tradeIn/`: Multi-step interactive valuation estimator.
- `pages/`: Page-level components corresponding to application routes.
- `services/`: Axios API clients with automatic credentials and response interception:
  - `api.js`: Base Axios instance with baseURL and error formatting.
  - `authService.js`, `listingService.js`, `favoriteService.js`, `conversationService.js`, `adminService.js`.
- `styles/`: Global CSS imports, Tailwind directives, and custom utility classes.

## 3. State Management & Navigation
- **Routing**: `react-router-dom` (v6+) featuring `ProtectedRoute` and `AdminRoute` wrappers that handle unauthorized redirection gracefully.
- **Client Cache**: Lightweight Context API ensuring minimal bundle footprint without bloated Redux boilerplate.
