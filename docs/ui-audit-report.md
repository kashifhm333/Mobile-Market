# MobileMart — UI Audit Report & Implementation Plan

**Date:** 2026-10-23  
**Status:** Completed Phase 1 (Repository & UI Audit)  
**Design Source of Truth:** `UI/` directory (Google Stitch UI prototypes & high-resolution screenshots)

---

## 1. Inventory of Existing UI Assets

The `UI/` folder contains 9 HTML templates along with matching high-resolution PNG renders:

| File Name | Screen Identifier | Core Functionality Represented | Key Design Elements & Components |
|---|---|---|---|
| `Image 10.html` / `Image 13.html` (`Image 11.png`, `Image 14.png`) | **Main Marketplace Landing (Home)** | Dual-path entry (Brand New vs. Certified Pre-Owned), feature highlights, 90-point inspection ticker, grading standards summary, warranty guarantees, customer reviews, newsletter. | Dual-hero card grid, floating product badges, micro-ticker, warranty cards, grading grade chips, testimonials. |
| `Image 12.html` (`Image 9.png`) | **Alternate Marketplace Hero** | Clean minimal hero variant focusing on "Aircraft turbine quality inspection" and 3-step rapid device trading. | Trust metric badges, step-by-step workflow icons, clean product carousel teaser. |
| `Image 2.html` & `Image 4.html` (`Image 1.png`, `Image 3.png`) | **Brand New Phones Catalog / Browse** | Filterable catalog for factory-sealed flagship smartphones (Apple, Samsung, Google, OnePlus). | Multi-faceted sidebar filter (Price range, Storage 128GB-1TB, RAM, 5G, Carrier unlocked), product cards with MSRP + monthly estimation, instant trade-in discount banner. |
| `Image 6.html` (`Image 5.png`) | **Certified Pre-Owned Catalog / Browse** | Marketplace catalog for pre-owned / refurbished phones with grade tags. | Condition badges (`Pristine`, `Excellent`, `Good`), battery health guarantees (>= 85%), price savings vs MSRP, verified seller indicators. |
| `Image 8.html` (`Image 7.png`) | **Grading Standards Guide** | Detailed breakdown of cosmetic and hardware condition tiers. | Visual grade breakdown cards (`Pristine Like New`, `Excellent Minor Wear`, `Good Light Scratches`, `Fair Discounted Tier`), test checklists. |
| `Image 15.html` & `Image 17.html` (`Image 16.png`) | **Trade-In / Device Valuation & Sell Flow** | Interactive multi-step form to select manufacturer brand, model, storage, condition diagnostic, and receive instant valuation. | Step indicator (1. Brand -> 2. Model & Storage -> 3. Condition Diagnostic -> 4. Quote), interactive button pills, live quote summary card. |

---

## 2. Design System Tokens (Extracted from UI Source of Truth)

All Stitch UI templates share an identical Material Design 3 / Modern FinTech design token system:

- **Color Palette:**
  - `primary`: `#004ac6` (Rich Cobalt Blue)
  - `primary-container`: `#2563eb` (Vibrant Royal Blue)
  - `on-primary`: `#ffffff`
  - `secondary`: `#006c49` (Forest Mint Green - trust, verified, savings)
  - `secondary-container`: `#6cf8bb`
  - `background` & `surface`: `#faf8ff` (Clean soft lavender-tinted white)
  - `surface-container-lowest`: `#ffffff` (Pure white card surfaces)
  - `surface-container-low`: `#f2f3ff`
  - `surface-container`: `#eaedff`
  - `surface-container-high`: `#e2e7ff`
  - `surface-container-highest`: `#dae2fd`
  - `on-surface`: `#131b2e` (Deep navy-charcoal typography)
  - `on-surface-variant`: `#434655` (Muted slate gray for secondary text)
  - `outline`: `#737686`
  - `outline-variant`: `#c3c6d7`
  - `error`: `#ba1a1a`
- **Typography:**
  - Headings / Display: `Plus Jakarta Sans`, font-weights `600`, `700`, `800`
  - UI Labels / Badges: `Inter`, font-weights `600`, `700`
  - Body: `Plus Jakarta Sans`, font-weights `400`, `500`
  - Iconography: Google `Material Symbols Outlined`
- **Corner Radii & Elevation:**
  - Cards: `rounded-xl` (`0.75rem`) and `rounded-2xl` (`1rem`)
  - Badges / Chips: `rounded-full`
  - Buttons: `rounded-xl` or `rounded-lg` with subtle hover elevations and transitions.

---

## 3. Mapping Existing UI Components to MobileMart Features

1. **Header & Navigation Bar**:
   - Brand logo "MobileMart" (replaces NexPhone placeholder).
   - Global search input with real-time query handling.
   - Segment toggle: "All Listings", "Brand New", "Pre-Owned", "Sell a Phone".
   - User profile dropdown / Authentication trigger (Login, Register, Dashboard, Favorites, Messages, Logout).
2. **Product Listing Card (`ListingCard`)**:
   - Reusable across Home, Search, Browse, Favorites, and Seller Profile.
   - Shows phone title, brand, storage, condition badge (`NEW`, `LIKE_NEW`, `GOOD`, `FAIR`), seller location (City), price, negotiable tag, favorite bookmark toggle button.
3. **Multi-Faceted Filter Sidebar (`ListingFilters`)**:
   - Brand filter (Apple, Samsung, Google, OnePlus, Xiaomi, etc.).
   - Condition filter (`New`, `Like New`, `Good`, `Fair`).
   - Price range slider (Min - Max).
   - Storage capacity pills (64GB, 128GB, 256GB, 512GB, 1TB).
   - City / Location selector.
   - Sort dropdown (Price Low-to-High, Price High-to-Low, Newest First).
4. **Device Listing / Sell Multi-Step Form (`CreateListingForm`)**:
   - Built directly on top of `Image 15.html` & `Image 17.html` workflow:
     1. Brand Selection.
     2. Model & Storage.
     3. Condition assessment & battery health.
     4. Photos upload (drag-and-drop with preview).
     5. Price setting (negotiable switch, currency).
     6. City and seller contact notes.
     7. Review and Publish / Save as Draft.

---

## 4. Identified Missing Screens & Interaction Gaps to Implement

The supplied UI templates provided rich landing, catalog, and valuation pages, but lacked administrative, account, and transactional pages. We will build these missing screens maintaining 100% visual fidelity with the design tokens:

1. **Listing Details Page (`/listings/:id`)**:
   - Image gallery with thumbnail selector.
   - Phone specs table (Condition, Storage, RAM, Battery health, Carrier status, IMEI/Serial check status).
   - Direct seller contact box (Start Inquiry / Make Offer).
   - Clear warning banner: *"Important: Buyers and sellers transact directly. Never transfer money via untrusted methods. MobileMart does not collect payments."*
   - Save to Favorites button.
   - Report listing dialog.
2. **Authentication Pages (`/login`, `/register`, `/forgot-password`, `/reset-password`)**:
   - Clean card-based login/signup consistent with the UI surface container style.
   - Email verification notice & error feedback.
3. **Buyer/Seller Messaging & Inquiries (`/messages`, `/inquiries/:id`)**:
   - Split-view chat interface: conversation list on the left, active message thread on the right.
   - Deal status tracker: `INQUIRY` -> `OFFER_MADE` -> `RESERVED` -> `SELLER_CONFIRMED_SALE` / `CANCELLED`.
   - Action controls: Seller "Mark as Reserved", Seller "Confirm Sold to Buyer".
4. **My Listings Dashboard (`/my-listings`)**:
   - Listing management grid with status tabs (`All`, `Active`, `Draft`, `Reserved`, `Sold`, `Archived`).
   - Actions: Edit, Delete/Archive, View Preview, Mark Sold.
5. **Favorites Page (`/favorites`)**:
   - Grid of saved phone listings with quick contact button and instant remove toggle.
6. **User Profile & Settings (`/profile`, `/settings`)**:
   - Public view (`/sellers/:id`) showing seller join date, location, verified phone status, active listings.
   - Account settings (update display name, phone, bio, avatar, change password).
7. **Admin Portal (`/admin/*`)**:
   - Overview metrics: Active listings, total registered users, open reports, audit logs.
   - Listing moderation table (Approve, Reject with reason, Archive).
   - User management table (Active, Suspended, Admin role toggle).
   - Report management (Review reported listings or fraudulent accounts, dismiss or take punitive action).
   - Audit trail viewer.
8. **Static Informational Pages**:
   - `/grading-standards` (from `Image 8.html`).
   - `/safety-guidelines` (safe meetups, phone verification checklist, fraud prevention).
   - `/terms` & `/privacy`.
   - `/404` Not Found.

---

## 5. Implementation Strategy & Architecture Plan

- **Monorepo Structure**:
  - `docs/`: Full specifications, architecture docs, and 11 Mermaid UML diagrams.
  - `app/backend/`: Node.js + Express (ES Modules) + MongoDB Mongoose + JWT HTTP-only cookies + Multer uploads + Swagger OpenAPI.
  - `app/frontend/`: React 18+ with Vite + Tailwind CSS configured with the exact design tokens + React Router + Axios + Context API.
  - Root `package.json` with concurrently running development scripts and automated test runners.
  - `docker-compose.yml` for unified containerized deployment.
