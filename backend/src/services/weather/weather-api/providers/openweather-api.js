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
  
  // Wrapper functions corresponding to the REST API Endpoints
  async GetCurrentWeatherData(location) {  
      await this.validateOptions();  
      const params = {
        [this.authParamName]: this.apiKey,
        units: this.units,
        ...buildLocationParams(location)
      };
      
      const response = await this.request(undefined, "/weather", params)
      return response;
  }


  /////////////////////////////////////////////////////////////

  async GetForecastWeatherData(location) {
    await this.validateOptions();
    const params = {
      [this.authParamName]: this.apiKey,
      units: this.units,
      ...buildLocationParams(location)
    };
    
    const response = await this.request(undefined, "/forecast", params)
    return response;
  }
  /////////////////////////////////////////////////

  async GetWeatherMap(location, date, zoom, data) {
    await this.validateOptions();
    const params = {
      data,
      zoom,
      x, 
      x,
      [this.authParamName]: this.apiKey,
      date,
      ...buildLocationParams(location)
    };
    
    const response = await this.request("https://maps.openweathermap.org/maps/2.0/weather/", "/1h", params)
    return response;
  }
}

// Helper Functions

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
