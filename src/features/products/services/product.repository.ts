import type {
  CreateProductPayload,
  ProductEntity,
  UpdateProductPayload,
} from '../types/product';
import { requestJson } from '../../../lib/api/client';

export const productRepository = {
  createProduct: (payload: CreateProductPayload) =>
    requestJson<ProductEntity>('/products', {
      body: payload,
      method: 'POST',
    }),
  deleteProduct: (productId: string) =>
    requestJson<void>(`/products/${productId}`, {
      method: 'DELETE',
    }),
  getProductsByStore: (storeId: string) =>
    requestJson<ProductEntity[]>(`/products?storeId=${encodeURIComponent(storeId)}`),
  updateProduct: (productId: string, payload: UpdateProductPayload) =>
    requestJson<ProductEntity>(`/products/${productId}`, {
      body: payload,
      method: 'PUT',
    }),
};
