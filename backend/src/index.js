import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import env from '@fastify/env';
import dotenv from 'dotenv';
import { registerRoutes } from './api/routes.js';

// Load environment variables
dotenv.config();

// Environment schema for @fastify/env
const envSchema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'string',
      default: '3000'
    },
    NODE_ENV: {
      type: 'string',
      default: 'development'
    },
    API_PREFIX: {
      type: 'string',
      default: '/api'
    }
  }
};

const envOptions = {
  confKey: 'config',
  schema: envSchema,
  dotenv: true
};

async function buildServer() {
  const fastify = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      transport: process.env.NODE_ENV === 'development' ? {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
        }
      } : undefined
    }
  });

  // Register environment variables
  await fastify.register(env, envOptions);

  // Register security plugins
  await fastify.register(helmet, {
    contentSecurityPolicy: false
  });

  // Register CORS
  await fastify.register(cors, {
    origin: process.env.NODE_ENV === 'production' 
      ? false // Configure allowed origins in production
      : true, // Allow all origins in development
    credentials: true
  });

  // Register rate limiting
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute'
  });

  // Health check route
  fastify.get('/health', async (request, reply) => {
    return { 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    };
  });

  // Register API routes
  await registerRoutes(fastify);

  return fastify;
}

async function start() {
  try {
    const fastify = await buildServer();
    const port = fastify.config.PORT || 3000;
    const host = process.env.HOST || '0.0.0.0';

    await fastify.listen({ port, host });
    
    fastify.log.info(`🚀 Server running on http://${host}:${port}`);
    fastify.log.info(`📝 Environment: ${fastify.config.NODE_ENV}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

start();

