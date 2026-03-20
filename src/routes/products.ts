import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { randomUUID } from "node:crypto";
import { CreateProductSchema, ProductIdSchema, UpdateProductSchema } from "../schemas/products.schema.ts";
import { NotFoundError } from "../errors/classes.ts";

export default async function productsRoute(app: FastifyInstance) {
  const appTyped = app.withTypeProvider<ZodTypeProvider>();

  appTyped.get('/', async () => {
    return [];
  });

  app.get('/:id', async (req) => {
    const id = ProductIdSchema.parse(req.params);
    const product = null;
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    return product;
  });

  appTyped.post('/', 
    async (req, reply) => {
      const product = CreateProductSchema.parse(req.body);
      const createProduct = {
        id: randomUUID,
        ...product
      }

      return reply.status(201).send(createProduct);
    }
  );

  appTyped.patch('/:id',
    async (req, reply) => {
      const id = ProductIdSchema.parse(req.params);
      const updateData = UpdateProductSchema.parse(req.body);
      const product = {id, name: 'test'};
      if (!product) {
        throw new NotFoundError('Product not found');
      }

      return {
        ...product,
        ...updateData
      }
    }
  )

  appTyped.delete('/:id',
    async (req, reply) => {
      const id = ProductIdSchema.parse(req.params);
      const product = {id};
      if (!product) {
        throw new NotFoundError('Product not found');
      }

      return reply.status(204).send();
    }
  )
}
