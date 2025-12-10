/**
 * Weather Service
 */

import { setCache, getCache } from '../utils/cache.util.js';
import { getWeatherClient } from './weather-api/factory.service.js';

const weatherClient = getWeatherClient("openweather");

/**
 * Get current wind data for a location
 * @param {string} location - Location name or coordinates
 * @returns {Promise<Object>} Temperature data
 */
export async function getCurrentWind(location) {
  if (!validateLocation(location)) {
    return {
      error: 'Invalid location',
      message: 'Location must be a valid string'
    };
  }

  try {
    const apiResponse = await weatherClient.getCurrentWind(location);
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
export async function getCurrentTemparture(location) {
  if (!validateLocation(location)) {
    return {
      error: 'Invalid location',
      message: location + ' must be a valid string'
    };
  }

  try {
    const apiResponse = await weatherClient.getCurrentTemparture(location);
    return apiResponse;
  } catch (error) {
    return {
      error: 'Failed to fetch weather data',
      message: error.message
    };
  }
}

/**
 * Get current all weather data for a location
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

  try {
    const apiResponse = await weatherClient.getCurrentWeather(location);
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
export function validateLocation(location) {
  // Check if location is a valid city name, coordinates, etc.
  return location && location.trim().length > 0;
}

