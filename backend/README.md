# Backend
## How to Set this Up to Work Properly
I'm not sure what else to put in this for now (comments quite serve the purpose of explaining code) so I'm just gonna tell you how to get this working

You need an config folder with the following data.
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

## Example: using the OpenWeather client helpers

If you'd like to fetch minute/hourly/daily forecasts directly from the OpenWeather provider you can use the new helper methods available on the client:

```js
import { OpenWeatherAPI } from './src/services/weatherApi/apis/openweather.api.js';

const client = new OpenWeatherAPI({ apiKey: process.env.WEATHER_API_KEY });

// minute-level forecasts (requires lat/lon or a location name that can be resolved)
const minutes = await client.getMinuteForecast({ lat: 40.73, lon: -73.93 });

// hourly forecast (up to 48 entries)
const hours = await client.getHourForecast('New York');

// daily forecast (up to 7 entries from One Call)
const days = await client.getDailyForecast('90210');
```

Note: calling these methods requires an OpenWeather API key with OneCall access.