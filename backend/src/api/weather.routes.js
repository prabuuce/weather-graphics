/**
 * Weather API routes
 * 
 * Routes should be thin - they handle HTTP requests/responses
 * and delegate business logic to services.
 */
import { GetCurrentWeatherData, GetForecastWeatherData } from '../services/weather/weather.service.js';

export async function weatherRoutes(fastify, options) {
  // GET /api/weather
  fastify.get('/', async (request, reply) => {
    return {
      message: 'Weather API endpoint',
      availableEndpoints: [
        'GET /api/weather',
        'GET /api/weather/current/:location',
        'GET /api/weather/forecast/:location'
      ]
    };
  });

  // GET /api/weather/current/:location
  fastify.get('/current/:location', async (request, reply) => {
    const { location } = request.params;
    try {
      const weatherData = await GetCurrentWeatherData(location);
      if (weatherData?.error) {
        const statusCode = weatherData.error === 'Invalid location' ? 400 : 502;
        return reply.code(statusCode).send(weatherData);
      }
      return reply.code(200).send(weatherData);
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        error: 'Failed to fetch weather data in weather.routes',
        message: error.message
      });
    }
  });

  ////////////////////////////////////////////////////////////

  fastify.get('/forecast/:location', async (request, reply) => {
    const { location } = request.params;
    try {
      const weatherData = await GetForecastWeatherData(location);
      if (weatherData?.error) {
        const statusCode = weatherData.error === 'Invalid location' ? 400 : 502;
        return reply.code(statusCode).send(weatherData);
      }
      return reply.code(200).send(weatherData);
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        error: 'Failed to fetch weather data in weather.routes',
        message: error.message
      });
    }
  });
}
