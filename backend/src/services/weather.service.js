/**
 * Weather Service
 */

import { setCache, getCache } from '../utils/cache.util.js';
import { getWeatherClient } from './weather-api/factory.service.js';

const weatherClient = getWeatherClient("openweather");

/**
 * Get current all weather data for a location
 * @param {string} location - Location name or coordinates
 * @returns {Promise<Object>} Weather data
 */
async function GetCurrentWeatherData(location) {
  if (!validateLocation(location)) {
    return {
      error: 'Invalid location',
      message: 'Location must be a valid string'
    };
  }

  try {
    const apiResponse = await weatherClient.GetCurrentWeatherData(location);
    return apiResponse;
  } catch (error) {
    return {
      error: 'Failed to fetch weather data',
      message: error.message
    };
  }
}

/**
 * Get current wind data for a location
 * @param {string} location - Location name or coordinates
 * @returns {Promise<Object>} Temperature data
 */
async function GetCurrentWindVal(location) {
  if (!validateLocation(location)) {
    return {
      error: 'Invalid location',
      message: 'Location must be a valid string'
    };
  }

  try {
    const apiResponse = await weatherClient.GetCurrentWindVal(location);
    return apiResponse;
  } catch (error) {
    return {
      error: 'Failed to fetch weather data',
      message: error.message
    };
  }
}

/**
 * Get current temperature for a location
 * @param {string} location - Location name or coordinates
 * @returns {Promise<Object>} Temperature data
 */
async function GetCurrentTempVal(location) {
  if (!validateLocation(location)) {
    return {
      error: 'Invalid location',
      message: location + ' must be a valid string'
    };
  }

  try {
    const apiResponse = await weatherClient.GetCurrentTempVal(location);
    return apiResponse;
  } catch (error) {
    return {
      error: 'Failed to fetch weather data',
      message: error.message
    };
  }
}

/**
 * Get current date for a location
 * @param {string} location - Location name or coordinates
 * @returns {Promise<Object>} Date data
 */
async function GetCurrentDateLoc(location) {
  if (!validateLocation(location)) {
    return {
      error: 'Invalid location',
      message: 'Location must be a valid string'
    };
  }

  try {
    const apiResponse = await weatherClient.GetCurrentDateLoc(location);
    return apiResponse;
  } catch (error) {
    return {
      error: 'Failed to fetch weather data',
      message: error.message
    };
  }
}

/**
 * Get current humidity for a location
 * @param {string} location - Location name or coordinates
 * @returns {Promise<Object>} Humidity data
 */
async function GetCurrentHumidity(location) {
  if (!validateLocation(location)) {
    return {
      error: 'Invalid location',
      message: 'Location must be a valid string'
    };
  }

  try {
    const apiResponse = await weatherClient.GetCurrentHumidity(location);
    return apiResponse;
  } catch (error) {
    return {
      error: 'Failed to fetch weather data',
      message: error.message
    };
  }
}

/**
 * Get current feels like temperature for a location
 * @param {string} location - Location name or coordinates
 * @returns {Promise<Object>} Feels like temperature data
 */
async function GetCurrentFeelsLike(location) {
  if (!validateLocation(location)) {
    return {
      error: 'Invalid location',
      message: 'Location must be a valid string'
    };
  }

  try {
    const apiResponse = await weatherClient.GetCurrentFeelsLike(location);
    return apiResponse;
  } catch (error) {
    return {
      error: 'Failed to fetch weather data',
      message: error.message
    };
  }
}

/**
 * Get current temperature range for a location
 * @param {string} location - Location name or coordinates
 * @returns {Promise<Object>} Temperature range data [min, max]
 */
async function GetCurrentTempRange(location) {
  if (!validateLocation(location)) {
    return {
      error: 'Invalid location',
      message: 'Location must be a valid string'
    };
  }

  try {
    const apiResponse = await weatherClient.GetCurrentTempRange(location);
    return apiResponse;
  } catch (error) {
    return {
      error: 'Failed to fetch weather data',
      message: error.message
    };
  }
}



/////////////////////////////////////////////////////////
/**
 * Get Forecast weather data for a location
 * @param {*} location 
 * @returns 
 */

async function GetForecastWeatherData(location) {
  if (!validateLocation(location)) {
    return {
      error: 'Invalid location',
      message: 'Location must be a valid string'
    };
  }

  try {
    const apiResponse = await weatherClient.GetForecastWeatherData(location);
    return apiResponse;
  } catch (error) {
    return {
      error: 'Failed to fetch weather data',
      message: error.message
    };
  }
}

async function GetForecastTempVal(location) {
  if (!validateLocation(location)) {
    return {
      error: 'Invalid location',
      message: 'Location must be a valid string'
    };
  }

  try {
    const apiResponse = await weatherClient.GetForecastTempValue(location);
    return apiResponse;
  } catch (error) {
    return {
      error: 'Failed to fetch weather data in weather.service',
      message: error.message
    };
  }
}

async function GetForecastFeelsLike(location) {

  if (!validateLocation(location)) {

    return {

      error: 'Invalid location',

      message: 'Location must be a valid string'

    };

  }



  try {

    const apiResponse = await weatherClient.GetForecastFeelsLike(location);

    return apiResponse;

  } catch (error) {

    return {

      error: 'Failed to fetch weather data in weather.service',

      message: error.message

    };

  }

}



async function GetForecastHumidity(location) {

  if (!validateLocation(location)) {

    return {

      error: 'Invalid location',

      message: 'Location must be a valid string'

    };

  }



  try {

    const apiResponse = await weatherClient.GetForecastHumidity(location);

    return apiResponse;

  } catch (error) {

    return {

      error: 'Failed to fetch weather data in weather.service',

      message: error.message

    };

  }

}







async function GetForecastTempRange(location) {
  if (!validateLocation(location)) {
    return {
      error: 'Invalid location',
      message: 'Location must be a valid string'
    };
  }

  try {
    const apiResponse = await weatherClient.GetForecastTempRange(location);
    return apiResponse;
  } catch (error) {
    return {
      error: 'Failed to fetch weather data',
      message: error.message
    };
  }
}

async function GetForecastWindVal(location) {
  if (!validateLocation(location)) {
    return {
      error: 'Invalid location',
      message: 'Location must be a valid string'
    };
  }

  try {
    const apiResponse = await weatherClient.GetForecastWindVal(location);
    return apiResponse;
  } catch (error) {
    return {
      error: 'Failed to fetch weather data',
      message: error.message
    };
  }
}

/**
 * Validate location input
 * @param {string} location - Location to validate
 * @returns {boolean} True if valid
 */
function validateLocation(location) {
  // Check if location is a valid city name, coordinates, etc.
  return location && location.trim().length > 0;
}

export { GetCurrentWeatherData, GetCurrentWindVal, GetCurrentTempVal, GetCurrentDateLoc, GetCurrentHumidity, GetCurrentFeelsLike, GetCurrentTempRange,
         GetForecastWeatherData, GetForecastTempVal, GetForecastFeelsLike, GetForecastHumidity, GetForecastTempRange, GetForecastWindVal 
};
