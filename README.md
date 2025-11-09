# Weather Graphics

A full-stack weather graphics application with backend service and multiple frontend clients.

## Project Structure

```
weather-graphics/
├── backend/                    # Backend API service (Fastify)
│   ├── src/
│   │   ├── api/               # API routes and endpoints
│   │   ├── services/          # Business logic ⭐
│   │   ├── models/            # Data models
│   │   ├── utils/             # Utility functions
│   │   └── middleware/        # Fastify plugins/middleware
│   ├── tests/                  # Backend tests
│   └── config/                # Backend configuration
│
├── frontend/
│   ├── web/                   # Web client (React + Vite)
│   │   ├── src/
│   │   │   ├── components/   # React components
│   │   │   ├── pages/         # Page components
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   ├── utils/         # Utility functions
│   │   │   └── styles/        # CSS/styling files
│   │   └── public/            # Static assets
│   │
│   └── mobile/               # Mobile app (React Native + Expo)
│       ├── src/
│       │   ├── components/   # React Native components
│       │   ├── screens/       # Screen components
│       │   ├── hooks/         # Custom React hooks
│       │   ├── utils/         # Utility functions
│       │   └── styles/        # Styling files
│       └── assets/            # Mobile app assets
│           ├── images/
│           ├── icons/
│           └── fonts/
│
├── shared/                    # Shared code/types between frontend and backend
├── assets/                    # Shared project assets
│   ├── images/
│   ├── icons/
│   └── fonts/
└── docs/                      # Documentation
```

## Getting Started

### Quick Start (Recommended)

**Install all dependencies:**
```bash
npm run install:all
```

**Run everything:**
```bash
# Start backend + web frontend
npm run dev

# Or use the run script
./run.sh          # macOS/Linux
run.bat           # Windows
```

### Individual Services

**Backend:**
```bash
cd backend
npm install
npm run dev
```
Server runs on `http://localhost:3000`

**Web Frontend:**
```bash
cd frontend/web
npm install
npm run dev
```
App runs on `http://localhost:3001`

**Mobile App:**
```bash
cd frontend/mobile
npm install
npm start
```
Use Expo DevTools to run on iOS, macOS, Android, or Web

### Run Scripts

Use the convenient run scripts:

**macOS/Linux:**
```bash
./run.sh          # Start backend + web (default)
./run.sh all      # Start backend + web + mobile
./run.sh backend  # Start backend only
./run.sh web      # Start web only
./run.sh mobile   # Start mobile only
./run.sh install  # Install all dependencies
```

**Windows:**
```bash
run.bat           # Start backend + web (default)
run.bat backend   # Start backend only
run.bat web       # Start web only
run.bat mobile    # Start mobile only
```

## Tech Stack

- **Backend**: Node.js/Fastify
- **Web Frontend**: React + Vite
- **Mobile**: React Native + Expo (iOS, macOS, Android, Web compatible)

## Business Logic

Business logic should be implemented in:
- **`backend/src/services/`** - Main business logic location
- See `backend/BUSINESS_LOGIC_GUIDE.md` for details

