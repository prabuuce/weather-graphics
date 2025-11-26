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
  
  async getCurrentWeather(location) {
    const params = buildLocationParams(location);
    const payload = await this.request('/weather', params);
    return normalizeCurrentWeather(payload);
  }
  
  async getMinuteForecast(location) {
    // OpenWeather 'onecall' supports minutely data but requires lat/lon.
    // Resolve coordinates if necessary, then request the onecall endpoint
    // asking to exclude everything except minutely.
    const { lat, lon, name } = await resolveCoords.call(this, location);
    const payload = await this.request('/onecall', {
      lat,
      lon,
      exclude: 'current,hourly,daily,alerts'
    });
    return normalizeMinuteForecast(payload, name || `${lat},${lon}`);
  }

  async getHourForecast(location) {
    // Return hourly entries from OpenWeather One Call (default to full hourly array)
    const { lat, lon, name } = await resolveCoords.call(this, location);
    const payload = await this.request('/onecall', {
      lat,
      lon,
      exclude: 'minutely,current,daily,alerts'
    });
    return normalizeHourlyForecast(payload, /* hours */ undefined, name || `${lat},${lon}`);
  }
  
  async getDailyForecast(location) {
    // Daily forecasts are returned by One Call under `daily`.
    const { lat, lon, name } = await resolveCoords.call(this, location);
    const payload = await this.request('/onecall', {
      lat,
      lon,
      exclude: 'minutely,current,hourly,alerts'
    });
    return normalizeDailyForecast(payload, /* days */ undefined, name || `${lat},${lon}`);
  }

  async getWeatherForecast(location, days = 5) {
    // Keep parity with WeatherStack implementation: use 3-hourly /forecast
    // and then normalize by day grouping.
    const params = buildLocationParams(location);
    params.cnt = undefined; // not used for OpenWeather /forecast grouping
    const payload = await this.request('/forecast', params);
    return normalizeForecast(payload, days);
  }
}

/**
 * Resolve latitude/longitude for a given location. If location already
 * contains lat/lon it is returned directly; otherwise we call /weather to
 * resolve coordinates and also return the pretty name.
 */
async function resolveCoords(location) {
  if (!location) throw new Error('Location is required');
  if (typeof location === 'object' && location.lat != null && location.lon != null) {
    return { lat: location.lat, lon: location.lon, name: location.name };
  }

  // For string locations (name or zip) or other forms, call /weather to get coords
  const params = buildLocationParams(location);
  const payload = await this.request('/weather', params);
  return { lat: payload.coord?.lat, lon: payload.coord?.lon, name: payload.name };
}

function normalizeMinuteForecast(data, name) {
  if (!data || !Array.isArray(data.minutely)) {
    return { location: name, minutes: [], generatedAt: new Date().toISOString() };
  }

  const minutes = data.minutely.map((m) => ({
    timestamp: new Date((m.dt ?? 0) * 1000).toISOString(),
    precipitation: m.precipitation ?? null
  }));

  return { location: name, minutes, generatedAt: new Date().toISOString() };
}

function normalizeHourlyForecast(data, hours = 48, name) {
  if (!data || !Array.isArray(data.hourly)) {
    return { location: name, hours: 0, forecast: [], generatedAt: new Date().toISOString() };
  }

  const list = data.hourly.slice(0, hours).map((h) => ({
    timestamp: new Date((h.dt ?? 0) * 1000).toISOString(),
    temperature: h.temp ?? null,
    condition: h.weather?.[0]?.main ?? '',
    precipitation: h.pop != null ? h.pop * 100 : null,
    humidity: h.humidity ?? null,
    windSpeed: h.wind_speed ?? null
  }));

  return { location: name, hours: list.length, forecast: list, generatedAt: new Date().toISOString() };
}

function normalizeDailyForecast(data, days = 7, name) {
  if (!data || !Array.isArray(data.daily)) {
    return { location: name, days, forecast: [], generatedAt: new Date().toISOString() };
  }

  const list = data.daily.slice(0, days).map((d) => ({
    date: new Date((d.dt ?? 0) * 1000).toISOString().slice(0, 10),
    temperature: {
      min: d.temp?.min ?? null,
      max: d.temp?.max ?? null
    },
    condition: d.weather?.[0]?.main ?? '',
    precipitation: d.pop != null ? d.pop * 100 : null,
    humidity: d.humidity ?? null,
    windSpeed: d.wind_speed ?? null
  }));

  return { location: name, days: list.length, forecast: list, generatedAt: new Date().toISOString() };
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
