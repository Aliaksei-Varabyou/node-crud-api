import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  inStock: z.boolean()
})

export const UpdateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  inStock: z.boolean().optional()
})

export const idParamSchema = z.object({
  id: z.string()
});
