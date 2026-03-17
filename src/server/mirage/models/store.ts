import type { CreateStorePayload, UpdateStorePayload } from '../dto/store.dto';
import {
  readMockDb,
  type MockDatabaseState,
  type ProductEntity,
  type StoreEntity,
  type StoreRecord,
  writeMockDb,
} from '../seeds/in-memory-db';
import { generateModelId } from './model-id';

// ! Helpers puros deixam a transformacao dos dados fora da API publica do model.
function countProductsByStore(
  products: ProductEntity[],
  storeId: string,
): number {
  return products.filter((product) => product.storeId === storeId).length;
}

function buildStoreSummary(
  store: StoreRecord,
  products: ProductEntity[],
): StoreEntity {
  return {
    ...store,
    productCount: countProductsByStore(products, store.id),
  };
}

function buildStoreRecord(payload: CreateStorePayload): StoreRecord {
  return {
    ...payload,
    id: generateModelId('store'),
  };
}

function findStoreById(
  stores: StoreRecord[],
  storeId: string,
): StoreRecord | undefined {
  return stores.find((store) => store.id === storeId);
}

function replaceStore(
  stores: StoreRecord[],
  nextStore: StoreRecord,
): StoreRecord[] {
  return stores.map((store) => (store.id === nextStore.id ? nextStore : store));
}

function writeStores(snapshot: MockDatabaseState, stores: StoreRecord[]): void {
  writeMockDb({
    ...snapshot,
    stores,
  });
}

// ! Exclusao de loja precisa atualizar lojas e produtos juntos no banco em memoria.
function writeStoreState(
  stores: StoreRecord[],
  products: ProductEntity[],
): void {
  writeMockDb({
    products,
    stores,
  });
}

// ! Este model concentra a persistencia de lojas e evita repetição nas rotas.
export const storeModel = {
  create(payload: CreateStorePayload): StoreEntity {
    const snapshot = readMockDb();
    const nextStore = buildStoreRecord(payload);

    writeStores(snapshot, [...snapshot.stores, nextStore]);

    return buildStoreSummary(nextStore, snapshot.products);
  },

  delete(storeId: string): boolean {
    const snapshot = readMockDb();
    const nextStores = snapshot.stores.filter((store) => store.id !== storeId);

    if (nextStores.length === snapshot.stores.length) {
      return false;
    }

    const nextProducts = snapshot.products.filter(
      (product) => product.storeId !== storeId,
    );

    writeStoreState(nextStores, nextProducts);

    return true;
  },

  get(storeId: string): StoreEntity | undefined {
    const snapshot = readMockDb();
    const store = findStoreById(snapshot.stores, storeId);

    return store ? buildStoreSummary(store, snapshot.products) : undefined;
  },

  list(): StoreEntity[] {
    const snapshot = readMockDb();

    return snapshot.stores.map((store) =>
      buildStoreSummary(store, snapshot.products),
    );
  },

  update(
    storeId: string,
    payload: UpdateStorePayload,
  ): StoreEntity | undefined {
    const snapshot = readMockDb();
    const currentStore = findStoreById(snapshot.stores, storeId);

    if (!currentStore) {
      return undefined;
    }

    const nextStore: StoreRecord = {
      ...currentStore,
      ...payload,
    };

    writeStores(snapshot, replaceStore(snapshot.stores, nextStore));

    return buildStoreSummary(nextStore, snapshot.products);
  },
};
