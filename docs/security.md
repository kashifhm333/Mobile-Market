# MobileMart — Application Security Document

## 1. Security Architecture & Threat Model

MobileMart is designed to protect users against common web vulnerabilities as outlined in the OWASP Top 10:

### 1.1 Authentication & Credential Storage
- **Password Hashing:** Passwords are never stored in plaintext. They are salted and hashed using `bcryptjs` with an adaptive work factor (12 rounds).
- **Session Tokens:** Stateless JWT tokens signed with a high-entropy secret (`JWT_SECRET`).
- **Token Delivery:** JWT is passed via an `httpOnly`, `sameSite: 'lax'` (or `'strict'`), and `secure` (in production) cookie, preventing exfiltration through Cross-Site Scripting (XSS). An authorization Bearer header fallback is supported for API testing.
- **Account Enumeration Defense:** Generic error messages are returned on login failures ("Invalid email or password").

### 1.2 Authorization & Access Control
- **Role-Based Access Control (RBAC):** Admin endpoints are guarded by `roleMiddleware` verifying `req.user.role === 'ADMIN'`. Client-provided roles during registration are strictly overridden to `USER`.
- **Resource Ownership Enforcement:** Users can only edit or delete their own listings, read their own conversations, or modify their own profiles. Attempts to manipulate other users' resources result in an HTTP `403 Forbidden`.

### 1.3 Injection & Input Sanitization
- **NoSQL Injection:** Mongoose strict schemas and query sanitizers ensure input objects cannot hijack MongoDB operators (`$gt`, `$where`, etc.).
- **XSS Prevention:** React automatically escapes output bindings. User-provided descriptions are validated for max length and stripped of dangerous script tags.
- **File Upload Security:** Multer checks MIME types (`image/jpeg`, `image/png`, `image/webp`) and enforces an 8MB limit per image. Files are renamed using crypto UUIDs, preventing path traversal attacks.

### 1.4 Rate Limiting & Denial of Service Protection
- Global IP rate limiting via `express-rate-limit` prevents API flooding.
- Sensitive auth endpoints (`/auth/login`, `/auth/register`) have strict limits (e.g. 10 attempts per 15 minutes).
- Payload size limits are enforced on Express body parsers (10MB max).

### 1.5 External Payment Security Warning
- MobileMart deliberately omits all payment processing.
- Prominent safety notices warn users never to wire funds or pay before physically inspecting items in safe public locations.
