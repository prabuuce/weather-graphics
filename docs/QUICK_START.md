# Quick Start Guide

## Prerequisites

- Node.js (v16 or later)
- npm (comes with Node.js)

## Step-by-Step Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Install Web Frontend Dependencies

```bash
cd ../frontend/web
npm install
```

### 3. Install Mobile App Dependencies

```bash
cd ../mobile
npm install
```

## Running the Application

### Option 1: Run Everything (Recommended)

Open **3 separate terminal windows/tabs**:

#### Terminal 1 - Backend
```bash
cd weather-graphics/backend
npm run dev
```
Backend will run on: `http://localhost:3000`

#### Terminal 2 - Web Frontend
```bash
cd weather-graphics/frontend/web
npm run dev
```
Web app will run on: `http://localhost:3001`

#### Terminal 3 - Mobile App (Optional)
```bash
cd weather-graphics/frontend/mobile
npm start
```
Then press:
- `i` for iOS simulator
- `m` for macOS app
- `a` for Android emulator
- `w` for web browser

### Option 2: Run Backend Only

```bash
cd weather-graphics/backend
npm run dev
```

Test it: Open `http://localhost:3000/health` in your browser

### Option 3: Run Web Frontend Only

```bash
cd weather-graphics/frontend/web
npm run dev
```

Note: Web frontend needs backend running to work properly.

## Verify Everything Works

1. **Backend Health Check:**
   - Open: `http://localhost:3000/health`
   - Should see: `{"status":"ok","timestamp":"...","uptime":...}`

2. **Backend API:**
   - Open: `http://localhost:3000/api`
   - Should see API information

3. **Web App:**
   - Open: `http://localhost:3001`
   - Should show "Weather Graphics" with backend connection status

## Troubleshooting

### Backend won't start
- Check if port 3000 is already in use
- Make sure you're in the `backend` directory
- Run `npm install` if you haven't

### Web app can't connect to backend
- Make sure backend is running on port 3000
- Check browser console for errors
- Verify proxy settings in `vite.config.js`

### Mobile app issues
- Make sure you have Expo CLI installed: `npm install -g expo-cli`
- For physical device: Update API URL in `App.js` to use your computer's IP address

## Development Commands

### Backend
- `npm run dev` - Start with auto-reload (nodemon)
- `npm start` - Start production mode
- `npm test` - Run tests

### Web Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Mobile
- `npm start` - Start Expo dev server
- `npm run ios` - Open iOS simulator
- `npm run android` - Open Android emulator
- `npm run web` - Open in web browser

