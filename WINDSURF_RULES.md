# WINDSURF RULES for Notification Microservice

## 1. Tech Stack
- Node.js (>=18), Express.js
- MongoDB (Mongoose ODM)
- REST API (OpenAPI/Swagger for docs)
- Optionally: Docker for deployment

## 2. Design Patterns & Coding Approach
- **Modular structure:** `/models`, `/controllers`, `/routes`, `/middleware`, `/services`, `/utils`
- **Service-agnostic:** Do not couple to my-bank-api or any single system
- **Consistent naming:** camelCase for variables/functions, PascalCase for classes
- **Async/await** for all async code
- **Error handling:** Centralized middleware, never expose stack traces to clients
- **Validation:** Use express-validator or custom middleware for all input
- **Environment config:** All secrets and URLs in `.env`
- **Testing:** All business logic must be unit-testable

## 3. Business Logic (from retained memory)
- Trigger notifications for:
  - Application status changes: approve, verify, reject, profile complete
  - Account events: create, deposit, withdraw, airdrop
  - Transaction events: transfer
- Each notification must include: type, title, message, link (URL), recipient (role/id), source (service), and extra data
- Notifications are created by POST from any trusted service (not just my-bank-api)
- Admin/banker dashboard fetches notifications via GET; notifications can be marked as read
- Notification schema must be extensible for new types, channels, and future business needs

## 4. Coding Standards
- Use Prettier/ESLint for formatting and linting
- All modules must have JSDoc comments
- No business logic in routes: use controllers/services
- All code must be fully modular and reusable

## 5. Security
- All POSTs to /notifications must be authenticated (API key or JWT)
- Do not trust client input; always validate
- Never expose sensitive config or stack traces

## 6. Documentation
- Maintain up-to-date README and OpenAPI spec
- Document all endpoints, payloads, and integration steps

---

**These rules are to be followed for the entire notification-service project lifecycle.**
