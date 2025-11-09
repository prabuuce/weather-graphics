# Weather Graphics

A full-stack weather graphics application with backend service and multiple frontend clients.

## Project Structure

```
weather-graphics/
├── backend/          # Backend API service
│   ├── src/
│   │   ├── api/      # API routes and endpoints
│   │   ├── services/ # Business logic services
│   │   ├── models/   # Data models
│   │   ├── utils/    # Utility functions
│   │   └── middleware/ # Fastify plugins/middleware
│   ├── tests/        # Backend tests
│   └── config/       # Backend configuration
├── frontend/
│   ├── web/          # Web client (React)
│   │   ├── src/
│   │   │   ├── components/ # React components
│   │   │   ├── pages/      # Page components
│   │   │   ├── hooks/      # Custom React hooks
│   │   │   ├── utils/      # Utility functions
│   │   │   └── styles/     # CSS/styling files
│   │   └── public/         # Static assets
│   └── mobile/       # Mobile app (React Native)
│       ├── src/
│       │   ├── components/ # React Native components
│       │   ├── screens/    # Screen components
│       │   ├── hooks/      # Custom React hooks
│       │   ├── utils/      # Utility functions
│       │   └── styles/        # Styling files
│       └── assets/          # Mobile app assets
├── shared/           # Shared code/types between frontend and backend
├── assets/           # Shared project assets
├── docs/             # Documentation
└── config/           # Global configuration
```

## Getting Started

### Backend
```bash
cd backend
npm install
npm start
```

### Web Frontend
```bash
cd frontend/web
npm install
npm run dev
```

The web app will be available at `http://localhost:3001`

### Mobile App
```bash
cd frontend/mobile
npm install
npm start
```

This will start the Expo development server. You can then:
- Press `i` for iOS simulator
- Press `m` for macOS app
- Press `a` for Android emulator
- Press `w` for web browser
- Scan QR code with Expo Go app on your device

## Tech Stack

- **Backend**: Node.js/Fastify
- **Web Frontend**: React + Vite
- **Mobile**: React Native + Expo (iOS, macOS, Android, Web compatible)

