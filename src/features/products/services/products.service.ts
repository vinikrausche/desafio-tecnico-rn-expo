import { requestJson } from '../../../lib/api/client';
import type {
  CreateProductInput,
  ProductSummary,
  UpdateProductInput,
} from '../product.types';

// ! Products service keeps screens isolated from request details.
export const productsService = {
  create(payload: CreateProductInput) {
    return requestJson<ProductSummary>('/products', {
      body: payload,
      method: 'POST',
    });
  },
  delete(productId: string) {
    return requestJson<void>(`/products/${productId}`, {
      method: 'DELETE',
    });
  },
  list() {
    return requestJson<ProductSummary[]>('/products');
  },
  listByStore(storeId: string) {
    return requestJson<ProductSummary[]>(`/stores/${storeId}/products`);
  },
  update(productId: string, payload: UpdateProductInput) {
    return requestJson<ProductSummary>(`/products/${productId}`, {
      body: payload,
      method: 'PUT',
    });
  },
};
