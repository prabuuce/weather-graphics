import fetch from 'node-fetch';
import { json } from 'stream/consumers';
import fs from 'fs';

/**
 * Base class describing the contract for any weather API client.
 * Child classes must override the virtual methods to supply vendor-specific
 * network calls and data normalization.
 */
export class WeatherAPI {
  constructor(baseUrl, apiKey, units = 'metric', authParamName = '', mapping) {

    this.config = JSON.parse(fs.readFileSync(`${process.cwd()}/../config/config.json`, 'utf-8'));
    this.keys = JSON.parse(fs.readFileSync(`${process.cwd()}/../config/keys.json`, 'utf-8'));

    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.apiKey = apiKey;
    this.units = units;
    this.authParamName = authParamName;

    /* this.mapping is a dictionary that maps the JSON object returned from a weather API to a format universal to our program
       ex. { "temp": "main.temp", "windSpeed": "wind_speed" } */
    this.mapping = mapping
  }

  async validateOptions(baseUrl = this.baseUrl, apiKey = this.apiKey, mapping = this.mapping) {
    if (!baseUrl) {
      throw new Error('WeatherAPI requires a baseUrl');
    }
    if (!apiKey) {
      throw new Error('WeatherAPI requires an apiKey');
    }
  }

  /* Virtual Methods */

  // eslint-disable-next-line class-methods-use-this
  async GetCurrentWeatherData(/* location */) {
    throw new Error('GetCurrentWeatherData must be implemented by subclasses');
  }

  // eslint-disable-next-line class-methods-use-this
  async GetCurrentTempVal(/* location */) {
    throw new Error('GetCurrentTempVal must be implemented by subclasses');
  }

  // eslint-disable-next-line class-methods-use-this
  async GetCurrentWindVal(/* location */) {
    throw new Error('GetCurrentWindVal must be implemented by subclasses');
  }

  async GetCurrentDateLoc(/* location */) {
    throw new Error('GetCurrentDateLoc must be implemented by subclasses')
  }

  // eslint-disable-next-line class-methods-use-this
  async GetForecastWeatherData(/* location, days */) {
    throw new Error('GetForecastWeatherData must be implemented by subclasses');
  }

  // eslint-disable-next-line class-methods-use-this
  async GetForecastTempVal(/* location, days */) {
     throw new Error('GetForecastTempVal must be implemented by subclasses');
  }

  // eslint-disable-next-line class-methods-use-this
  async GetForecastTempRange(/* location, days */) {
     throw new Error('GetForecastTempRange must be implemented by subclasses');
  }

  // eslint-disable-next-line class-methods-use-this
  async GetForecastWindVal(/* location, days */) {
    throw new Error('GetForecastWindVal must be implemented by subclasses');
  }
  /**
   * Helper that performs the HTTP request with shared auth/query params.
   * Subclasses can call this to avoid duplicating fetch logic.
   * @param {string} path
   * @param {Record<string, string|number>} params
   * @returns {Promise<any>}
   */
  async request(baseUrl = this.baseUrl, path, params = {}) {
    console.log("Running this.request()")

    const url = new URL(`${baseUrl}${path}`);
    url.searchParams.set(this.authParamName, this.apiKey);
    url.searchParams.set('units', this.units);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    });

    console.log(`Requesting URL: ${url.toString()}`);

    const response = await fetch(url.toString());
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Weather API error (${response.status}): ${body}`);
    }

    return response.json();
  }

  async format(json, mapping = this.mapping) {
    for (let i = 0; i < mapping.length; i++){
      mapKey = mapping[i];
      mapping[i] = json[mapKey]
    }

    return mapping
  }

  async getAPIEndpoint(location, url) {
    await this.validateOptions();
    
    const params = {
      [this.authParamName]: this.apiKey,
      units: this.units,
      ...buildLocationParams(location)
    };
    
    const response = await this.request(url, params)
    return response; 
  }
}
