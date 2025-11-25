# Backend
## How to Set this Up to Work Properly
I'm not sure what else to put in this for now (comments quite serve the purpose of explaining code) so I'm just gonna tell you how to get this working

You need an .env file with the following data.
```
# Server Configuration
PORT=
HOST=
NODE_ENV=

# API Configuration
API_PREFIX=/api

WEATHER_API_KEY=
WEATHER_API_URL=
WEATHER_API_UNITS=
```

I have it set up like this (no, I'm NOT telling you my API key)
```
# Server Configuration
PORT=3000
HOST=0.0.0.0
NODE_ENV=development

# API Configuration
API_PREFIX=/api

WEATHER_API_KEY=<insert your OpenWeatherMap API key here, or mod the source code (backend/src/utils/externalApi.util.js) to support a different API>
WEATHER_API_URL=https://api.openweathermap.org/data/2.5
WEATHER_API_UNITS=imperial
```