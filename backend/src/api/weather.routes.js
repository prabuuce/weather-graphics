/**
 * Weather API routes
 * 
 * Routes should be thin - they handle HTTP requests/responses
 * and delegate business logic to services.
 */
import {
  getCurrentWind,
  getCurrentTemparture,
  getCurrentWeather
} from '../services/weather.service.js';

export async function weatherRoutes(fastify, options) {
  // GET /api/weather
  fastify.get('/', async (request, reply) => {
    return {
      message: 'Weather API endpoint',
      availableEndpoints: [
        'GET /api/weather',
        'GET /api/weather/:location',
        'GET /api/weather/wind/:location',
        'GET /api/weather/temperature/:location'
      ]
    };
  });

   // GET /api/weather/temperature/:location
  fastify.get('/temperature/:location', async (request, reply) => {
    const { location } = request.params;
    try {
      const weatherData = await getCurrentTemparture(location);
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
// GET /api/weather/wind/:location
  fastify.get('/wind/:location', async (request, reply) => {
    const { location } = request.params;
    try {
      const weatherData = await getCurrentWind(location);
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

  // GET /api/weather/:location
  fastify.get('/:location', async (request, reply) => {
    const { location } = request.params;
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
}

