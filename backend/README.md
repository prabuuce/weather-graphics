# Weather Graphics Backend

Fastify-based backend service for the Weather Graphics application.

## Features

- ⚡ Fastify - Fast and low overhead web framework
- 🔒 Security - Helmet for security headers
- 🌐 CORS - Cross-origin resource sharing support
- 🚦 Rate Limiting - Protect API from abuse
- 📝 Environment Variables - Secure configuration management
- 🏥 Health Check - Server health monitoring endpoint

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `API_PREFIX` - API route prefix (default: /api)
- Add your weather API keys when ready

### Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT).

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Weather API
- `GET /api/weather` - Weather API information
- `GET /api/weather/:location` - Get weather for a location
- `GET /api/weather/forecast/:location?days=5` - Get weather forecast

## Project Structure

```
backend/
├── src/
│   ├── api/              # API routes
│   │   ├── routes.js     # Route registration
│   │   └── weather.routes.js  # Weather endpoints
│   ├── services/         # Business logic
│   ├── models/           # Data models
│   ├── utils/            # Utility functions
│   ├── middleware/       # Fastify plugins/middleware
│   └── index.js          # Server entry point
├── config/               # Configuration files
├── tests/                # Test files
├── .env                  # Environment variables (not in git)
├── .env.example          # Environment variables template
└── package.json          # Dependencies
```

## Development

The server uses ES modules. Make sure your Node.js version supports ES modules (Node 14+).

For development, nodemon is configured to watch for changes and automatically restart the server.

## Testing

```bash
npm test
```

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Configure proper CORS origins
3. Set up proper rate limiting thresholds
4. Use a process manager like PM2
5. Set up reverse proxy (nginx) if needed


