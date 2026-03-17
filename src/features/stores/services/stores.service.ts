import { requestJson } from '../../../lib/api/client';
import type { CreateStoreInput, StoreSummary } from '../store.types';

// ! Services isolate the stores screens from the HTTP transport.
export const storesService = {
  create(payload: CreateStoreInput) {
    return requestJson<StoreSummary>('/stores', {
      body: payload,
      method: 'POST',
    });
  },
  list() {
    return requestJson<StoreSummary[]>('/stores');
  },
};
