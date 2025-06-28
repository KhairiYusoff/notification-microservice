# Notification Microservice

A modular, service-agnostic notification microservice for banking and enterprise systems.

## Features
- REST API for creating, fetching, and updating notifications
- Extensible notification schema: supports any event type, recipient, and source
- Secure service-to-service communication (API key/JWT)
- Ready for admin/banker dashboard integration
- Designed for multi-service, multi-tenant environments

## Tech Stack
- Node.js (>=18), Express.js
- MongoDB (Mongoose)
- Docker-ready

## Business Logic (Summary)
- Trigger notifications on:
  - Application status changes (approve, verify, reject, profile complete)
  - Account events (create, deposit, withdraw, airdrop)
  - Transaction events (transfer)
- Each notification contains: type, title, message, link, recipient, source, extra data
- Notifications are not tied to any single service (e.g., my-bank-api)

## Getting Started

1. Clone the repo:
   ```sh
   git clone <your-repo-url>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Copy `.env.example` to `.env` and set your config values.
4. Start the service:
   ```sh
   npm run dev
   ```

## API Documentation
- See OpenAPI spec in `/docs` (to be added)

## Folder Structure
- `/src/models` - Mongoose schemas
- `/src/controllers` - Business logic
- `/src/routes` - Express routes
- `/src/middleware` - Auth, error handling, validation
- `/src/services` - Integration/business services
- `/src/utils` - Helpers/utilities
- `/src/tests` - Unit/integration tests

## Contributing
- Follow the WINDSURF_RULES.md for all contributions.

---
