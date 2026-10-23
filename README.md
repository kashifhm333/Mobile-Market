# MobileMart — Production-Grade Full-Stack Mobile Phone Marketplace

MobileMart is a complete, production-ready web application and online marketplace for buying and selling new, certified pre-owned, and used mobile phones. Built using React, Vite, Tailwind CSS, Node.js, Express, and MongoDB.

---

## 1. Key Business Model & Non-Negotiable Rules

- **Direct Peer-to-Peer Settlement:** MobileMart **never processes payments, collects funds, stores credit card credentials, or holds money in escrow**.
- **Transparent Coordination:** MobileMart handles phone specifications, discoverability, search/filtering, buyer inquiries, offer negotiation, and listing lifecycle states.
- **Seller Authority:** The seller holds sole authority to mark a listing as `RESERVED` or `SOLD` after physical meetup or direct payment.
- **Safety Guidelines:** Prominent disclaimers and safety banners warn users to inspect hardware in safe public locations before transferring payment.

---

## 2. Technology Stack

### Frontend (`app/frontend`)
- **Core:** React 18 with Vite
- **Styling:** Tailwind CSS configured with the Material Design 3 tokens from Google Stitch prototypes
- **Typography:** Plus Jakarta Sans & Inter
- **Icons:** Google Material Symbols Outlined
- **Routing:** React Router DOM (v6) with `ProtectedRoute` and `AdminRoute`
- **HTTP Client:** Axios with credentials and interceptors
- **State Management:** Context API (`AuthContext`, `ToastContext`, `FavoritesContext`)
- **Testing:** Vitest + React Testing Library + JSDOM

### Backend (`app/backend`)
- **Runtime:** Node.js (v18+ / v22) using ES Modules (`"type": "module"`)
- **Framework:** Express.js REST API under `/api/v1`
- **Database:** MongoDB via Mongoose ODM
- **Authentication:** Stateless JWT stored in HTTP-Only, SameSite, Secure cookies (with Bearer header support)
- **Security:** Helmet, CORS, Express Rate Limit, bcrypt password hashing (12 rounds)
- **File Uploads:** Multer with MIME verification and size restrictions
- **Documentation:** OpenAPI / Swagger UI at `/api/docs`
- **Testing:** Vitest + Supertest

---

## 3. Architecture & Documentation Links

Complete system architecture documentation and Mermaid UML diagrams are version-controlled under `docs/`:

- [UI Audit Report](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/ui-audit-report.md)
- [System Requirements](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/requirements.md)
- [System Architecture](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/architecture.md)
- [Frontend Architecture](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/frontend-architecture.md)
- [Backend Architecture](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/backend-architecture.md)
- [Database Design & ER](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/database-design.md)
- [REST API Specification](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/api-specification.md)
- [Security Model](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/security.md)
- [Deployment Guide](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/deployment.md)
- [Testing Strategy](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/testing-strategy.md)

### UML Diagrams (`docs/uml/`)
- [System Context](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/uml/system-context.mmd)
- [Use-Case Diagram](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/uml/use-case-diagram.mmd)
- [Frontend Component Diagram](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/uml/frontend-component-diagram.mmd)
- [Frontend Class/Module Diagram](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/uml/frontend-class-diagram.mmd)
- [Backend Component Diagram](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/uml/backend-component-diagram.mmd)
- [Backend Class Diagram](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/uml/backend-class-diagram.mmd)
- [Database ER Diagram](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/uml/database-er-diagram.mmd)
- [Authentication Sequence](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/uml/authentication-sequence.mmd)
- [Listing Sequence](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/uml/listing-sequence.mmd)
- [Inquiry Sequence](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/uml/inquiry-sequence.mmd)
- [Sale Coordination Sequence](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/uml/sale-sequence.mmd)
- [Moderation Sequence](file:///home/kashifhm333/Desktop/Project/Mobile%20Market/docs/uml/moderation-sequence.mmd)

---

## 4. Getting Started

### Prerequisites
- Node.js >= 18.x
- MongoDB running locally on port 27017 or via Docker

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Seed Demo Database
Populates verified flagship listings, demo users, favorites, and conversations:
```bash
npm run seed
```

### 3. Run Development Servers
Starts both Backend (`http://localhost:5000`) and Frontend (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

### 4. Interactive URLs
- **Frontend Web Application:** `http://localhost:5173`
- **Backend Health Check:** `http://localhost:5000/api/v1/health`
- **Swagger API Docs:** `http://localhost:5000/api/docs`

---

## 5. Pre-Configured Demo Accounts

| Role | Email | Password | Permissions & Features |
|---|---|---|---|
| **Administrator** | `admin@mobilemart.com` | `AdminPass123!` | Moderates listings (Approve/Reject/Archive), user suspension, reports review, audit logs. |
| **Seller** | `seller@mobilemart.com` | `SellerPass123!` | Owns active phone listings (iPhone 16 Pro Max, S24 Ultra, Pixel 9, etc.), inventory status controls. |
| **Buyer** | `buyer@mobilemart.com` | `BuyerPass123!` | Bookmarks favorites, initiates purchase inquiries, proposes prices, chat messaging. |

*Quick-fill demo buttons are provided on the `/login` page.*

---

## 6. Testing & Quality Verification

### Run Backend Integration Tests
Executes 18 automated tests verifying authentication, authorization, listing CRUD, status transitions, duplicate favorites prevention, and admin access control:
```bash
npm run test:backend
```

### Run Frontend Component Tests
Executes component and disclaimer rendering tests:
```bash
npm run test:frontend
```

### Run All Tests
```bash
npm test
```

### Verify Production Frontend Build
```bash
npm run build
```

---

## 7. Docker Deployment

To launch the full containerized stack (MongoDB 7 + Node.js Backend + Nginx Frontend):
```bash
docker-compose up --build -d
```
The application will be served at `http://localhost:3000`.
