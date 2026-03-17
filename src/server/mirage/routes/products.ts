import type { Server } from 'miragejs';

import {
  createProductDtoSchema,
  updateProductDtoSchema,
} from '../dto/product.dto';
import { mockRetailModel } from '../models/mock-retail.model';
import { httpResponse } from '../utils/http-response';
import { validateRequestBody } from '../utils/validate-request-body';

// ! Product routes delegate persistence rules to the model layer.
export function registerProductRoutes(server: Server) {
  server.get('/products', (_schema, request) => {
    const storeId =
      typeof request.queryParams.storeId === 'string'
        ? request.queryParams.storeId
        : undefined;

    return httpResponse.ok(mockRetailModel.listProducts(storeId));
  });

  server.post('/products', (_schema, request) => {
    const validationResult = validateRequestBody(
      request,
      createProductDtoSchema,
      'Payload inválido para criação de produto.',
    );

    if (!validationResult.success) {
      return validationResult.response;
    }

    if (!mockRetailModel.getStore(validationResult.data.storeId)) {
      return httpResponse.notFound('A loja informada não existe.');
    }

    return httpResponse.created(
      mockRetailModel.createProduct(validationResult.data),
    );
  });

  server.put('/products/:productId', (_schema, request) => {
    const productId = request.params.productId;

    if (!productId) {
      return httpResponse.notFound('Produto não encontrado.');
    }

    const validationResult = validateRequestBody(
      request,
      updateProductDtoSchema,
      'Payload inválido para atualização de produto.',
    );

    if (!validationResult.success) {
      return validationResult.response;
    }

    const nextProduct = mockRetailModel.updateProduct(
      productId,
      validationResult.data,
    );

    if (!nextProduct) {
      return httpResponse.notFound('Produto não encontrado.');
    }

    return httpResponse.ok(nextProduct);
  });

  server.delete('/products/:productId', (_schema, request) => {
    const productId = request.params.productId;

    if (!productId) {
      return httpResponse.notFound('Produto não encontrado.');
    }

    const removed = mockRetailModel.deleteProduct(productId);

    if (!removed) {
      return httpResponse.notFound('Produto não encontrado.');
    }

    return httpResponse.noContent();
  });
}
