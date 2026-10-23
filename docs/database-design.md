# MobileMart — Database Design & Data Modeling Document

## 1. Data Modeling Strategy: Embedding vs. Referencing

In MongoDB, referencing is selected for high-growth, independently queried entities (Listings, Users, Conversations), while embedded subdocuments are used for bounded data structures that never grow indefinitely (e.g. `listing.specifications`, `user.profile`).

## 2. Collections & Schemas

### 2.1 `users`
- `_id`: ObjectId (Primary Key)
- `name`: String (Required, trimmed, 2-100 chars)
- `email`: String (Required, lowercase, unique, indexed)
- `passwordHash`: String (Required, excluded from default queries via `select: false`)
- `role`: String (Enum: `USER`, `ADMIN`, default: `USER`)
- `status`: String (Enum: `ACTIVE`, `SUSPENDED`, `PENDING_VERIFICATION`, default: `ACTIVE`)
- `phone`: String (Optional)
- `city`: String (Optional)
- `avatarUrl`: String (Optional)
- `bio`: String (Optional)
- `createdAt`: Date (Auto-timestamp)
- `updatedAt`: Date (Auto-timestamp)
*Indexes:* `email` (unique), `role`, `status`.

### 2.2 `listings`
- `_id`: ObjectId
- `sellerId`: ObjectId (Ref: `User`, Required, Indexed)
- `title`: String (Required, 5-150 chars)
- `brand`: String (Required, Enum: `Apple`, `Samsung`, `Google`, `OnePlus`, `Xiaomi`, `Motorola`, `Other`)
- `model`: String (Required)
- `variant`: String (Storage/RAM e.g. "256GB / 8GB RAM")
- `condition`: String (Required, Enum: `NEW`, `LIKE_NEW`, `GOOD`, `FAIR`)
- `price`: Number (Required, Min: 1)
- `currency`: String (Default: `USD`)
- `negotiable`: Boolean (Default: false)
- `description`: String (Required, Max: 3000 chars)
- `images`: Array of Strings (URLs/paths to uploaded images, max: 8)
- `city`: String (Required)
- `specifications`: Embedded Object:
  - `storage`: String (e.g. "256GB")
  - `ram`: String (e.g. "8GB")
  - `batteryHealth`: Number (Optional, 50-100)
  - `color`: String
  - `carrier`: String (e.g. "Unlocked", "Verizon", "AT&T", "T-Mobile")
- `status`: String (Enum: `DRAFT`, `ACTIVE`, `RESERVED`, `SOLD`, `ARCHIVED`, `REJECTED`, default: `ACTIVE`, Indexed)
- `reservedFor`: ObjectId (Ref: `User`, Optional)
- `rejectionReason`: String (Optional, for admin moderation)
- `viewsCount`: Number (Default: 0)
- `createdAt`: Date
- `updatedAt`: Date
*Indexes:* `status`, `sellerId`, `brand`, `price`, `createdAt`, text index on `{ title: 'text', model: 'text', description: 'text' }`.

### 2.3 `favorites`
- `_id`: ObjectId
- `userId`: ObjectId (Ref: `User`, Required, Indexed)
- `listingId`: ObjectId (Ref: `Listing`, Required, Indexed)
- `createdAt`: Date
*Compound Index:* `{ userId: 1, listingId: 1 }` (Unique).

### 2.4 `conversations`
- `_id`: ObjectId
- `listingId`: ObjectId (Ref: `Listing`, Required, Indexed)
- `buyerId`: ObjectId (Ref: `User`, Required, Indexed)
- `sellerId`: ObjectId (Ref: `User`, Required, Indexed)
- `status`: String (Enum: `OPEN`, `OFFER_PENDING`, `RESERVED`, `CLOSED`, default: `OPEN`)
- `proposedPrice`: Number (Optional)
- `lastMessage`: String (Optional snippet)
- `lastMessageAt`: Date
- `createdAt`: Date
- `updatedAt`: Date
*Compound Unique Index:* `{ listingId: 1, buyerId: 1 }`.

### 2.5 `messages`
- `_id`: ObjectId
- `conversationId`: ObjectId (Ref: `Conversation`, Required, Indexed)
- `senderId`: ObjectId (Ref: `User`, Required)
- `body`: String (Required, 1-2000 chars)
- `readAt`: Date (Optional)
- `createdAt`: Date
*Indexes:* `{ conversationId: 1, createdAt: 1 }`.

### 2.6 `reports`
- `_id`: ObjectId
- `reporterId`: ObjectId (Ref: `User`, Required)
- `targetType`: String (Enum: `LISTING`, `USER`)
- `targetId`: ObjectId (Required)
- `reason`: String (Enum: `FRAUD`, `SPAM`, `INAPPROPRIATE`, `MISLEADING_SPECS`, `OTHER`)
- `description`: String (Required, Max: 1000 chars)
- `status`: String (Enum: `PENDING`, `INVESTIGATING`, `RESOLVED`, `DISMISSED`, default: `PENDING`)
- `reviewedBy`: ObjectId (Ref: `User`, Optional)
- `resolutionNote`: String (Optional)
- `createdAt`: Date
- `updatedAt`: Date
*Indexes:* `status`, `targetType`, `targetId`.

### 2.7 `auditlogs`
- `_id`: ObjectId
- `actorId`: ObjectId (Ref: `User`, Required)
- `action`: String (Required, e.g. `LISTING_REJECTED`, `USER_SUSPENDED`, `STATUS_OVERRIDE`)
- `targetType`: String (Required)
- `targetId`: String (Required)
- `metadata`: Object (Arbitrary JSON context)
- `createdAt`: Date (Auto-timestamp)
*Indexes:* `actorId`, `action`, `createdAt`.
