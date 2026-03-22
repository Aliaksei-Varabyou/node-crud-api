import { BadRequestError, NotFoundError } from "../errors/classes.js";
import { isUUID } from "../errors/guards.js";
import { db } from "../models/product.js";
import type { CreateProduct, UpdateProduct } from "../types.js";

class ProductService {

  private ensureValidProduct(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestError('Id is not a correct UUID');
    }
    const product = db.getProductById(id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    return product;
  }

  getAll() {
    return db.getAllProducts();
  }

  getById(id: string) {
    return this.ensureValidProduct(id);
  }

  create(data: CreateProduct) {
    return db.createProduct(data);
  }

  update(id: string, data: UpdateProduct) {
    this.ensureValidProduct(id);
    return db.updateProduct(id, data);
  }

  delete(id: string) {
    this.ensureValidProduct(id);
    db.deleteProduct(id);
  }

}

export const productService = new ProductService();
