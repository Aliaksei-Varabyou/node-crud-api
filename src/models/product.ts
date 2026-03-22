import { randomUUID } from "node:crypto";
import cluster from "node:cluster";
import type { Product, UpdateProduct } from "../types.js";

type Message = {
  type: string;
  payload?: any;
  requestId: string;
};

class InMemoryDB {
  private products: Product[] = [];
  private isPrimary = cluster.isPrimary;

  // ========================
  // IPC helper
  // ========================
  private request(type: string, payload?: object): any {
    if (this.isPrimary) {
      return this.handle(type, payload);
    }

    return new Promise((resolve) => {
      const requestId = randomUUID();

      const handler = (msg: any) => {
        if (msg.requestId === requestId) {
          process.off("message", handler);
          resolve(msg.result);
        }
      };

      process.on("message", handler);

      process.send?.({ type, payload, requestId } satisfies Message);
    });
  }

  // ========================
  // MASTER HANDLER
  // ========================
  public handle(type: string, payload?: any) {
    switch (type) {
      case "GET_ALL":
        return this.products;

      case "GET_BY_ID":
        return this.products.find(p => p.id === payload.id);

      case "CREATE": {
        const newProduct: Product = {
          id: randomUUID(),
          ...payload
        };
        this.products.push(newProduct);
        return newProduct;
      }

      case "DELETE": {
        const index = this.products.findIndex(p => p.id === payload.id);
        if (index !== -1) {
          this.products.splice(index, 1);
        }
        return;
      }

      case "UPDATE": {
        const product = this.products.find(p => p.id === payload.id);
        if (!product) return undefined;

        Object.assign(product, payload.data);
        return product;
      }

      default:
        return null;
    }
  }

  // ========================
  // PUBLIC API
  // ========================

  public getAllProducts = async (): Promise<Product[]> => {
    return this.request("GET_ALL");
  };

  public getProductById = async (id: string): Promise<Product | undefined> => {
    return this.request("GET_BY_ID", { id });
  };

  public createProduct = async (
    data: Omit<Product, "id">
  ): Promise<Product> => {
    return this.request("CREATE", data);
  };

  public deleteProduct = async (id: string): Promise<void> => {
    return this.request("DELETE", { id });
  };

  public updateProduct = async (
    id: string,
    data: UpdateProduct
  ): Promise<Product | undefined> => {
    return this.request("UPDATE", { id, data });
  };
}

export const db = new InMemoryDB();
