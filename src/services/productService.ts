import { NotFoundError } from "../errors/classes.ts";
import { db } from "../models/product.ts";
import type { CreateProduct, UpdateProduct } from "../types.ts";


class ProductService {
  getAll() {
    return db.getAllProducts();
  }

  getById(id: string) {
    const product = db.getProductById(id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    return product;
  }

  create(data: CreateProduct) {
    return db.createProduct(data);
  }

  update(id: string, data: UpdateProduct) {
    const product = db.getProductById(id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    return db.updateProduct(id, data);
  }

  delete(id: string) {
    db.deleteProduct(id);
  }

}

export const productService = new ProductService();
