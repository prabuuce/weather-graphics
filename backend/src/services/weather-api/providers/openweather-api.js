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
      
      const response = await this.request("/weather", params)
      return response;
  }

  async GetCurrentTempVal(location) {
    const data = await this.GetCurrentWeatherData(location);
    const temperature = data.main.temp
    return temperature ?? null;
  }

  async GetCurrentWindVal(location) {
    const data = await this.GetCurrentWeatherData(location);
    const wind = data.wind
    return wind ?? null;
  }


  /////////////////////////////////////////////////////////////

  async GetForecastWeatherData(location) {
    await this.validateOptions();
    const params = {
      [this.authParamName]: this.apiKey,
      units: this.units,
      ...buildLocationParams(location)
    };
    
    const response = await this.request("/forecast", params)
    return response;
  }

  async GetForecastTempValue(location) {
    const data = await this.GetForecastWeatherData(location);
    const temperatures = {};

    for (const timestamp of data.list) {
      temperatures[timestamp.dt_txt] = timestamp.main.temp;
    }  
    return temperatures ?? null;
  }

  async GetForecastTempRange(location) {
    const data = await this.GetForecastWeatherData(location);
    const ranges = {};

    for (const timestamp of data.list) {
      ranges[timestamp.dt_txt] = [timestamp.main.temp_min, timestamp.main.temp_max];
    }  

    return ranges ?? null;
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
