# MobileMart — System Architecture Document

## 1. Architectural Philosophy & Strategy

MobileMart is designed as a **Modular Monolith** with clear boundary separation between the presentation tier (Single Page Application in React/Vite) and the application tier (RESTful API in Node.js/Express with MongoDB). 

This design pattern was chosen to eliminate premature distributed microservice overhead while enforcing strict layered encapsulation:
1. **Frontend Presentation Layer**: Reusable component architecture styled with the Google Stitch design system tokens.
2. **API & Routing Layer**: Express route definitions mapping HTTP requests to controller handlers with schema validation.
3. **Middleware Layer**: Centralized authentication, role verification, rate limiting, request logging, and global error handling.
4. **Controller Layer**: Orchestrates HTTP serialization, status codes, and delegates domain logic to services.
5. **Service Layer**: Pure business logic (state transitions, authorization ownership checks, notifications, audit logging).
6. **Data Access / Repository Layer**: Mongoose models and queries interacting with MongoDB collections.

---

## 2. High-Level System Architecture

```text
[ Browser Client ]
       |
       |  HTTPS / JSON / Multipart
       v
[ Express Application Server ] (:5000)
  ├── Security & Middlewares (Helmet, CORS, RateLimiter, CookieParser)
  ├── API Routes (/api/v1/*)
  ├── Controller Layer
  ├── Service & Domain Layer
  └── Data Access Layer (Mongoose)
       |
       +---> [ MongoDB Database ] (:27017)
       |
       +---> [ Local / Cloud Image Storage ] (Multer / Static / S3-compatible)
```

### Key Architectural Constraints
1. **No In-App Payments**: The system architecture contains zero payment gateways, merchant accounts, or credit card handling. All deals conclude via direct external buyer-seller settlement.
2. **Stateless Authentication with Secure Cookies**: JSON Web Tokens (JWT) signed with HMAC-SHA256 are stored in HTTP-Only, SameSite strict cookies, preventing client-side script theft (XSS mitigation).
3. **Optimistic Concurrency & Safe Status Transitions**: State changes on listings (e.g. `ACTIVE` -> `RESERVED` -> `SOLD`) utilize atomic MongoDB updates with condition matching to prevent race conditions.
