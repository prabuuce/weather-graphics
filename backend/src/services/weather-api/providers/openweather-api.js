import { WeatherAPI } from '../baseweatherprovider-api.js';

/**
* OpenWeather API implementation that satisfies the WeatherAPI contract.
*/
export class OpenWeatherAPI extends WeatherAPI {
  constructor(options = {}) {
    super(
      options.baseUrl || 'https://api.openweathermap.org/data/2.5',
      options.apiKey || '',
      options.units || 'metric',
      'appid'
    )

    this.units = options.units || this.config.WEATHER_API_UNITS || 'metric';
    this.apiKey = options.apiKey || this.keys.OPENWEATHER_API_KEY;
    this.baseUrl = options.baseUrl || 'https://api.openweathermap.org/data/2.5';
  }
  
  async getCurrentWeather(location) {
    await this.validateOptions();
    
    const params = {
      [this.authParamName]: this.apiKey,
      units: this.units,
      ...buildLocationParams(location)
    };
    
    const response = await this.request("/current", params)

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`OpenWeatherAPI getCurrentWeather error: ${response.status} ${response.statusText} - ${body}`);
    }
    
    const data = await response.json();
    return data; //this.normalizeCurrentWeather(data);
  }

  async getHourlyForecast(location, days = 5) {
    // TODO: Implement forecast fetching logic
    await this.validateOptions();
    
    const params = {
      [this.authParamName]: this.apiKey,
      units: this.units,
      ...buildLocationParams(location)
    };

    const response = await this.request("/forecast", params);

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`OpenWeatherAPI getCurrentWeather error: ${response.status} ${response.statusText} - ${body}`);
    }
    
    const data = await response.json();
    return data; 
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