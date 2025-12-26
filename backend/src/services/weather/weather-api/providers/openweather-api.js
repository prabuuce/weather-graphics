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

  async GetCurrentDateLoc(location) {
    const data = await this.GetCurrentWeatherData(location);
    const name = data.name
    const time = data.dt
    return [name, new Date(time * 1000).toLocaleDateString()] ?? null;
  }

  async GetCurrentHumidity(location) {
    const data = await this.GetCurrentWeatherData(location);
    const humidity = data.main.humidity;
    return humidity ?? null;
  }

  async GetCurrentFeelsLike(location) {
    const data = await this.GetCurrentWeatherData(location);
    const feelsLike = data.main.feels_like;
    return feelsLike ?? null;
  }

  async GetCurrentTempRange(location) {
    const data = await this.GetCurrentWeatherData(location);
    const min = data.main.temp_min;
    const max = data.main.temp_max;
    return [min, max] ?? null;
  }

  async GetCurrentWeatherType(location) {
    const data = await this.GetCurrentWeatherData(location);
    const main = data.weather[0].main;
    const desc = data.weather[0].description;
    const id = data.weather[0].id;
    return [main, desc, id] ?? null;
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

  async GetForecastTempValue(location) {
    const data = await this.GetForecastWeatherData(location);
    const temperatures = {};

    for (const timestamp of data.list) {
      temperatures[timestamp.dt_txt] = timestamp.main.temp;
    }  
    return temperatures ?? null;
  }

  async GetForecastFeelsLike(location) {
    const data = await this.GetForecastWeatherData(location);
    const feelsLike = {};

    for (const timestamp of data.list) {
      feelsLike[timestamp.dt_txt] = timestamp.main.feels_like;
    }  
    return feelsLike ?? null;
  }

  async GetForecastHumidity(location) {
    const data = await this.GetForecastWeatherData(location);
    const humidity = {};

    for (const timestamp of data.list) {
      humidity[timestamp.dt_txt] = timestamp.main.humidity;
    }  
    return humidity ?? null;
  }

  async GetForecastTempRange(location) {
    const data = await this.GetForecastWeatherData(location);
    const ranges = {};

    for (const timestamp of data.list) {
      ranges[timestamp.dt_txt] = [timestamp.main.temp_min, timestamp.main.temp_max];
    }  

    return ranges ?? null;
  }

  async GetForecastWindVal(location) {
    const data = await this.GetForecastWeatherData(location);
    const winds = {};

    for (const val of data.list) {
      winds[val.dt_txt] = Object.values(val["wind"]);
    }

    return winds ?? null
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
