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
│      Services (Business Logic)       │  ← ⭐ ADD YOUR LOGIC HERE
│   backend/src/services/*.service.js  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   Models & External APIs             │  ← Data structures & API calls
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
export async function getCurrentWeather(location) {
  // 1. Validate input
  // 2. Check cache
  // 3. Call external API
  // 4. Transform data
  // 5. Apply business rules
  // 6. Return result
}
```

### 📋 Secondary Locations:

1. **Models** (`backend/src/models/`) - Data structures and transformations
2. **Utils** (`backend/src/utils/`) - Reusable utility functions
3. **Middleware** (`backend/src/middleware/`) - Request/response processing

## Current Structure

```
backend/src/
├── api/                    # Routes (HTTP layer)
│   ├── routes.js          # Route registration
│   └── weather.routes.js  # Weather endpoints
│
├── services/              # ⭐ BUSINESS LOGIC HERE
│   └── weather.service.js # Weather business logic
│
├── models/                # Data models
│   └── weather.model.js   # Weather data structures
│
├── utils/                 # Utilities
│   └── cache.js           # Caching utilities
│
└── middleware/            # Fastify plugins
```

## Example: Adding Weather API Integration

### Step 1: Add business logic in service

Edit `backend/src/services/weather.service.js`:

```javascript
import axios from 'axios';
import { getCache, setCache } from '../utils/cache.js';

export async function getCurrentWeather(location) {
  // 1. Check cache first
  const cacheKey = `weather:${location}`;
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }
  
  // 2. Validate location
  if (!validateLocation(location)) {
    throw new Error('Invalid location');
  }
  
  // 3. Call external API (e.g., OpenWeatherMap)
  const apiKey = process.env.WEATHER_API_KEY;
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
  );
  
  // 4. Transform data to your format
  const weatherData = {
    location: response.data.name,
    temperature: response.data.main.temp - 273.15, // Convert Kelvin to Celsius
    condition: response.data.weather[0].main,
    humidity: response.data.main.humidity,
    windSpeed: response.data.wind.speed,
    timestamp: new Date().toISOString()
  };
  
  // 5. Cache the result
  setCache(cacheKey, weatherData);
  
  // 6. Return formatted data
  return weatherData;
}
```

### Step 2: Routes stay thin

The route file (`weather.routes.js`) should remain thin and just call the service:

```javascript
// Route handles HTTP, service handles business logic
const weatherData = await getCurrentWeather(location);
return reply.code(200).send(weatherData);
```

## Best Practices

### ✅ DO:

- **Keep routes thin** - Routes should only handle HTTP concerns (request/response)
- **Put business logic in services** - All calculations, API calls, data processing
- **Use models for data structures** - Define schemas and transformations
- **Use utils for reusable code** - Caching, validation, formatting
- **Handle errors in services** - Throw meaningful errors, let routes handle HTTP codes

### ❌ DON'T:

- **Don't put business logic in routes** - Routes should delegate to services
- **Don't mix concerns** - Keep HTTP, business logic, and data access separate
- **Don't duplicate logic** - Extract common functionality to utils
- **Don't hardcode values** - Use environment variables and configuration

## Adding New Features

### Example: Add a new "Historical Weather" feature

1. **Add service method** (`services/weather.service.js`):
   ```javascript
   export async function getHistoricalWeather(location, date) {
     // Your business logic here
   }
   ```

2. **Add route** (`api/weather.routes.js`):
   ```javascript
   fastify.get('/history/:location', async (request, reply) => {
     const { location } = request.params;
     const { date } = request.query;
     const data = await getHistoricalWeather(location, date);
     return reply.send(data);
   });
   ```

3. **Update models if needed** (`models/weather.model.js`):
   ```javascript
   export const HistoricalWeatherSchema = { ... };
   ```

## Summary

- **Routes** (`api/`) = HTTP layer (thin)
- **Services** (`services/`) = Business logic (thick) ⭐ **MAIN LOCATION**
- **Models** (`models/`) = Data structures
- **Utils** (`utils/`) = Reusable utilities

**When in doubt, add it to the services layer!**

