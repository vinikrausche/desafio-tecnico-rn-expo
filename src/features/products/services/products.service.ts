import { requestJson } from '../../../lib/api/client';
import type { CreateProductInput, ProductSummary } from '../product.types';

// ! Products service keeps screens isolated from request details.
export const productsService = {
  create(payload: CreateProductInput) {
    return requestJson<ProductSummary>('/products', {
      body: payload,
      method: 'POST',
    });
  },
  list() {
    return requestJson<ProductSummary[]>('/products');
  },
  listByStore(storeId: string) {
    return requestJson<ProductSummary[]>(`/stores/${storeId}/products`);
  },
};
