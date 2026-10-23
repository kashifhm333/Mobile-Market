# MobileMart — System Requirements Document

## 1. Introduction & Executive Summary
MobileMart is a modern, production-grade online marketplace dedicated to the buying and selling of new, certified pre-owned, and used mobile phones. MobileMart facilitates peer-to-peer and verified seller listings, detailed technical specifications, real-time inquiries, direct negotiation, and administrative marketplace moderation.

### Core Business Model & Non-Negotiable Constraint
**MobileMart does NOT process payments or escrow funds.** 
All financial transactions occur directly between buyers and sellers outside the platform (e.g. cash on physical meetup, bank transfer, or mutually agreed methods). MobileMart explicitly disclaims payment verification and provides prominent safety guidance and warnings throughout the application. The seller holds sole authority to mark a listing as "Reserved" or "Sold".

---

## 2. User Roles & Personas

### 2.1 Guest Visitor
- May browse all `ACTIVE` listings, filter by brand, price, condition, storage, and city.
- May view phone specifications, condition grading, seller public profiles, safety guidelines, and grading standards.
- May not create listings, save favorites, start inquiries, or file reports without registering/logging in.

### 2.2 Registered User (Buyer & Seller Dual-Role)
- A single unified account type allows any registered user to both buy and sell.
- **Selling Capabilities:**
  - Create, save as draft, publish, edit, archive, and manage mobile phone listings.
  - Upload multiple phone images (validated for mime-type and size limits).
  - Receive inquiries and price proposals.
  - Mark a listing as `RESERVED` for a specific buyer.
  - Confirm a listing as `SOLD` to finalize the transaction.
- **Buying Capabilities:**
  - Bookmark listings to personal "Favorites".
  - Send direct inquiries or propose purchase prices on active listings.
  - Engage in messaging threads with sellers.
  - File reports against suspicious listings or fraudulent behavior.
- **Account Capabilities:**
  - Update personal profile (name, phone number, location, avatar, bio).
  - Secure password management and session termination.

### 2.3 Administrator
- Full oversight of users, listings, inquiries, and reports.
- Moderation capabilities:
  - Approve, reject, or archive inappropriate or fraudulent listings with mandatory recorded reasons.
  - Suspend or activate user accounts.
  - Review submitted user and listing reports, change report status (`PENDING`, `INVESTIGATING`, `RESOLVED`, `DISMISSED`).
  - Inspect structured immutable audit logs for administrative accountability.

---

## 3. Functional Requirements

### 3.1 Listing Lifecycle & State Machine
Valid Listing Statuses:
- `DRAFT`: Incomplete or unlisted item editable by the seller.
- `ACTIVE`: Publicly discoverable by guests and registered users.
- `RESERVED`: Temporarily on hold for an agreed buyer; unavailable for new inquiries.
- `SOLD`: Confirmed by the seller as sold; archived from active search results.
- `ARCHIVED`: Withdrawn by seller or soft-deleted.
- `REJECTED`: Moderated and suppressed by an administrator.

Allowed Transitions:
- `DRAFT` -> `ACTIVE`
- `ACTIVE` -> `RESERVED` -> `SOLD`
- `RESERVED` -> `ACTIVE` (if deal falls through)
- `ACTIVE` -> `ARCHIVED`
- `ACTIVE` / `RESERVED` -> `REJECTED` (admin action)

### 3.2 Inquiries & Direct Messaging
- An inquiry is initiated by a buyer on an `ACTIVE` listing.
- Buyers cannot start inquiries on their own listings.
- Each inquiry establishes a dedicated `Conversation` linked to `(listingId, buyerId, sellerId)`.
- Participants can send text messages, propose purchase amounts, and track inquiry status.
- Strict authorization: Only the specific buyer, seller, and system administrators can access conversation messages.

### 3.3 Favorites
- Users can toggle favorites on listings.
- Backed by a compound unique index `(userId, listingId)` ensuring zero duplicate records.

### 3.4 Moderation & Safety
- Users can report any listing or user specifying a reason (`SPAM`, `FRAUD`, `INCORRECT_SPECS`, `HARASSMENT`, `OTHER`) and details.
- Every moderation action creates an `AuditLog` entry tracking `actorId`, `action`, `targetType`, `targetId`, and `metadata`.

---

## 4. Non-Functional Requirements
- **Performance:** Sub-100ms API response time on indexed queries; lazy-loaded React components; optimized asset loading.
- **Security:** OWASP Top 10 compliance, bcrypt password hashing (salt factor 12), HTTP-only SameSite cookies, JWT validation, CSRF defenses, rate limiting on auth endpoints, input sanitization against NoSQL injection and XSS.
- **Reliability:** Graceful error handling, structured Winston/Morgan logging, robust MongoDB connection pooling, health checks (`/api/v1/health`).
- **Compatibility:** Responsive design matching desktop, tablet, and mobile form factors; modern standards (ES Modules, HTML5, CSS3).
