import type {
  CreateProductPayload,
  UpdateProductPayload,
} from '../dto/product.dto';
import type {
  CreateStorePayload,
  UpdateStorePayload,
} from '../dto/store.dto';
import {
  readMockDb,
  writeMockDb,
  type ProductEntity,
  type StoreEntity,
  type StoreRecord,
} from '../seeds/in-memory-db';

function buildStoreSummary(
  store: StoreRecord,
  products: ProductEntity[],
): StoreEntity {
  return {
    ...store,
    productCount: products.filter((product) => product.storeId === store.id).length,
  };
}

function generateId(prefix: 'product' | 'store'): string {
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${Date.now()}-${suffix}`;
}

// ! This model is the only layer allowed to mutate the in-memory database.
export const mockRetailModel = {
  createProduct(payload: CreateProductPayload): ProductEntity {
    const snapshot = readMockDb();

    const nextProduct: ProductEntity = {
      ...payload,
      id: generateId('product'),
    };

    writeMockDb({
      ...snapshot,
      products: [...snapshot.products, nextProduct],
    });

    return nextProduct;
  },
  createStore(payload: CreateStorePayload): StoreEntity {
    const snapshot = readMockDb();

    const nextStore: StoreRecord = {
      ...payload,
      id: generateId('store'),
    };

    writeMockDb({
      ...snapshot,
      stores: [...snapshot.stores, nextStore],
    });

    return buildStoreSummary(nextStore, snapshot.products);
  },
  deleteProduct(productId: string): boolean {
    const snapshot = readMockDb();
    const nextProducts = snapshot.products.filter((product) => product.id !== productId);

    if (nextProducts.length === snapshot.products.length) {
      return false;
    }

    writeMockDb({
      ...snapshot,
      products: nextProducts,
    });

    return true;
  },
  deleteStore(storeId: string): boolean {
    const snapshot = readMockDb();
    const nextStores = snapshot.stores.filter((store) => store.id !== storeId);

    if (nextStores.length === snapshot.stores.length) {
      return false;
    }

    writeMockDb({
      products: snapshot.products.filter((product) => product.storeId !== storeId),
      stores: nextStores,
    });

    return true;
  },
  getStore(storeId: string): StoreEntity | undefined {
    const snapshot = readMockDb();
    const store = snapshot.stores.find((item) => item.id === storeId);

    return store ? buildStoreSummary(store, snapshot.products) : undefined;
  },
  listProducts(storeId?: string): ProductEntity[] {
    const snapshot = readMockDb();

    if (!storeId) {
      return snapshot.products;
    }

    return snapshot.products.filter((product) => product.storeId === storeId);
  },
  listStores(): StoreEntity[] {
    const snapshot = readMockDb();

    return snapshot.stores.map((store) => buildStoreSummary(store, snapshot.products));
  },
  updateProduct(
    productId: string,
    payload: UpdateProductPayload,
  ): ProductEntity | undefined {
    const snapshot = readMockDb();
    const currentProduct = snapshot.products.find((product) => product.id === productId);

    if (!currentProduct) {
      return undefined;
    }

    const nextProduct: ProductEntity = {
      ...currentProduct,
      ...payload,
    };

    writeMockDb({
      ...snapshot,
      products: snapshot.products.map((product) =>
        product.id === productId ? nextProduct : product,
      ),
    });

    return nextProduct;
  },
  updateStore(
    storeId: string,
    payload: UpdateStorePayload,
  ): StoreEntity | undefined {
    const snapshot = readMockDb();
    const currentStore = snapshot.stores.find((store) => store.id === storeId);

    if (!currentStore) {
      return undefined;
    }

    const nextStore: StoreRecord = {
      ...currentStore,
      ...payload,
    };

    writeMockDb({
      ...snapshot,
      stores: snapshot.stores.map((store) =>
        store.id === storeId ? nextStore : store,
      ),
    });

    return buildStoreSummary(nextStore, snapshot.products);
  },
};
