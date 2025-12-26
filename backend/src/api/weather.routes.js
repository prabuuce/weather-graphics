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
  GetCurrentDateLoc,
  GetCurrentHumidity,
  GetCurrentFeelsLike,
  GetCurrentTempRange,
  GetCurrentWeatherType,

  GetForecastWeatherData,
  GetForecastTempVal,
  GetForecastFeelsLike,
  GetForecastHumidity,
  GetForecastTempRange,
  GetForecastWindVal
} from '../services/weather/weather.service.js';

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
        'GET /api/weather/current/dateloc/:location',
        'GET /api/weather/current/humidity/:location',
        'GET /api/weather/current/type/:location',

        'GET /api/weather/forecast/:location',
        'GET /api/weather/forecast/temperature/:location',
        'GET /api/weather/forecast/temperature/range/:location',
        'GET /api/weather/forecast/wind/:location'
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

  // GET /api/weather/current/dateloc/:location
  fastify.get('/current/dateloc/:location', async (request, reply) => {
    const { location } = request.params;
    try {
      const weatherData = await GetCurrentDateLoc(location);
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

  // GET /api/weather/current/humidity/:location
  fastify.get('/current/humidity/:location', async (request, reply) => {
    const { location } = request.params;
    try {
      const weatherData = await GetCurrentHumidity(location);
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

  // GET /api/weather/current/feelslike/:location
  fastify.get('/current/feelslike/:location', async (request, reply) => {
    const { location } = request.params;
    try {
      const weatherData = await GetCurrentFeelsLike(location);
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

  // GET /api/weather/current/temperature/range/:location
  fastify.get('/current/temperature/range/:location', async (request, reply) => {
    const { location } = request.params;
    try {
      const weatherData = await GetCurrentTempRange(location);
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

  // GET /api/weather/current/type/:location
  // Fetches the general weather type (e.g., Rain, Clear) and description
  fastify.get('/current/type/:location', async (request, reply) => {
    const { location } = request.params;
    try {
      const weatherData = await GetCurrentWeatherType(location);
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

  fastify.get('/forecast/feelslike/:location', async (request, reply) => {
    const { location } = request.params;
    try {
      const weatherData = await GetForecastFeelsLike(location);
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

  fastify.get('/forecast/humidity/:location', async (request, reply) => {
    const { location } = request.params;
    try {
      const weatherData = await GetForecastHumidity(location);
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

  fastify.get('/forecast/temperature/range/:location', async (request, reply) => {
    const { location } = request.params;
    try {
      const weatherData = await GetForecastTempRange(location);
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

    fastify.get('/forecast/wind/:location', async (request, reply) => {
    const { location } = request.params;
    try {
      const weatherData = await GetForecastWindVal(location);
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