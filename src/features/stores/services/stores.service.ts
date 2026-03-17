import { requestJson } from '../../../lib/api/client';
import type {
  CreateStoreInput,
  StoreSummary,
  UpdateStoreInput,
} from '../store.types';

// ! Services isolate the stores screens from the HTTP transport.
export const storesService = {
  create(payload: CreateStoreInput) {
    return requestJson<StoreSummary>('/stores', {
      body: payload,
      method: 'POST',
    });
  },
  delete(storeId: string) {
    return requestJson<void>(`/stores/${storeId}`, {
      method: 'DELETE',
    });
  },
  list() {
    return requestJson<StoreSummary[]>('/stores');
  },
  update(storeId: string, payload: UpdateStoreInput) {
    return requestJson<StoreSummary>(`/stores/${storeId}`, {
      body: payload,
      method: 'PUT',
    });
  },
};
