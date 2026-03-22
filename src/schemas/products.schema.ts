import * as z from 'zod';

const ProductSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  inStock: z.boolean()
})

export const CreateProductSchema = ProductSchema.omit({ 'id': true });

export const UpdateProductSchema = CreateProductSchema.partial();

export const ProductIdSchema = z.object({
  id: z.string()
});
