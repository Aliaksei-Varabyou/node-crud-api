import Fastify, { type FastifyInstance } from "fastify";

export const buildApp = () => {
  const app: FastifyInstance = Fastify({
    logger: true,
  });

  return app;
}
