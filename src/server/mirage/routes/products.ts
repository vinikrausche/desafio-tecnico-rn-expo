import { HttpResponse, http } from 'msw';

import type {
  CreateProductPayload,
  UpdateProductPayload,
} from '../../../features/products/types/product';
import { API_BASE_URL } from '../../../lib/api/constants';
import type { MockRouteParam } from '../types';
import {
  createProduct,
  deleteProduct,
  getStore,
  listProducts,
  updateProduct,
} from '../seeds/in-memory-db';

function getSingleParam(value: MockRouteParam): string | null {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return null;
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

export const productHandlers = [
  http.get(`${API_BASE_URL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const storeId = url.searchParams.get('storeId') ?? undefined;

    return HttpResponse.json(listProducts(storeId));
  }),

  http.post(`${API_BASE_URL}/products`, async ({ request }) => {
    const payload = await request.json();

    if (!isCreateProductPayload(payload)) {
      return HttpResponse.json(
        { message: 'Payload inválido para criação de produto.' },
        { status: 400 },
      );
    }

    if (!getStore(payload.storeId)) {
      return HttpResponse.json(
        { message: 'A loja informada não existe.' },
        { status: 404 },
      );
    }

    return HttpResponse.json(createProduct(payload), { status: 201 });
  }),

  http.put(`${API_BASE_URL}/products/:productId`, async ({ params, request }) => {
    const payload = await request.json();
    const productId = getSingleParam(params.productId);

    if (!productId) {
      return HttpResponse.json(
        { message: 'Produto não encontrado.' },
        { status: 404 },
      );
    }

    if (!isUpdateProductPayload(payload)) {
      return HttpResponse.json(
        { message: 'Payload inválido para atualização de produto.' },
        { status: 400 },
      );
    }

    const nextProduct = updateProduct(productId, payload);

    if (!nextProduct) {
      return HttpResponse.json(
        { message: 'Produto não encontrado.' },
        { status: 404 },
      );
    }

    return HttpResponse.json(nextProduct);
  }),

  http.delete(`${API_BASE_URL}/products/:productId`, ({ params }) => {
    const productId = getSingleParam(params.productId);

    if (!productId) {
      return HttpResponse.json(
        { message: 'Produto não encontrado.' },
        { status: 404 },
      );
    }

    const removed = deleteProduct(productId);

    if (!removed) {
      return HttpResponse.json(
        { message: 'Produto não encontrado.' },
        { status: 404 },
      );
    }

    return new HttpResponse(null, { status: 204 });
  }),
];
