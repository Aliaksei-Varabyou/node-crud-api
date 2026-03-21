import { randomUUID } from "node:crypto";
import type { Product, UpdateProduct } from "../types.js";

class InMemoryDB {
  private products: Product[] = [];

  public getProductById = (id: string): Product | undefined => {
    return this.products.find((product) => product.id === id);
  };

  public getAllProducts = (): Product[] => {
    return this.products;
  };

  public createProduct = (data: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      id: randomUUID(),
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  };

  public deleteProduct = (id: string): void => {
    const deletedIndex = this.products.findIndex((product) => product.id === id);

    this.products.splice(deletedIndex, 1);
  };

  public updateProduct = (
    id: string,
    data:UpdateProduct
  ): Product | undefined => {
    const updatedProduct = this.getProductById(id);
    if (!updatedProduct) return undefined;

    Object.assign(updatedProduct, data);
    return updatedProduct;
  };
}

export const db = new InMemoryDB();
