# Weather Graphics Mobile App

React Native mobile application for Weather Graphics, built with Expo. Supports iOS, macOS, Android, and Web.

## Features

- 📱 **Cross-Platform** - iOS, macOS, Android, and Web
- ⚡ **Expo** - Fast development and easy deployment
- ⚛️ **React Native** - Native performance with React
- 🔄 **Hot Reload** - Instant updates during development
- 🎨 **Modern UI** - Clean and responsive design

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- For iOS development: Xcode (macOS only)
- For Android development: Android Studio
- Expo Go app on your device (for testing)

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the Expo development server:

```bash
npm start
```

This will open the Expo DevTools. You can then:

- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Press `m` to open macOS app
- Press `w` to open web browser
- Scan the QR code with Expo Go app on your device

### Platform-Specific Commands

```bash
# iOS
npm run ios

# macOS
npm run macos

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
frontend/mobile/
├── src/
│   ├── components/    # React Native components
│   ├── screens/       # Screen components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   └── styles/        # Styling files
├── assets/            # Images, icons, fonts
│   ├── images/
│   ├── icons/
│   └── fonts/
├── App.js             # Main App component
├── app.json           # Expo configuration
└── package.json       # Dependencies
```

## API Configuration

The app is configured to connect to the backend API. Update the `API_BASE_URL` in `App.js`:

- **Development**: `http://localhost:3000` (for iOS simulator/Android emulator)
- **Physical Device**: Use your computer's local IP address (e.g., `http://192.168.1.100:3000`)
- **Production**: Update with your production API URL

### Finding Your Local IP

On macOS/Linux:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

On Windows:
```bash
ipconfig
```

## Building for Production

### iOS

```bash
expo build:ios
```

### Android

```bash
expo build:android
```

### macOS

```bash
expo build:macos
```

## Notes

- For physical device testing, make sure your device and computer are on the same network
- iOS simulator can use `localhost`, but physical iOS devices need the local IP address
- Android emulator can use `10.0.2.2` instead of `localhost`

