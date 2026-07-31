import { GetMapTile } from '../services/map/map.service.js';

/**
 * Map API routes
 */
export async function mapRoutes(fastify, options) {
  // GET /api/map/:z/:x/:y
  fastify.get('/:z/:x/:y', async (request, reply) => {
    const { z, x, y } = request.params;

    try {
      const result = await GetMapTile(x, y, z);

      // Check if result is an error object
      if (result?.error) {
        const statusCode = result.error === 'Invalid coordinates' ? 400 : 502;
        return reply.code(statusCode).send(result);
      }

      // If success, it's an image buffer
      return reply
        .code(200)
        .header('Content-Type', 'image/png')
        .send(result);

    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  });
}
