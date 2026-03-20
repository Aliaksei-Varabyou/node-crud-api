import { randomUUID } from "node:crypto";
import type { Product } from "../types.ts";

class InMemoryDB {
  private products: Product[] = [];

  public getProductById = (id: string): Product | undefined => {
    return this.products.find((product) => product.id === id);
  };

  public getAllProducts = (): Product[] => {
    return this.products;
  };

  public createProduct = (name: string, description:string, price: number, category: string, inStock: boolean): Product => {
    const newProduct: Product = {
      id: randomUUID(),
      name,
      description,
      price,
      category,
      inStock
    };
    this.products.push(newProduct);
    return newProduct;
  };

  public deleteProduct = (id: string): boolean => {
    const deletedIndex = this.products.findIndex((product) => product.id === id);
    if (deletedIndex === -1) return false;

    this.products.splice(deletedIndex, 1);
    return true;
  };

  public updateProduct = (
    id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    inStock: boolean
  ): Product | undefined => {
    const updatedProduct = this.getProductById(id);
    if (!updatedProduct) return undefined;

    updatedProduct.name = name ?? updatedProduct.name;
    updatedProduct.description = description ?? updatedProduct.description;
    updatedProduct.price = price ?? updatedProduct.price;
    updatedProduct.category = category ?? updatedProduct.category;
    updatedProduct.inStock = inStock ?? updatedProduct.inStock;
    return updatedProduct;
  };
}

export const db = new InMemoryDB();
