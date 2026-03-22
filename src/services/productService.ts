import { BadRequestError, NotFoundError } from "../errors/classes.js";
import { isUUID } from "../errors/guards.js";
import { db } from "../models/product.js";
import type { CreateProduct, UpdateProduct } from "../types.js";

class ProductService {

  private async ensureValidProduct(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestError('Id is not a correct UUID');
    }
    const product = await db.getProductById(id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    return product;
  }

  async getAll() {
    return await db.getAllProducts();
  }

  async getById(id: string) {
    return await this.ensureValidProduct(id);
  }

  async create(data: CreateProduct) {
    return await db.createProduct(data);
  }

  async update(id: string, data: UpdateProduct) {
    await this.ensureValidProduct(id);
    return await db.updateProduct(id, data);
  }

  async delete(id: string) {
    await this.ensureValidProduct(id);
    await db.deleteProduct(id);
  }

}

export const productService = new ProductService();
