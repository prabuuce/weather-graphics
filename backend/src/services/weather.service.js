/**
 * Weather Service
 * 
 * This is where you should implement your business logic for weather data.
 * 
 * Business logic includes:
 * - Fetching data from external APIs (OpenWeatherMap, WeatherAPI, etc.)
 * - Data transformation and processing
 * - Caching strategies
 * - Data validation and error handling
 * - Business rules and calculations
 */

/**
 * Get current weather for a location
 * @param {string} location - Location name or coordinates
 * @returns {Promise<Object>} Weather data
 */
export async function getCurrentWeather(location) {
  // TODO: Implement your business logic here
  // Example:
  // 1. Validate location input
  // 2. Check cache for recent data
  // 3. Fetch from external weather API
  // 4. Transform data to your format
  // 5. Cache the result
  // 6. Return formatted data
  
  // Placeholder implementation
  return {
    location,
    temperature: 22,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 10,
    timestamp: new Date().toISOString()
  };
}

/**
 * Get weather forecast for a location
 * @param {string} location - Location name or coordinates
 * @param {number} days - Number of days to forecast (default: 5)
 * @returns {Promise<Object>} Forecast data
 */
export async function getWeatherForecast(location, days = 5) {
  // TODO: Implement your business logic here
  // Example:
  // 1. Validate location and days parameters
  // 2. Check cache
  // 3. Fetch forecast from external API
  // 4. Process and format forecast data
  // 5. Apply business rules (e.g., max days limit)
  // 6. Cache the result
  // 7. Return formatted forecast
  
  // Placeholder implementation
  const forecast = [];
  for (let i = 0; i < days; i++) {
    forecast.push({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
      temperature: { min: 15 + i, max: 25 + i },
      condition: ['Sunny', 'Cloudy', 'Rainy'][i % 3],
      precipitation: Math.random() * 10
    });
  }
  
  return {
    location,
    days,
    forecast,
    generatedAt: new Date().toISOString()
  };
}

/**
 * Validate location input
 * @param {string} location - Location to validate
 * @returns {boolean} True if valid
 */
export function validateLocation(location) {
  // TODO: Implement location validation logic
  // Check if location is a valid city name, coordinates, etc.
  return location && location.trim().length > 0;
}

