import type {
  CreateStorePayload,
  StoreEntity,
  UpdateStorePayload,
} from '../types/store';
import { requestJson } from '../../../lib/api/client';

export const storeRepository = {
  createStore: (payload: CreateStorePayload) =>
    requestJson<StoreEntity>('/stores', {
      body: payload,
      method: 'POST',
    }),
  deleteStore: (storeId: string) =>
    requestJson<void>(`/stores/${storeId}`, {
      method: 'DELETE',
    }),
  getStores: () => requestJson<StoreEntity[]>('/stores'),
  updateStore: (storeId: string, payload: UpdateStorePayload) =>
    requestJson<StoreEntity>(`/stores/${storeId}`, {
      body: payload,
      method: 'PUT',
    }),
};
