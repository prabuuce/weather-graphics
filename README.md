# Weather Graphics
A weather graphics application with backend service and multiple frontend clients.

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


