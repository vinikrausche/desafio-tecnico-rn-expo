import { create } from 'zustand';

import { productsService } from '../features/products/services/products.service';
import type {
  CreateProductInput,
  ProductSummary,
  UpdateProductInput,
} from '../features/products/product.types';
import { useStoreZustand } from './store';

type ResourceStatus = 'idle' | 'loading' | 'ready' | 'error';

type LoadOptions = {
  force?: boolean;
};

type ProductCacheSnapshot = {
  productIds: string[];
  productIdsByStore: Record<string, string[]>;
  productsById: Record<string, ProductSummary>;
};

type ProductZustandState = {
  catalogErrorMessage: string | null;
  catalogStatus: ResourceStatus;
  hasLoadedCatalog: boolean;
  productIds: string[];
  productIdsByStore: Record<string, string[]>;
  productsById: Record<string, ProductSummary>;
  storeErrorMessageById: Record<string, string | null>;
  storeStatusById: Record<string, ResourceStatus>;
  storesLoadedById: Record<string, boolean>;
  createProduct: (payload: CreateProductInput) => Promise<ProductSummary>;
  deleteProduct: (productId: string, storeId: string) => Promise<void>;
  loadCatalog: (options?: LoadOptions) => Promise<ProductSummary[]>;
  loadProductsByStore: (
    storeId: string,
    options?: LoadOptions,
  ) => Promise<ProductSummary[]>;
  removeProductsByStore: (storeId: string) => void;
  updateProduct: (
    productId: string,
    payload: UpdateProductInput,
  ) => Promise<ProductSummary>;
};

let catalogRequest: Promise<ProductSummary[]> | null = null;
const storeRequests = new Map<string, Promise<ProductSummary[]>>();

function ensureUniqueIds(ids: string[], nextId: string): string[] {
  return ids.includes(nextId) ? ids : [...ids, nextId];
}

function normalizeProducts(products: ProductSummary[]): ProductCacheSnapshot {
  return products.reduce<ProductCacheSnapshot>(
    (accumulator, product) => {
      accumulator.productIds.push(product.id);
      accumulator.productsById[product.id] = product;
      accumulator.productIdsByStore[product.storeId] = ensureUniqueIds(
        accumulator.productIdsByStore[product.storeId] ?? [],
        product.id,
      );

      return accumulator;
    },
    {
      productIds: [],
      productIdsByStore: {},
      productsById: {},
    },
  );
}

function readCatalogProducts(state: ProductZustandState): ProductSummary[] {
  return state.productIds
    .map((productId) => state.productsById[productId])
    .filter((product): product is ProductSummary => Boolean(product));
}

function readProductsByStore(
  state: ProductZustandState,
  storeId: string,
): ProductSummary[] {
  const productIds = state.productIdsByStore[storeId] ?? [];

  return productIds
    .map((productId) => state.productsById[productId])
    .filter((product): product is ProductSummary => Boolean(product));
}

function upsertProduct(
  state: ProductZustandState,
  nextProduct: ProductSummary,
): ProductCacheSnapshot {
  return {
    productIds: ensureUniqueIds(state.productIds, nextProduct.id),
    productIdsByStore: {
      ...state.productIdsByStore,
      [nextProduct.storeId]: ensureUniqueIds(
        state.productIdsByStore[nextProduct.storeId] ?? [],
        nextProduct.id,
      ),
    },
    productsById: {
      ...state.productsById,
      [nextProduct.id]: nextProduct,
    },
  };
}

function removeProductFromState(
  state: ProductZustandState,
  productId: string,
  storeId: string,
): ProductCacheSnapshot {
  const nextProductsById = { ...state.productsById };
  delete nextProductsById[productId];

  const currentStoreProductIds = state.productIdsByStore[storeId] ?? [];

  return {
    productIds: state.productIds.filter(
      (currentProductId) => currentProductId !== productId,
    ),
    productIdsByStore: {
      ...state.productIdsByStore,
      [storeId]: currentStoreProductIds.filter(
        (currentProductId) => currentProductId !== productId,
      ),
    },
    productsById: nextProductsById,
  };
}

function removeProductsByStoreFromState(
  state: ProductZustandState,
  storeId: string,
): ProductCacheSnapshot {
  const storeProductIds = state.productIdsByStore[storeId] ?? [];
  const nextProductsById = { ...state.productsById };

  storeProductIds.forEach((productId) => {
    delete nextProductsById[productId];
  });

  const nextProductIdsByStore = { ...state.productIdsByStore };
  delete nextProductIdsByStore[storeId];

  return {
    productIds: state.productIds.filter(
      (productId) => !storeProductIds.includes(productId),
    ),
    productIdsByStore: nextProductIdsByStore,
    productsById: nextProductsById,
  };
}

async function requestCatalogFromApi(): Promise<ProductSummary[]> {
  if (!catalogRequest) {
    catalogRequest = productsService.list().finally(() => {
      catalogRequest = null;
    });
  }

  return catalogRequest;
}

async function requestProductsByStoreFromApi(
  storeId: string,
): Promise<ProductSummary[]> {
  const inFlightRequest = storeRequests.get(storeId);

  if (inFlightRequest) {
    return inFlightRequest;
  }

  const request = productsService.listByStore(storeId).finally(() => {
    storeRequests.delete(storeId);
  });

  storeRequests.set(storeId, request);

  return request;
}

// ! Zustand de produtos: guarda catalogo global e tambem cache por loja para evitar novas requisicoes.
export const useProductZustand = create<ProductZustandState>((set, get) => ({
  catalogErrorMessage: null,
  catalogStatus: 'idle',
  hasLoadedCatalog: false,
  productIds: [],
  productIdsByStore: {},
  productsById: {},
  storeErrorMessageById: {},
  storeStatusById: {},
  storesLoadedById: {},

  async createProduct(payload) {
    const createdProduct = await productsService.create(payload);

    set((state) => ({
      ...upsertProduct(state, createdProduct),
      catalogErrorMessage: null,
      catalogStatus: state.hasLoadedCatalog ? 'ready' : state.catalogStatus,
      storeErrorMessageById: {
        ...state.storeErrorMessageById,
        [createdProduct.storeId]: null,
      },
      storeStatusById: {
        ...state.storeStatusById,
        [createdProduct.storeId]: 'ready',
      },
      storesLoadedById: {
        ...state.storesLoadedById,
        [createdProduct.storeId]: true,
      },
    }));

    useStoreZustand.getState().adjustProductCount(createdProduct.storeId);

    return createdProduct;
  },

  async deleteProduct(productId, storeId) {
    await productsService.delete(productId);

    set((state) => ({
      ...removeProductFromState(state, productId, storeId),
      catalogErrorMessage: null,
      storeErrorMessageById: {
        ...state.storeErrorMessageById,
        [storeId]: null,
      },
      storeStatusById: {
        ...state.storeStatusById,
        [storeId]: 'ready',
      },
    }));

    useStoreZustand.getState().adjustProductCount(storeId, -1);
  },

  async loadCatalog(options = {}) {
    const { force = false } = options;
    const currentState = get();

    if (!force && currentState.hasLoadedCatalog) {
      return readCatalogProducts(currentState);
    }

    if (!force && currentState.catalogStatus === 'loading' && catalogRequest) {
      return catalogRequest;
    }

    set({
      catalogErrorMessage: null,
      catalogStatus: 'loading',
    });

    try {
      const products = await requestCatalogFromApi();

      set((state) => ({
        ...normalizeProducts(products),
        catalogErrorMessage: null,
        catalogStatus: 'ready',
        hasLoadedCatalog: true,
        storeErrorMessageById: state.storeErrorMessageById,
        storeStatusById: state.storeStatusById,
        storesLoadedById: state.storesLoadedById,
      }));

      return products;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel carregar os produtos.';

      set({
        catalogErrorMessage: message,
        catalogStatus: 'error',
      });

      throw error;
    }
  },

  async loadProductsByStore(storeId, options = {}) {
    const { force = false } = options;
    const currentState = get();

    if (currentState.hasLoadedCatalog) {
      if (force) {
        const products = await get().loadCatalog({ force: true });
        return products.filter((product) => product.storeId === storeId);
      }

      set((state) => ({
        storeErrorMessageById: {
          ...state.storeErrorMessageById,
          [storeId]: null,
        },
        storeStatusById: {
          ...state.storeStatusById,
          [storeId]: 'ready',
        },
        storesLoadedById: {
          ...state.storesLoadedById,
          [storeId]: true,
        },
      }));

      return readProductsByStore(currentState, storeId);
    }

    if (!force && currentState.storesLoadedById[storeId]) {
      return readProductsByStore(currentState, storeId);
    }

    if (
      !force &&
      currentState.storeStatusById[storeId] === 'loading' &&
      storeRequests.has(storeId)
    ) {
      return storeRequests.get(storeId) as Promise<ProductSummary[]>;
    }

    set((state) => ({
      storeErrorMessageById: {
        ...state.storeErrorMessageById,
        [storeId]: null,
      },
      storeStatusById: {
        ...state.storeStatusById,
        [storeId]: 'loading',
      },
    }));

    try {
      const products = await requestProductsByStoreFromApi(storeId);
      const scopedSnapshot = normalizeProducts(products);

      set((state) => ({
        productIds: scopedSnapshot.productIds.reduce(
          (ids, productId) => ensureUniqueIds(ids, productId),
          state.productIds,
        ),
        productIdsByStore: {
          ...state.productIdsByStore,
          [storeId]: scopedSnapshot.productIds,
        },
        productsById: {
          ...state.productsById,
          ...scopedSnapshot.productsById,
        },
        storeErrorMessageById: {
          ...state.storeErrorMessageById,
          [storeId]: null,
        },
        storeStatusById: {
          ...state.storeStatusById,
          [storeId]: 'ready',
        },
        storesLoadedById: {
          ...state.storesLoadedById,
          [storeId]: true,
        },
      }));

      return products;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel carregar os produtos.';

      set((state) => ({
        storeErrorMessageById: {
          ...state.storeErrorMessageById,
          [storeId]: message,
        },
        storeStatusById: {
          ...state.storeStatusById,
          [storeId]: 'error',
        },
      }));

      throw error;
    }
  },

  removeProductsByStore(storeId) {
    set((state) => {
      const nextSnapshot = removeProductsByStoreFromState(state, storeId);

      return {
        ...nextSnapshot,
        storeErrorMessageById: {
          ...state.storeErrorMessageById,
          [storeId]: null,
        },
        storeStatusById: {
          ...state.storeStatusById,
          [storeId]: 'idle',
        },
        storesLoadedById: {
          ...state.storesLoadedById,
          [storeId]: false,
        },
      };
    });
  },

  async updateProduct(productId, payload) {
    const updatedProduct = await productsService.update(productId, payload);

    set((state) => ({
      ...upsertProduct(state, updatedProduct),
      catalogErrorMessage: null,
      catalogStatus: state.hasLoadedCatalog ? 'ready' : state.catalogStatus,
      storeErrorMessageById: {
        ...state.storeErrorMessageById,
        [updatedProduct.storeId]: null,
      },
      storeStatusById: {
        ...state.storeStatusById,
        [updatedProduct.storeId]: 'ready',
      },
      storesLoadedById: {
        ...state.storesLoadedById,
        [updatedProduct.storeId]: true,
      },
    }));

    return updatedProduct;
  },
}));
