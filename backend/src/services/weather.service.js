/**
 * Weather Service
 */

import { setCache, getCache } from '../utils/cache.util.js';
import { getWeatherClient } from './weatherApiFactory.js';

const weatherClient = getWeatherClient();

/**
 * Get current weather for a location
 * @param {string} location - Location name or coordinates
 * @returns {Promise<Object>} Weather data
 */
export async function getCurrentWeather(location) {
  if (!validateLocation(location)) {
    return {
      error: 'Invalid location',
      message: 'Location must be a valid string'
    };
  }

  const cacheKey = `current:${location.trim().toLowerCase()}`;
  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const apiResponse = await weatherClient.getUniqueCurrentWeather(location);
    //.getCurrentWeather(location);
    await setCache(cacheKey, apiResponse);
    return apiResponse;
  } catch (error) {
    return {
      error: 'Failed to fetch weather data',
      message: error.message
    };
  }
}

/**
 * Get weather forecast for a location
 * @param {string} location - Location name or coordinates
 * @param {number} days - Number of days to forecast (default: 5)
 * @returns {Promise<Object>} Forecast data
 */
export async function getWeatherForecast(location, days = 5) {
  if (!validateLocation(location)) {
    return {
      error: 'Invalid location',
      message: 'Location must be a valid string'
    };
  }

  const normalizedDays = Math.max(1, Math.min(days, 10));
  const cacheKey = `forecast:${location.trim().toLowerCase()}:${normalizedDays}`;
  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const apiResponse = await weatherClient.getWeatherForecast(location, normalizedDays);
    await setCache(cacheKey, apiResponse);
    return apiResponse;
  } catch (error) {
    return {
      error: 'Failed to fetch weather forecast',
      message: error.message
    };
  }
}

/**
 * Validate location input
 * @param {string} location - Location to validate
 * @returns {boolean} True if valid
 */
export function validateLocation(location) {
  // Check if location is a valid city name, coordinates, etc.
  return location && location.trim().length > 0;
}

