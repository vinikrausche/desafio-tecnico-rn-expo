import type { Request, Server } from 'miragejs';

import type {
  CreateStorePayload,
  UpdateStorePayload,
} from '../../../features/stores/types/store';
import {
  createStore,
  deleteStore,
  getStore,
  listProducts,
  listStores,
  updateStore,
} from '../seeds/in-memory-db';
import { httpResponse } from '../utils/http-response';

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

export function registerStoreRoutes(server: Server) {
  server.get('/stores', () => {
    return httpResponse.ok(listStores());
  });

  server.post('/stores', (_schema, request) => {
    const payload = parseRequestBody<CreateStorePayload>(request);

    if (!isStorePayload(payload)) {
      return httpResponse.badRequest('Payload inválido para criação de loja.');
    }

    return httpResponse.created(createStore(payload));
  });

  server.put('/stores/:storeId', (_schema, request) => {
    const payload = parseRequestBody<UpdateStorePayload>(request);
    const storeId = request.params.storeId;

    if (!isStorePayload(payload)) {
      return httpResponse.badRequest('Payload inválido para atualização de loja.');
    }

    if (!storeId) {
      return httpResponse.notFound('Loja não encontrada.');
    }

    const nextStore = updateStore(storeId, payload);

    if (!nextStore) {
      return httpResponse.notFound('Loja não encontrada.');
    }

    return httpResponse.ok(nextStore);
  });

  server.delete('/stores/:storeId', (_schema, request) => {
    const storeId = request.params.storeId;

    if (!storeId) {
      return httpResponse.notFound('Loja não encontrada.');
    }

    const removed = deleteStore(storeId);

    if (!removed) {
      return httpResponse.notFound('Loja não encontrada.');
    }

    return httpResponse.noContent();
  });

  server.get('/stores/:storeId/products', (_schema, request) => {
    const storeId = request.params.storeId;

    if (!storeId) {
      return httpResponse.notFound('Loja não encontrada.');
    }

    const store = getStore(storeId);

    if (!store) {
      return httpResponse.notFound('Loja não encontrada.');
    }

    return httpResponse.ok(listProducts(storeId));
  });
}
