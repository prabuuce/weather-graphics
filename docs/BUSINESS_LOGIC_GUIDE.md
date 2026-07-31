# Business Logic Guide

This guide shows you where to add and modify business logic in the Weather Graphics backend.

## Architecture Overview

The backend follows a **layered architecture** pattern:

```
┌─────────────────────────────────────┐
│         API Routes (Thin Layer)     │  ← HTTP request/response handling
│    backend/src/api/*.routes.js      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Services (Business Logic)     │  ← ⭐ ADD YOUR LOGIC HERE
│   backend/src/services/*.service.js  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   Models & External APIs         │  ← Data structures & API calls
│   backend/src/models/*.model.js      │
│   backend/src/utils/*.js             │
└─────────────────────────────────────┘
```

## Where to Add Business Logic

### 🎯 Primary Location: `backend/src/services/`

**This is where 90% of your business logic should go.**

Example file: `backend/src/services/weather.service.js`

```javascript
// ✅ DO: Add business logic here
export async function GetCurrentWeatherData(location) {
  // 1. Validate input
  // 2. Check cache
  // 3. Call external API
  // 4. Transform data
  // 5. Apply business rules
  // 6. Return result
}
```

## Summary

- **Routes** (`api/`) = HTTP layer (thin)
- **Services** (`services/`) = Business logic (thick) ⭐ **MAIN LOCATION**
- **Models** (`models/`) = Data structures
- **Utils** (`utils/`) = Reusable utilities

**When in doubt, add it to the services layer!**

