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
import { generateModelId } from './model-id';
import { productModel } from './product.model';

function buildStoreSummary(
  store: StoreRecord,
  products: ProductEntity[],
): StoreEntity {
  return {
    ...store,
    productCount: products.filter((product) => product.storeId === store.id).length,
  };
}

// ! This model is the only layer allowed to mutate the in-memory database.
export const mockRetailModel = {
  createProduct(payload: CreateProductPayload): ProductEntity {
    return productModel.create(payload);
  },
  createStore(payload: CreateStorePayload): StoreEntity {
    const snapshot = readMockDb();

    const nextStore: StoreRecord = {
      ...payload,
      id: generateModelId('store'),
    };

    writeMockDb({
      ...snapshot,
      stores: [...snapshot.stores, nextStore],
    });

    return buildStoreSummary(nextStore, snapshot.products);
  },
  deleteProduct(productId: string): boolean {
    return productModel.delete(productId);
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
    return productModel.list(storeId);
  },
  listStores(): StoreEntity[] {
    const snapshot = readMockDb();

    return snapshot.stores.map((store) => buildStoreSummary(store, snapshot.products));
  },
  updateProduct(
    productId: string,
    payload: UpdateProductPayload,
  ): ProductEntity | undefined {
    return productModel.update(productId, payload);
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
