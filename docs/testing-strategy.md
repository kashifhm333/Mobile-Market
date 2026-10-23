# MobileMart — Testing Strategy & Verification Plan

## 1. Overview & Test Pyramid
The testing strategy enforces multi-tier quality assurance:
1. **Unit & Validation Tests**: Validates domain logic, helper utilities, state machines, and express-validator rules.
2. **Backend API Integration Tests**: Uses `Vitest` and `Supertest` to exercise real HTTP endpoints against a live or in-memory MongoDB database.
3. **Frontend Component & Routing Tests**: Uses `Vitest` + `React Testing Library` to verify component rendering, navigation, and state.
4. **End-to-End Workflow Verification**: Automated browser verification covering user registration, listing creation, search/filter, favoriting, inquiry messaging, and seller sale confirmation.

## 2. Test Execution Commands
- Run backend tests:
  ```bash
  npm run test:backend
  ```
- Run frontend tests:
  ```bash
  npm run test:frontend
  ```
- Run all tests:
  ```bash
  npm test
  ```
- Check linting:
  ```bash
  npm run lint
  ```
- Production build validation:
  ```bash
  npm run build
  ```
