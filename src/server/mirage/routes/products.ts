import { Response, type Request, type Server } from 'miragejs';

import type {
  CreateProductPayload,
  UpdateProductPayload,
} from '../../../features/products/types/product';
import {
  createProduct,
  deleteProduct,
  getStore,
  listProducts,
  updateProduct,
} from '../seeds/in-memory-db';

function parseRequestBody<T>(request: Request): T | null {
  if (!request.requestBody) {
    return null;
  }

  try {
    return JSON.parse(request.requestBody) as T;
  } catch {
    return null;
  }
}

function hasValidCategory(payload: Record<string, unknown>): boolean {
  return typeof payload.category === 'string' && payload.category.trim().length > 0;
}

function hasValidName(payload: Record<string, unknown>): boolean {
  return typeof payload.name === 'string' && payload.name.trim().length > 0;
}

function hasValidPrice(payload: Record<string, unknown>): boolean {
  return typeof payload.price === 'number' && Number.isFinite(payload.price);
}

function hasValidStoreId(payload: Record<string, unknown>): boolean {
  return typeof payload.storeId === 'string' && payload.storeId.trim().length > 0;
}

function isCreateProductPayload(payload: unknown): payload is CreateProductPayload {
  if (typeof payload !== 'object' || payload === null) {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  return (
    hasValidCategory(candidate) &&
    hasValidName(candidate) &&
    hasValidPrice(candidate) &&
    hasValidStoreId(candidate)
  );
}

function isUpdateProductPayload(payload: unknown): payload is UpdateProductPayload {
  if (typeof payload !== 'object' || payload === null) {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  return (
    hasValidCategory(candidate) && hasValidName(candidate) && hasValidPrice(candidate)
  );
}

function notFound(message: string) {
  return new Response(404, {}, { message });
}

function badRequest(message: string) {
  return new Response(400, {}, { message });
}

export function registerProductRoutes(server: Server) {
  server.get('/products', (_schema, request) => {
    const storeId =
      typeof request.queryParams.storeId === 'string'
        ? request.queryParams.storeId
        : undefined;

    return listProducts(storeId);
  });

  server.post('/products', (_schema, request) => {
    const payload = parseRequestBody<CreateProductPayload>(request);

    if (!isCreateProductPayload(payload)) {
      return badRequest('Payload inválido para criação de produto.');
    }

    if (!getStore(payload.storeId)) {
      return notFound('A loja informada não existe.');
    }

    return createProduct(payload);
  });

  server.put('/products/:productId', (_schema, request) => {
    const payload = parseRequestBody<UpdateProductPayload>(request);
    const productId = request.params.productId;

    if (!productId) {
      return notFound('Produto não encontrado.');
    }

    if (!isUpdateProductPayload(payload)) {
      return badRequest('Payload inválido para atualização de produto.');
    }

    const nextProduct = updateProduct(productId, payload);

    if (!nextProduct) {
      return notFound('Produto não encontrado.');
    }

    return nextProduct;
  });

  server.delete('/products/:productId', (_schema, request) => {
    const productId = request.params.productId;

    if (!productId) {
      return notFound('Produto não encontrado.');
    }

    const removed = deleteProduct(productId);

    if (!removed) {
      return notFound('Produto não encontrado.');
    }

    return new Response(204);
  });
}
