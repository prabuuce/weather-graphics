/**
 * Weather Data Models
 * 
 * Define data structures and schemas for weather data.
 * This helps maintain consistency across your application.
 */

/**
 * Weather data structure
 */
export const WeatherSchema = {
  location: String,
  temperature: Number,
  condition: String,
  humidity: Number,
  windSpeed: Number,
  timestamp: String
};

/**
 * Forecast data structure
 */
export const ForecastSchema = {
  location: String,
  days: Number,
  forecast: Array,
  generatedAt: String
};

/**
 * Create a weather data object
 * @param {Object} data - Raw weather data
 * @returns {Object} Formatted weather data
 */
export function createWeatherData(data) {
  return {
    location: data.location,
    temperature: data.temperature,
    condition: data.condition,
    humidity: data.humidity || 0,
    windSpeed: data.windSpeed || 0,
    timestamp: data.timestamp || new Date().toISOString()
  };
}

/**
 * Create a forecast data object
 * @param {Object} data - Raw forecast data
 * @returns {Object} Formatted forecast data
 */
export function createForecastData(data) {
  return {
    location: data.location,
    days: data.days,
    forecast: data.forecast || [],
    generatedAt: data.generatedAt || new Date().toISOString()
  };
}

