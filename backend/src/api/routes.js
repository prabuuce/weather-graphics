import { weatherRoutes } from './weather.routes.js';

/**
 * Register all API routes
 * @param {FastifyInstance} fastify - Fastify instance
 */
export async function registerRoutes(fastify) {
  const apiPrefix = fastify.config.API_PREFIX || '/api';

  // Register weather routes
  await fastify.register(weatherRoutes, { prefix: `${apiPrefix}/weather` });

  // Root API endpoint
  fastify.get(apiPrefix, async (request, reply) => {
    return {
      message: 'Weather Graphics API',
      version: '1.0.0',
      endpoints: {
        health: '/health',
        weather: `${apiPrefix}/weather`
      }
    };
  });
}


