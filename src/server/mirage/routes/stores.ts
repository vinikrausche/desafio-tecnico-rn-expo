import type { Server } from 'miragejs';

import { createStoreDtoSchema, updateStoreDtoSchema } from '../dto/store.dto';
import { mockRetailModel } from '../models/mock-retail.model';
import { httpResponse } from '../utils/http-response';
import { validateRequestBody } from '../utils/validate-request-body';

// ! Store routes delegate persistence rules to the model layer.
export function registerStoreRoutes(server: Server) {
  server.get('/stores', () => {
    return httpResponse.ok(mockRetailModel.listStores());
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

    return httpResponse.created(
      mockRetailModel.createStore(validationResult.data),
    );
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

    const nextStore = mockRetailModel.updateStore(
      storeId,
      validationResult.data,
    );

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

    const removed = mockRetailModel.deleteStore(storeId);

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

    const store = mockRetailModel.getStore(storeId);

    if (!store) {
      return httpResponse.notFound('Loja não encontrada.');
    }

    return httpResponse.ok(mockRetailModel.listProducts(storeId));
  });
}
