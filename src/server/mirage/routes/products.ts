import type { Server } from 'miragejs';

import {
  createProductDtoSchema,
  updateProductDtoSchema,
} from '../dto/product.dto';
import {
  createProduct,
  deleteProduct,
  getStore,
  listProducts,
  updateProduct,
} from '../seeds/in-memory-db';
import { httpResponse } from '../utils/http-response';
import { validateRequestBody } from '../utils/validate-request-body';

export function registerProductRoutes(server: Server) {
  server.get('/products', (_schema, request) => {
    const storeId =
      typeof request.queryParams.storeId === 'string'
        ? request.queryParams.storeId
        : undefined;

    return httpResponse.ok(listProducts(storeId));
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

    if (!getStore(validationResult.data.storeId)) {
      return httpResponse.notFound('A loja informada não existe.');
    }

    return httpResponse.created(createProduct(validationResult.data));
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

    const nextProduct = updateProduct(productId, validationResult.data);

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

    const removed = deleteProduct(productId);

    if (!removed) {
      return httpResponse.notFound('Produto não encontrado.');
    }

    return httpResponse.noContent();
  });
}
