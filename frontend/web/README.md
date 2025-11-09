# Weather Graphics Web Client

React web application for Weather Graphics, built with Vite.

## Features

- ⚡ Vite - Fast build tool and dev server
- ⚛️ React 18 - Modern React with hooks
- 🎨 Modern CSS - Clean and responsive design
- 🔄 Hot Module Replacement - Instant updates during development
- 📦 Optimized Build - Production-ready builds

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3001`

The dev server is configured to proxy API requests to the backend at `http://localhost:3000`

### Build

Create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
frontend/web/
├── src/
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── styles/        # CSS/styling files
│   ├── App.jsx        # Main App component
│   ├── main.jsx       # Application entry point
│   └── index.css      # Global styles
├── public/            # Static assets
├── index.html         # HTML template
├── vite.config.js     # Vite configuration
└── package.json       # Dependencies
```

## API Integration

The app is configured to proxy API requests to the backend. Make API calls using relative paths:

```javascript
fetch('/api/weather/location')
```

This will automatically proxy to `http://localhost:3000/api/weather/location`

