import Fastify, { type FastifyInstance } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import productsRoute from "./routes/products.ts";
import { hasStatusCode } from "./errors/guards.ts";

export const buildApp = () => {
  const app: FastifyInstance = Fastify({
    logger: true,
  });
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.setErrorHandler((error, request, reply) => {
    request.log.error(error);

    const statusCode = hasStatusCode(error) ? error.statusCode : 500;
    const message = error instanceof Error ? error.message : 'Internal error';
    
    return reply.status(statusCode).send({ 
      error: message
    });
  });

  app.register(productsRoute, {prefix: '/products'})

  return app;
}
