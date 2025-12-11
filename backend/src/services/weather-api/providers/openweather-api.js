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
  
  async getCurrentTemperature(location) {
      
    const data = await this.getCurrentWeatherData(location);
    const temperature = data.main.temp
    return temperature ?? null;
  }

  async getCurrentWind(location) {
      
    const data = await this.getCurrentWeatherData(location);
    const wind = data.wind
    return wind ?? null;
  }

  async getCurrentWeather(location) {
    const data = await this.getCurrentWeatherData(location);
    return data;
  }

  /////////////////////////////////////////////////////////////

  async getForecastWeather(location) {
    const data = await this.getForecastWeatherData(location);
    return data;
  }

  // Wrapper functions corresponding to the REST API Endpoints
  async getCurrentWeatherData(location) {  
      await this.validateOptions();  
      const params = {
        [this.authParamName]: this.apiKey,
        units: this.units,
        ...buildLocationParams(location)
      };
      
      const response = await this.request("/weather", params)
      return response;
  }

  async getForecastWeatherData(location) {
    await this.validateOptions();
    const params = {
      [this.authParamName]: this.apiKey,
      units: this.units,
      ...buildLocationParams(location)
    };
    
    const response = await this.request("/forecast", params)
    return response;
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
