import { describe, it, expect } from 'vitest';
import { buildApp } from './app.js';
import type { Product } from './types.js';

describe('Product CRUD API', () => {
  const baseUrl = '/api/products';
  let createdProductId: string;
  const app = buildApp();

  it('should get all products', async () => {
    const response = await app.inject({
      method: 'GET',
      url: baseUrl
    });
    const body = response.json();

    expect(response.statusCode).toBe(200);
    expect(body).toEqual([]);
  });

  it('should create product', async () => {
    const response = await app.inject({
      method: 'POST',
      url: baseUrl,
      payload: {
        name: 'Phone',
        description: 'Nice',
        price: 100,
        category: 'tech',
        inStock: true
      }
    });

    expect(response.statusCode).toBe(201);

    const body = response.json();

    expect(body?.id).toBeDefined();
    expect(body).toMatchObject({
      name: 'Phone',
      price: 100
    });
    createdProductId = body?.id;
  });

  it('should get created product', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `${baseUrl}/${createdProductId}`,
    });
    const body = response.json();

    expect(response.statusCode).toBe(200);
    expect(body?.id).toBe(createdProductId);
    expect(body?.name).toBe('Phone');
  });

  it('should update product', async () => {
    const response = await app.inject({
      method: 'PUT',
      url: `${baseUrl}/${createdProductId}`,
      payload: {
        name: 'Mobile',
        price: 200
      }
    });
    const body = response.json() as Product;
  
    expect(response.statusCode).toBe(200);
    expect(body?.name).toBe('Mobile');
  });

  it('should delete user', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `${baseUrl}/${createdProductId}`
    });
    expect(response.statusCode).toBe(204);
  });

  it('should return 400 for invalid UUID', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `${baseUrl}/invalid-id`,
    });

    const body = response.json();

    expect(response.statusCode).toBe(400);
    expect(body.error).toBeDefined();
  });

  it('should return 404 for non-existing product', async () => {
    const nonExistingId = '550e8400-e29b-41d4-a716-446655440000';

    const response = await app.inject({
      method: 'GET',
      url: `${baseUrl}/${nonExistingId}`,
    });

    const body = response.json();

    expect(response.statusCode).toBe(404);
    expect(body.error).toBeDefined();
  });

  it('should return 400 for invalid product data', async () => {
    const response = await app.inject({
      method: 'POST',
      url: baseUrl,
      payload: {
        name: '',
        price: -10
      }
    });

    const body = response.json();

    expect(response.statusCode).toBe(400);
    expect(body.error).toBeDefined();
  });
});