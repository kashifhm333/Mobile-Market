# MobileMart — Backend Architecture Document

## 1. Overview
The MobileMart backend is structured as an Express.js ES-Module application connected to MongoDB via Mongoose. It delivers a RESTful API under `/api/v1`.

## 2. Directory Structure (`app/backend/src`)
- `config/`: Database connection (`db.js`), environment configuration (`env.js`), constants.
- `constants/`: Enums for User Roles (`USER`, `ADMIN`), Listing Statuses (`DRAFT`, `ACTIVE`, `RESERVED`, `SOLD`, `ARCHIVED`, `REJECTED`), Conditions (`NEW`, `LIKE_NEW`, `GOOD`, `FAIR`), and Report Targets.
- `models/`: Mongoose schemas with validation and indexes:
  - `User.js`, `Listing.js`, `Favorite.js`, `Conversation.js`, `Message.js`, `Inquiry.js`, `Report.js`, `AuditLog.js`.
- `middleware/`:
  - `authMiddleware.js`: Verifies JWT cookie/header and attaches `req.user`.
  - `roleMiddleware.js`: Restricts administrative routes to `role === 'ADMIN'`.
  - `validationMiddleware.js`: Translates `express-validator` schema results into structured 400 errors.
  - `errorMiddleware.js`: Global error handler intercepting Mongoose validation errors, duplicate keys, and unexpected exceptions.
  - `rateLimiter.js`: Defends against brute-force attacks on auth and public endpoints.
- `controllers/`: Handles HTTP requests, extracts parameters, and calls corresponding service layer methods.
- `services/`: Encapsulates pure business logic:
  - `authService.js`: Registration, bcrypt hashing, token creation, password reset.
  - `listingService.js`: Query filtering, creation, ownership checks, transition guards.
  - `favoriteService.js`: Toggling bookmarks and querying saved items.
  - `conversationService.js`: Inquiry creation, authorization checks, message insertion.
  - `adminService.js`: Listing moderation, user suspension, report resolution, audit inspection.
  - `auditService.js`: Asynchronously creates audit log records for administrative changes.
- `routes/`: Express route definitions grouping endpoints under `/api/v1/*`.
- `utils/`: Helper functions (token generator, logger, async handler).
- `app.js`: Express app setup, middlewares, swagger UI mounting, and route registrations.
- `server.js`: Server listener and graceful shutdown handling (`SIGTERM`, `SIGINT`).
