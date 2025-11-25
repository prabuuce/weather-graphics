import { OpenWeatherAPI } from './openWeatherAPI.js';
import { WeatherStackAPI } from './weatherStackAPI.js';

let cachedClient;
let cachedProvider;

function createClient(provider) {
  switch (provider) {
    case 'openweather':
      return new OpenWeatherAPI();
    case 'weatherstack':
      return new WeatherStackAPI();
    default:
      throw new Error(`Unsupported weather provider: ${provider}`);
  }
}

export function getWeatherClient(provider) {
  const desiredProvider = (provider || process.env.WEATHER_PROVIDER || 'openweather').toLowerCase();
  if (!cachedClient || cachedProvider !== desiredProvider) {
    cachedClient = createClient(desiredProvider);
    cachedProvider = desiredProvider;
  }
  return cachedClient;
}

