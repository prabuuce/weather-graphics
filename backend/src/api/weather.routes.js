/**
 * Weather API routes
 * 
 * Routes should be thin - they handle HTTP requests/responses
 * and delegate business logic to services.
 */
import { 
  getCurrentWeather, 
  getWeatherForecast, 
  validateLocation 
} from '../services/weather.service.js';

export async function weatherRoutes(fastify, options) {
  // GET /api/weather
  fastify.get('/', async (request, reply) => {
    return {
      message: 'Weather API endpoint',
      availableEndpoints: [
        'GET /api/weather',
        'GET /api/weather/:location',
        'GET /api/weather/forecast/:location'
      ]
    };
  });

  // GET /api/weather/:location
  fastify.get('/:location', async (request, reply) => {
    const { location } = request.params;

    if (!validateLocation(location)) {
      return reply.code(400).send({
        error: 'Invalid location',
        message: 'Location must be a valid string'
      });
    }

    try {
      const weatherData = await getCurrentWeather(location);
      if (weatherData?.error) {
        const statusCode = weatherData.error === 'Invalid location' ? 400 : 502;
        return reply.code(statusCode).send(weatherData);
      }
      return reply.code(200).send(weatherData);
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        error: 'Failed to fetch weather data',
        message: error.message
      });
    }
  });

  // GET /api/weather/forecast/:location
  fastify.get('/forecast/:location', async (request, reply) => {
    const { location } = request.params;
    const { days = 5 } = request.query;
    const daysNum = parseInt(days, 10);
    
    // Validate input
    if (!validateLocation(location)) {
      return reply.code(400).send({
        error: 'Invalid location',
        message: 'Location must be a valid string'
      });
    }
    
    if (Number.isNaN(daysNum) || daysNum < 1 || daysNum > 10) {
      return reply.code(400).send({
        error: 'Invalid days parameter',
        message: 'Days must be a number between 1 and 10'
      });
    }
    
    try {
      const forecastData = await getWeatherForecast(location, daysNum);
      if (forecastData?.error) {
        const statusCode = forecastData.error === 'Invalid location' ? 400 : 502;
        return reply.code(statusCode).send(forecastData);
      }
      return reply.code(200).send(forecastData);
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        error: 'Failed to fetch forecast data',
        message: error.message
      });
    }
  });
}

