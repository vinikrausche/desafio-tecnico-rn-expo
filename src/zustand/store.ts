import { create } from 'zustand';

import { storesService } from '../features/stores/services/stores.service';
import type {
  CreateStoreInput,
  StoreSummary,
  UpdateStoreInput,
} from '../features/stores/store.types';

type ResourceStatus = 'idle' | 'loading' | 'ready' | 'error';

type LoadOptions = {
  force?: boolean;
};

type StoreCacheSnapshot = {
  storeIds: string[];
  storesById: Record<string, StoreSummary>;
};

type StoreZustandState = {
  errorMessage: string | null;
  hasLoadedOnce: boolean;
  status: ResourceStatus;
  storeIds: string[];
  storesById: Record<string, StoreSummary>;
  createStore: (payload: CreateStoreInput) => Promise<StoreSummary>;
  deleteStore: (storeId: string) => Promise<void>;
  adjustProductCount: (storeId: string, amount?: number) => void;
  loadStores: (options?: LoadOptions) => Promise<StoreSummary[]>;
  updateStore: (storeId: string, payload: UpdateStoreInput) => Promise<StoreSummary>;
};

let storesRequest: Promise<StoreSummary[]> | null = null;

function normalizeStores(stores: StoreSummary[]): StoreCacheSnapshot {
  const storesById = stores.reduce<Record<string, StoreSummary>>((accumulator, store) => {
    accumulator[store.id] = store;
    return accumulator;
  }, {});

  return {
    storeIds: stores.map((store) => store.id),
    storesById,
  };
}

function readOrderedStores(state: StoreZustandState): StoreSummary[] {
  return state.storeIds
    .map((storeId) => state.storesById[storeId])
    .filter((store): store is StoreSummary => Boolean(store));
}

function upsertStore(
  state: StoreZustandState,
  nextStore: StoreSummary,
): StoreCacheSnapshot {
  const hasStore = Boolean(state.storesById[nextStore.id]);

  return {
    storeIds: hasStore ? state.storeIds : [...state.storeIds, nextStore.id],
    storesById: {
      ...state.storesById,
      [nextStore.id]: nextStore,
    },
  };
}

function removeStore(
  state: StoreZustandState,
  storeId: string,
): StoreCacheSnapshot {
  const nextStoresById = { ...state.storesById };
  delete nextStoresById[storeId];

  return {
    storeIds: state.storeIds.filter((currentStoreId) => currentStoreId !== storeId),
    storesById: nextStoresById,
  };
}

async function requestStoresFromApi(): Promise<StoreSummary[]> {
  if (!storesRequest) {
    storesRequest = storesService.list().finally(() => {
      storesRequest = null;
    });
  }

  return storesRequest;
}

// ! Zustand de lojas: carrega uma vez, reaproveita cache e atualiza localmente apos mutacoes.
export const useStoreZustand = create<StoreZustandState>((set, get) => ({
  errorMessage: null,
  hasLoadedOnce: false,
  status: 'idle',
  storeIds: [],
  storesById: {},

  async createStore(payload) {
    const createdStore = await storesService.create(payload);

    set((state) => ({
      ...upsertStore(state, createdStore),
      errorMessage: null,
      hasLoadedOnce: true,
      status: 'ready',
    }));

    return createdStore;
  },

  async deleteStore(storeId) {
    await storesService.delete(storeId);

    set((state) => ({
      ...removeStore(state, storeId),
      errorMessage: null,
      status: 'ready',
    }));
  },

  adjustProductCount(storeId, amount = 1) {
    set((state) => {
      const currentStore = state.storesById[storeId];

      if (!currentStore) {
        return state;
      }

      const nextProductCount = Math.max(0, currentStore.productCount + amount);

      return {
        storesById: {
          ...state.storesById,
          [storeId]: {
            ...currentStore,
            productCount: nextProductCount,
          },
        },
      };
    });
  },

  async loadStores(options = {}) {
    const { force = false } = options;
    const currentState = get();

    if (!force && currentState.hasLoadedOnce) {
      return readOrderedStores(currentState);
    }

    if (!force && currentState.status === 'loading' && storesRequest) {
      return storesRequest;
    }

    set({
      errorMessage: null,
      status: 'loading',
    });

    try {
      const stores = await requestStoresFromApi();

      set({
        ...normalizeStores(stores),
        errorMessage: null,
        hasLoadedOnce: true,
        status: 'ready',
      });

      return stores;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Nao foi possivel carregar as lojas.';

      set({
        errorMessage: message,
        status: 'error',
      });

      throw error;
    }
  },

  async updateStore(storeId, payload) {
    const updatedStore = await storesService.update(storeId, payload);

    set((state) => ({
      ...upsertStore(state, updatedStore),
      errorMessage: null,
      hasLoadedOnce: true,
      status: 'ready',
    }));

    return updatedStore;
  },
}));

export function selectStoreById(storeId: string) {
  return (state: StoreZustandState): StoreSummary | undefined =>
    state.storesById[storeId];
}
