import type { Server } from 'miragejs';

import {
  createStoreDtoSchema,
  updateStoreDtoSchema,
} from '../dto/store.dto';
import {
  createStore,
  deleteStore,
  getStore,
  listProducts,
  listStores,
  updateStore,
} from '../seeds/in-memory-db';
import { httpResponse } from '../utils/http-response';
import { validateRequestBody } from '../utils/validate-request-body';

export function registerStoreRoutes(server: Server) {
  server.get('/stores', () => {
    return httpResponse.ok(listStores());
  });

  server.post('/stores', (_schema, request) => {
    const validationResult = validateRequestBody(
      request,
      createStoreDtoSchema,
      'Payload inválido para criação de loja.',
    );

    if (!validationResult.success) {
      return validationResult.response;
    }

    return httpResponse.created(createStore(validationResult.data));
  });

  server.put('/stores/:storeId', (_schema, request) => {
    const storeId = request.params.storeId;

    if (!storeId) {
      return httpResponse.notFound('Loja não encontrada.');
    }

    const validationResult = validateRequestBody(
      request,
      updateStoreDtoSchema,
      'Payload inválido para atualização de loja.',
    );

    if (!validationResult.success) {
      return validationResult.response;
    }

    const nextStore = updateStore(storeId, validationResult.data);

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
