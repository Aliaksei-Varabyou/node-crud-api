import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateProductSchema, ProductIdSchema, UpdateProductSchema } from "../schemas/products.schema.js";
import { productService } from "../services/productService.js";

export default async function productsRoute(app: FastifyInstance) {
  const appTyped = app.withTypeProvider<ZodTypeProvider>();

  appTyped.get('/', async () => {
    return productService.getAll();
  });

  app.get('/:id', async (req) => {
    const {id} = ProductIdSchema.parse(req.params);
    return productService.getById(id);
  });

  appTyped.post('/', 
    async (req, reply) => {
      const data = CreateProductSchema.parse(req.body);
      const newProduct = productService.create(data);
      return reply.status(201).send(newProduct);
    }
  );

  appTyped.put('/:id',
    async (req) => {
      const {id} = ProductIdSchema.parse(req.params);
      const updateData = UpdateProductSchema.parse(req.body);
      return productService.update(id, updateData);
    }
  )

  appTyped.delete('/:id',
    async (req, reply) => {
      const {id} = ProductIdSchema.parse(req.params);
      productService.delete(id);
      return reply.status(204).send();
    }
  )
}
