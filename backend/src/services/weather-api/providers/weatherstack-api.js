import { WeatherAPI } from '../baseweatherprovider-api.js';

/**
 * WeatherStack API implementation mirroring the WeatherAPI contract.
 */
export class WeatherStackAPI extends WeatherAPI {
  constructor(options = {}) {
    super({
      baseUrl: options.baseUrl || process.env.WEATHERSTACK_API_URL || 'http://api.weatherstack.com',
      apiKey: options.apiKey || process.env.WEATHERSTACK_API_KEY,
      units: options.units || process.env.WEATHERSTACK_API_UNITS || 'm',
      authParamName: 'access_key'
    });
  }

  async getCurrentWeather(location) {
    const params = buildLocationParams(location);
    params.units = this.units;
    const payload = await this.request('/current', params);
    return normalizeCurrent(payload);
  }
  
  async getWeatherForecast(location, days = 5) {
    const params = buildLocationParams(location);
    params.units = this.units;
    params.forecast_days = days;
    params.forecast = 'yes';
    const payload = await this.request('/forecast', params);
    return normalizeForecast(payload, days);
  }
}

function buildLocationParams(location) {
  if (!location) {
    throw new Error('Location is required');
  }

  if (typeof location === 'object' && location.lat && location.lon) {
    return { query: `${location.lat},${location.lon}` };
  }

  return { query: typeof location === 'string' ? location : JSON.stringify(location) };
}

function normalizeCurrent(data) {
  if (data.error) {
    throw new Error(data.error.info || 'WeatherStack error');
  }

  return {
    location: data.location?.name,
    temperature: data.current?.temperature ?? null,
    condition: data.current?.weather_descriptions?.[0] ?? '',
    humidity: data.current?.humidity ?? null,
    windSpeed: data.current?.wind_speed ?? null,
    timestamp: new Date(data.location?.localtime ?? Date.now()).toISOString()
  };
}

function normalizeForecast(data, days) {
  if (data.error) {
    throw new Error(data.error.info || 'WeatherStack error');
  }

  const forecastEntries = data.forecast || {};
  const forecast = Object.keys(forecastEntries)
    .sort()
    .slice(0, days)
    .map((date) => {
      const entry = forecastEntries[date];
      return {
        date,
        temperature: {
          min: entry.mintemp ?? null,
          max: entry.maxtemp ?? null
        },
        condition: entry.hourly?.[0]?.weather_descriptions?.[0] ?? '',
        precipitation: entry.hourly?.[0]?.precip ?? null
      };
    });

  return {
    location: data.location?.name,
    days,
    forecast,
    generatedAt: new Date().toISOString()
  };
}

