import { WeatherAPI } from '../baseweatherprovider-api.js';

/**
* OpenWeather API implementation that satisfies the WeatherAPI contract.
*/
export class OpenMeteoAPI extends WeatherAPI {
  constructor(options = {}) {
    super(
      options.baseUrl || 'https://api.open-meteo.com/v1',
      options.apiKey || '',
      options.units || this.config.WEATHER_API_UNITS || 'metric'
    )

    this.units = options.units 
    this.apiKey = options.apiKey
    this.baseUrl = options.baseUrl
  }
  
  async getCurrentWeather(location) {
    await this.validateOptions();
    
    const params = {
      [this.authParamName]: this.apiKey,
      units: this.units,
      ...buildLocationParams(location)
    };
    
    const response = await this.request("/weather", params)
    return response; //this.normalizeCurrentWeather(data);
  }

  async getWeatherForecast(location) {
    // TODO: Implement forecast fetching logic
    await this.validateOptions();
    
    const params = {
      [this.authParamName]: this.apiKey,
      units: this.units,
      ...buildLocationParams(location)
    };

    const response = await this.request("/forecast", params);
    
    return response; 
  }
}

function buildLocationParams(location) {
  if (!location) {
    throw new Error('Location is required');
  }
  
  if (typeof location === 'object' && location.lat && location.lon) {
    return { lattitude: location.lat, longitude: location.lon };
  }
  
  if (typeof location === 'string' && /^\d{5}$/.test(location)) {
    return { zip: `${location},us` };
  }
  
  return { q: typeof location === 'string' ? location : JSON.stringify(location) };
}