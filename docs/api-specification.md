# MobileMart — REST API Specification (`/api/v1`)

## 1. Global Standards
- Base URL: `/api/v1`
- Content-Type: `application/json` (or `multipart/form-data` for file uploads)
- Standard Response envelope:
  ```json
  {
    "success": true,
    "data": { ... },
    "message": "Optional descriptive message",
    "meta": { "total": 100, "page": 1, "limit": 12, "totalPages": 9 }
  }
  ```
- Standard Error envelope:
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Invalid input parameters",
      "details": [ { "field": "price", "message": "Price must be greater than 0" } ]
    }
  }
  ```

---

## 2. Endpoints Summary

### Authentication (`/auth`)
- `POST /auth/register`: Create user account (`name`, `email`, `password`, `phone`, `city`).
- `POST /auth/login`: Authenticate with email/password; returns user profile and sets HTTP-Only JWT cookie.
- `POST /auth/logout`: Clear session cookie.
- `GET /auth/me`: Retrieve current authenticated user profile.
- `PUT /auth/profile`: Update user profile details (name, phone, city, bio, avatar).
- `PUT /auth/password`: Update password (requires `currentPassword`, `newPassword`).

### Listings (`/listings`)
- `GET /listings`: Search & filter active listings (`search`, `brand`, `condition`, `minPrice`, `maxPrice`, `city`, `sort`, `page`, `limit`).
- `GET /listings/my`: Retrieve listings belonging to the authenticated user (all statuses).
- `GET /listings/:id`: Retrieve public details of a single listing (increments view count).
- `POST /listings`: Create a new phone listing (`DRAFT` or `ACTIVE`).
- `PUT /listings/:id`: Update listing details (ownership enforced).
- `PATCH /listings/:id/status`: Update status (`ACTIVE`, `RESERVED`, `SOLD`, `ARCHIVED`).
- `DELETE /listings/:id`: Soft-delete/Archive listing (ownership enforced).
- `POST /listings/:id/images`: Upload image files (`multipart/form-data`).

### Favorites (`/favorites`)
- `GET /favorites`: Retrieve all listings favorited by current user.
- `POST /favorites/:listingId`: Add listing to favorites.
- `DELETE /favorites/:listingId`: Remove listing from favorites.
- `GET /favorites/check/:listingId`: Check if a listing is favorited by current user.

### Conversations & Inquiries (`/conversations`)
- `GET /conversations`: Retrieve all user conversations (as buyer or seller).
- `POST /conversations`: Start inquiry / send initial offer for a listing (`listingId`, `message`, `proposedPrice`).
- `GET /conversations/:id`: Retrieve conversation details and message history.
- `POST /conversations/:id/messages`: Post a new message in the conversation.
- `PATCH /conversations/:id/deal`: Update deal status (`OFFER_PENDING`, `RESERVED`, `CLOSED`).

### Reports (`/reports`)
- `POST /reports`: Submit report on listing or user (`targetType`, `targetId`, `reason`, `description`).

### Administration (`/admin`) — Protected (`role: ADMIN`)
- `GET /admin/stats`: Marketplace summary stats (users count, listings by status, pending reports).
- `GET /admin/users`: List users with pagination and search.
- `PATCH /admin/users/:id/status`: Update user account status (`ACTIVE`, `SUSPENDED`).
- `GET /admin/listings`: List all listings across any status for moderation.
- `PATCH /admin/listings/:id/moderate`: Moderate listing (Approve / Reject with reason / Archive).
- `GET /admin/reports`: List user reports with filter by status.
- `PATCH /admin/reports/:id`: Resolve or dismiss report with resolution notes.
- `GET /admin/audit-logs`: View audit trail logs.
