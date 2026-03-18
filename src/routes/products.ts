import type { FastifyInstance } from "fastify";

export default async function productsRoute(app: FastifyInstance) {
  app.get('/', async () => {
    return [];
  });
}
