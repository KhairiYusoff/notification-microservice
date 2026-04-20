# Engineering Bible (Notification Service)

Purpose: Single source of truth for coding patterns in this repo.

## Non-Negotiables

- Read existing implementation pattern before coding.
- Keep modules self-contained and maintainable.
- Prefer existing utilities/services over creating new ones.
- Avoid broad rewrites for small feature/fix requests.

## Validation Rules

- Do final audit of all changes made.
- Validate code syntax and fix any errors.
- Mention any validation not completed explicitly in final notes.

## PR/Change Quality

- Keep diffs focused.
- Add brief comments only where logic is not obvious.
- Include risks/assumptions when uncertainty exists.

## Living Document

Update this file when a new pattern becomes team standard.

- Avoid broad rewrites for small feature/fix requests.

## Architecture Rules

- Controllers: Handle HTTP requests/responses only.
- Models: Define data structures with Mongoose schemas.
- Routes: Define API endpoints with middleware chain.
- Middleware: Handle authentication and access control.
- Services: Centralize business logic and external integrations.

## Project Structure

```
src/
  config/           # Database and configuration
  controllers/      # Request/response handlers
  middleware/       # Authentication and access control
  models/           # Mongoose schemas
  routes/           # API route definitions
  server.js         # Express server setup
  tests/            # Test files
```

## Controller Patterns

**Standard Controller Structure:**

```javascript
const Model = require("../models/Model");

exports.actionName = async (req, res) => {
  try {
    // 1. Extract and validate input
    const { field1, field2 } = req.body;

    // 2. Business logic
    const result = await Model.create({...});

    // 3. Return response
    return res.status(201).json({
      message: "Operation successful",
      data: result
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error occurred",
      error: err.message
    });
  }
};
```

**CRUD Operations:**

- Create: POST with 201 status
- Read: GET with 200 status
- Update: PUT with 200 status
- Delete: DELETE with 200 status
- Handle 404 for not found cases

## Model Patterns

**Mongoose Schema Structure:**

```javascript
const mongoose = require("mongoose");

const SchemaSchema = new mongoose.Schema(
  {
    field: {
      type: String,
      required: true,
      index: true, // Add indexes for frequently queried fields
    },
    // Use nested objects for complex data
    nested: {
      property: { type: String, required: false },
    },
    // Use Mixed type for flexible metadata
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    // Boolean flags with defaults
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
); // Add timestamps automatically

module.exports = mongoose.model("ModelName", SchemaSchema);
```

## Response Format Standards

**Success Response:**

```javascript
// Create/Update operations
return res.status(201).json({
  message: "Resource created",
  data: result,
});

// Read operations
return res.json({
  data: results,
});
```

**Error Response:**

```javascript
return res.status(400).json({
  message: "Error description",
  error: err.message,
});

// Not found
return res.status(404).json({
  message: "Resource not found",
});
```

## API Endpoint Patterns

**RESTful Conventions:**

- POST `/api/notifications` - Create notification
- GET `/api/notifications` - List notifications (with filters)
- PUT `/api/notifications/:id` - Update notification
- DELETE `/api/notifications/:id` - Delete notification

**Query Parameters:**

- Use query parameters for filtering
- Support boolean filters as strings ("true"/"false")
- Sort by `createdAt` descending by default

## Authentication Patterns

**API Key Authentication:**

```javascript
// middleware/auth.js
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: "Invalid API key" });
  }
  next();
};
```

**Middleware Usage:**

- Apply authentication to all routes
- Use `apiKeyAuth` middleware for API key validation
- Use `notificationAccess` for access control

## Database Patterns

**Query Patterns:**

```javascript
// Basic query
const results = await Model.find(filter).sort({ createdAt: -1 });

// With filters
const filter = {};
if (req.query.field) filter.field = req.query.field;
if (req.query.boolean) filter.boolean = req.query.boolean === "true";

// Update operations
const result = await Model.findByIdAndUpdate(
  req.params.id,
  req.body,
  { new: true }, // Return updated document
);
```

**Filter Building:**

- Build filter object dynamically from query params
- Use nested object notation for nested fields
- Handle boolean conversion for string inputs

## Error Handling Patterns

**Standard Error Handling:**

```javascript
try {
  // Main logic
} catch (err) {
  return res.status(400).json({
    message: "Error description",
    error: err.message,
  });
}
```

**Validation Errors:**

- Return 400 status for validation errors
- Include error message in response
- Handle missing resources with 404 status

## Notification Schema Patterns

**Notification Structure:**

```javascript
{
  type: String,           // Event type (required, indexed)
  title: String,         // Short title (required)
  message: String,       // Main message (required)
  link: String,          // Action URL (optional)
  recipient: {
    role: String,         // Target role (required)
    userId: ObjectId,     // Specific user (optional)
  },
  source: {
    service: String,      // Originating service (required)
    id: String,           // Entity ID (optional)
  },
  data: Mixed,           // Metadata (flexible)
  read: Boolean,         // Read status (default: false)
  delivered: Boolean,    // Delivery status (default: false)
}
```

## Security Patterns

**API Key Management:**

- Store API keys in environment variables
- Validate API key on all requests
- Use HTTPS in production

**Input Validation:**

- Validate required fields
- Sanitize user inputs
- Handle malformed requests gracefully

## Testing Patterns

**Test Structure:**

```javascript
// tests/notification.test.js
const request = require("supertest");
const app = require("../server");

describe("Notification Controller", () => {
  test("should create notification", async () => {
    const response = await request(app)
      .post("/api/notifications")
      .set("x-api-key", process.env.API_KEY)
      .send(validNotificationData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Notification created");
  });
});
```

## Environment Configuration

**Required Environment Variables:**

```env
PORT=4001
MONGODB_URI=mongodb://localhost:27017/notification_service
API_KEY=your_service_api_key
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Development Workflow

1. **Analyze requirements** and identify affected modules
2. **Implement controller logic** with proper error handling
3. **Add routes** with authentication middleware
4. **Test endpoints** with proper authentication
5. **Update documentation** if needed

## Common Gotchas

- Always check for API key in requests
- Use proper HTTP status codes
- Handle async errors properly in try/catch blocks
- Validate input before processing
- Use proper MongoDB query syntax
- Handle empty results gracefully
- Log errors for debugging

## Tech Stack

**Core Technologies:**

- Node.js, Express.js
- MongoDB with Mongoose ODM
- Environment variables for configuration

**Key Features:**

- RESTful API design
- API key authentication
- Flexible notification schema
- Real-time delivery tracking
