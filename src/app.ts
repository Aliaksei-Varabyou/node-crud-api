import Fastify, { type FastifyInstance } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import productsRoute from "./routes/products.js";
import { hasStatusCode } from "./errors/guards.js";
import { ZodError } from "zod";
import { BadRequestError } from "./errors/classes.js";

export const buildApp = () => {
  const isDev = process.env.NODE_ENV !== 'production';
  const app: FastifyInstance = Fastify({
    logger: isDev
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss',
              ignore: 'pid,hostname',
            },
          },
        }
      : true,
  });
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.setErrorHandler((error, request, reply) => {
    request.log.error(error);

    if (error instanceof ZodError) {
      throw new BadRequestError(error.issues.map(i => i.message).join('; ') || 'Validation error');
    }

    const statusCode = hasStatusCode(error) ? error.statusCode : 500;
    const message = error instanceof Error ? error.message : 'Internal error';
    
    return reply.status(statusCode).send({ 
      error: message
    });
  });

  app.register(productsRoute, {prefix: '/api/products'})

  return app;
}
