# Project Structure

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