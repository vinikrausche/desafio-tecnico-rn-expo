import { HttpResponse, http } from 'msw';

import type {
  CreateStorePayload,
  UpdateStorePayload,
} from '../../../features/stores/types/store';
import { API_BASE_URL } from '../../../lib/api/constants';
import type { MockRouteParam } from '../types';
import {
  createStore,
  deleteStore,
  getStore,
  listProducts,
  listStores,
  updateStore,
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

function isStorePayload(
  payload: unknown,
): payload is CreateStorePayload | UpdateStorePayload {
  if (typeof payload !== 'object' || payload === null) {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  return (
    typeof candidate.name === 'string' &&
    candidate.name.trim().length > 0 &&
    typeof candidate.address === 'string' &&
    candidate.address.trim().length > 0
  );
}

export const storeHandlers = [
  http.get(`${API_BASE_URL}/stores`, () => {
    return HttpResponse.json(listStores());
  }),

  http.post(`${API_BASE_URL}/stores`, async ({ request }) => {
    const payload = await request.json();

    if (!isStorePayload(payload)) {
      return HttpResponse.json(
        { message: 'Payload inválido para criação de loja.' },
        { status: 400 },
      );
    }

    return HttpResponse.json(createStore(payload), { status: 201 });
  }),

  http.put(`${API_BASE_URL}/stores/:storeId`, async ({ params, request }) => {
    const payload = await request.json();
    const storeId = getSingleParam(params.storeId);

    if (!storeId) {
      return HttpResponse.json({ message: 'Loja não encontrada.' }, { status: 404 });
    }

    if (!isStorePayload(payload)) {
      return HttpResponse.json(
        { message: 'Payload inválido para atualização de loja.' },
        { status: 400 },
      );
    }

    const nextStore = updateStore(storeId, payload);

    if (!nextStore) {
      return HttpResponse.json({ message: 'Loja não encontrada.' }, { status: 404 });
    }

    return HttpResponse.json(nextStore);
  }),

  http.delete(`${API_BASE_URL}/stores/:storeId`, ({ params }) => {
    const storeId = getSingleParam(params.storeId);

    if (!storeId) {
      return HttpResponse.json({ message: 'Loja não encontrada.' }, { status: 404 });
    }

    const removed = deleteStore(storeId);

    if (!removed) {
      return HttpResponse.json({ message: 'Loja não encontrada.' }, { status: 404 });
    }

    return new HttpResponse(null, { status: 204 });
  }),

  http.get(`${API_BASE_URL}/stores/:storeId/products`, ({ params }) => {
    const storeId = getSingleParam(params.storeId);

    if (!storeId) {
      return HttpResponse.json({ message: 'Loja não encontrada.' }, { status: 404 });
    }

    const store = getStore(storeId);

    if (!store) {
      return HttpResponse.json({ message: 'Loja não encontrada.' }, { status: 404 });
    }

    return HttpResponse.json(listProducts(storeId));
  }),
];
