import { z } from 'zod';
import type { CreateProductSchema, UpdateProductSchema } from './schemas/products.schema.js';

export interface Product {
  id: string,
  name: string,
  description: string,
  price: number,
  category: string,
  inStock: boolean
}

export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
