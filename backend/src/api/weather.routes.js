/**
 * Weather API routes
 * 
 * Routes should be thin - they handle HTTP requests/responses
 * and delegate business logic to services.
 */
import {
  GetCurrentWindVal,
  GetCurrentTempVal,
  GetCurrentWeatherData,

  GetForecastWeatherData,
  GetForecastTempVal
} from '../services/weather.service.js';

export async function weatherRoutes(fastify, options) {
  // GET /api/weather
  fastify.get('/', async (request, reply) => {
    return {
      message: 'Weather API endpoint',
      availableEndpoints: [
        'GET /api/weather',
        'GET /api/weather/current/:location',
        'GET /api/weather/current/temperature/:location',
        'GET /api/weather/current/wind/:location',

        'GET /api/weather/forecast/:location',
        'GET /api/weather/forecast/temperature/:location'
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

   // GET /api/weather/current/temperature/:location
  fastify.get('/current/temperature/:location', async (request, reply) => {
    const { location } = request.params;
    try {
      const weatherData = await GetCurrentTempVal(location);
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
// GET /api/weather/current/wind/:location
  fastify.get('/current/wind/:location', async (request, reply) => {
    const { location } = request.params;
    try {
      const weatherData = await GetCurrentWindVal(location);
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

  // GET /api/weather/forecast/temperature/:location
  fastify.get('/forecast/temperature/:location', async (request, reply) => {
    const { location } = request.params;
    try {
      const weatherData = await GetForecastTempVal(location);
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