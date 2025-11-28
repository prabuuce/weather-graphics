import fetch from 'node-fetch';
import { json } from 'stream/consumers';
import fs from 'fs';

/**
 * Base class describing the contract for any weather API client.
 * Child classes must override the virtual methods to supply vendor-specific
 * network calls and data normalization.
 */
export class WeatherAPI {
  constructor( baseUrl, apiKey, units = 'metric', authParamName = 'appid') {

    this.config = JSON.parse(fs.readFileSync(`${process.cwd()}/../config/config.json`, 'utf-8'));
    this.keys = JSON.parse(fs.readFileSync(`${process.cwd()}/../config/keys.json`, 'utf-8'));

    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.apiKey = apiKey;
    this.units = units;
    this.authParamName = authParamName;
  }

  async validateOptions(baseUrl = this.baseUrl, apiKey = this.apiKey) {
    if (!baseUrl) {
      throw new Error('WeatherAPI requires a baseUrl');
    }
    if (!apiKey) {
      throw new Error('WeatherAPI requires an apiKey');
    }
  }

  /**
   * "Virtual" method that should be overridden by subclasses
   * to retrieve current conditions for a location.
   */
  // eslint-disable-next-line class-methods-use-this
  async getCurrentWeather(/* location */) {
    throw new Error('getCurrentWeather must be implemented by subclasses');
  }

  /**
   * "Virtual" method that should be overridden by subclasses
   * to retrieve weather forecast for a location.
   */

  // eslint-disable-next-line class-methods-use-this
  async getMinutelyForecast(/* location, days */) {
    throw new Error('getMinutelyForecast must be implemented by subclasses');
  }

  // eslint-disable-next-line class-methods-use-this
  async getHourlyForecast(/* location, days */) {
    throw new Error('getHourlyForecast must be implemented by subclasses');
  }

  // eslint-disable-next-line class-methods-use-this
  async getDailyForecast(/* location, days */) {
    throw new Error('getDailyForecast must be implemented by subclasses');
  }

  /**
   * Helper that performs the HTTP request with shared auth/query params.
   * Subclasses can call this to avoid duplicating fetch logic.
   * @param {string} path
   * @param {Record<string, string|number>} params
   * @returns {Promise<any>}
   */
  async request(path, params = {}) {
    const url = new URL(`${this.baseUrl}${path}`);
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
}
