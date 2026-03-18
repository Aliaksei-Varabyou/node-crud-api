import Fastify, { type FastifyInstance } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import productsRoute from "./routes/products.ts";

export const buildApp = () => {
  const app: FastifyInstance = Fastify({
    logger: true,
  });
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(productsRoute, {prefix: '/products'})

  return app;
}
