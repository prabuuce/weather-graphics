/**
 * Weather Service
 */

import { setCache, getCache } from '../../utils/cache.util.js';
import { getWeatherClient } from './weather-api/factory.service.js';

const weatherClient = getWeatherClient("openweather");

/**
 * Get current all weather data for a location
 * @param {string} location - Location name or coordinates
 * @returns {Promise<Object>} Weather data
 */
async function GetCurrentWeatherData(location) {
  try {
    const apiResponse = await weatherClient.GetCurrentWeatherData(location);
    return apiResponse;
  } catch (error) {
    if (error.message == 'Weather API error (404): {"cod":"404","message":"city not found"}' || error.message == 'Location is required') {
      return "Invalid location"
    }

    return {
      error: 'Failed to fetch weather data',
      message: error.message
    };
  }
}


/**
 * Get Forecast weather data for a location
 * @param {*} location 
 * @returns 
 */

async function GetForecastWeatherData(location) {

  try {
    const apiResponse = await weatherClient.GetForecastWeatherData(location);
    return apiResponse;
  } catch (error) {
    if (error.message == 'Weather API error (404): {"cod":"404","message":"city not found"}' || error.message == 'Location is required') {
      return "Invalid location"
    }

    return {
      error: 'Failed to fetch weather data',
      message: error.message
    };
  }
}


export { GetCurrentWeatherData, GetForecastWeatherData };
