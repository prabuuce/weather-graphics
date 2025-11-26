import { WeatherAPI } from '../genericapi.model.js';

/**
* OpenWeather API implementation that satisfies the WeatherAPI contract.
*/
export class OpenWeatherAPI extends WeatherAPI {
  constructor(options = {}) {
    super({
      baseUrl: options.baseUrl || process.env.WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5',
      apiKey: options.apiKey || process.env.WEATHER_API_KEY,
      units: options.units || process.env.WEATHER_API_UNITS || 'metric'
    });
  }
  
  async getWeather(location = {}, params = { timeframe: 'current', units: this.units }) {
    const exclude = 'current,minutely,hourly,daily,alerts'.replace(params.timeframe + ',', '');

    // Run validation on arguments
    if (exclude === 'current,minutely,hourly,daily,alerts') {
      throw new Error('Invalid timeframe specified');
    }

    response = await this.request('/onecall', {
      ...buildLocationParams(location),
      exclude,
      units: params.units
    });

    return response;

  }

  async getCurrentWeather(location) {
    this.getWeather(location, { timeframe: 'current', units: this.units });
  }
  
  async getMinutelyWeather(location) {
    this.getWeather(location, { timeframe: 'minutely', units: this.units });
  }

  async getHourlyWeather(location) {
    this.getWeather(location, { timeframe: 'hourly', units: this.units });
  }

  async getDailyWeather(location) {
    this.getWeather(location, { timeframe: 'daily', units: this.units });
  }
}

function buildLocationParams(location) {
  if (!location) {
    throw new Error('Location is required');
  }
  
  if (typeof location === 'object' && location.lat && location.lon) {
    return { lat: location.lat, lon: location.lon };
  }
  
  if (typeof location === 'string' && /^\d{5}$/.test(location)) {
    return { zip: `${location},us` };
  }
  
  return { q: typeof location === 'string' ? location : JSON.stringify(location) };
}

/* 
function normalizeCurrentWeather(data) {
  return {
    location: data.name,
    temperature: data.main?.temp ?? null,
    condition: data.weather?.[0]?.main ?? '',
    humidity: data.main?.humidity ?? null,
    windSpeed: data.wind?.speed ?? null,
    timestamp: new Date((data.dt ?? Date.now() / 1000) * 1000).toISOString()
  };
}

function normalizeForecast(data, days) {
  if (!Array.isArray(data.list)) {
    return {
      location: data.city?.name,
      days,
      forecast: [],
      generatedAt: new Date().toISOString()
    };
  }
  
  const daily = new Map();
  data.list.forEach((entry) => {
    const date = entry.dt_txt?.split(' ')[0];
    if (!date) {
      return;
    }
    if (!daily.has(date)) {
      daily.set(date, {
        date,
        temperature: {
          min: entry.main?.temp_min ?? null,
          max: entry.main?.temp_max ?? null
        },
        condition: entry.weather?.[0]?.main ?? '',
        precipitation: entry.pop != null ? entry.pop * 100 : null
      });
      return;
    }
    const existing = daily.get(date);
    existing.temperature.min = Math.min(existing.temperature.min ?? Infinity, entry.main?.temp_min ?? Infinity);
    existing.temperature.max = Math.max(existing.temperature.max ?? -Infinity, entry.main?.temp_max ?? -Infinity);
  });
  
  const forecast = Array.from(daily.values()).slice(0, days);
  return {
    location: data.city?.name,
    days,
    forecast,
    generatedAt: new Date().toISOString()
  };
}
*/