import type {
  CreateProductPayload,
  ProductEntity,
  UpdateProductPayload,
} from '../../../features/products/types/product';
import type {
  CreateStorePayload,
  StoreEntity,
  UpdateStorePayload,
} from '../../../features/stores/types/store';

type StoreRecord = Omit<StoreEntity, 'productCount'>;

const seedStores: StoreRecord[] = [
  {
    address: 'Av. Paulista, 1000 - São Paulo/SP',
    id: 'demo-store',
    name: 'Loja Conceito Paulista',
  },
  {
    address: 'Rua das Flores, 42 - Curitiba/PR',
    id: 'branch-curitiba',
    name: 'Filial Curitiba Centro',
  },
];

const seedProducts: ProductEntity[] = [
  {
    category: 'Eletrônicos',
    id: 'product-tablet-01',
    name: 'Tablet Institucional',
    price: 1899.9,
    storeId: 'demo-store',
  },
  {
    category: 'Acessórios',
    id: 'product-headset-01',
    name: 'Headset de Atendimento',
    price: 299.9,
    storeId: 'branch-curitiba',
  },
];

let storesDb = clone(seedStores);
let productsDb = clone(seedProducts);

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function buildStoreSummary(store: StoreRecord): StoreEntity {
  return {
    ...store,
    productCount: productsDb.filter((product) => product.storeId === store.id).length,
  };
}

function generateId(prefix: 'product' | 'store'): string {
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${Date.now()}-${suffix}`;
}

export function createProduct(payload: CreateProductPayload): ProductEntity {
  const nextProduct: ProductEntity = {
    ...payload,
    id: generateId('product'),
  };

  productsDb = [...productsDb, nextProduct];

  return clone(nextProduct);
}

export function createStore(payload: CreateStorePayload): StoreEntity {
  const nextStore: StoreRecord = {
    ...payload,
    id: generateId('store'),
  };

  storesDb = [...storesDb, nextStore];

  return buildStoreSummary(nextStore);
}

export function deleteProduct(productId: string): boolean {
  const previousLength = productsDb.length;
  productsDb = productsDb.filter((product) => product.id !== productId);
  return previousLength !== productsDb.length;
}

export function deleteStore(storeId: string): boolean {
  const previousLength = storesDb.length;
  storesDb = storesDb.filter((store) => store.id !== storeId);
  productsDb = productsDb.filter((product) => product.storeId !== storeId);
  return previousLength !== storesDb.length;
}

export function getStore(storeId: string): StoreEntity | undefined {
  const store = storesDb.find((item) => item.id === storeId);
  return store ? buildStoreSummary(store) : undefined;
}

export function listProducts(storeId?: string): ProductEntity[] {
  const scopedProducts = storeId
    ? productsDb.filter((product) => product.storeId === storeId)
    : productsDb;

  return clone(scopedProducts);
}

export function listStores(): StoreEntity[] {
  return storesDb.map(buildStoreSummary);
}

export function resetMockDb() {
  storesDb = clone(seedStores);
  productsDb = clone(seedProducts);
}

export function updateProduct(
  productId: string,
  payload: UpdateProductPayload,
): ProductEntity | undefined {
  const currentProduct = productsDb.find((product) => product.id === productId);

  if (!currentProduct) {
    return undefined;
  }

  const nextProduct: ProductEntity = {
    ...currentProduct,
    ...payload,
  };

  productsDb = productsDb.map((product) =>
    product.id === productId ? nextProduct : product,
  );

  return clone(nextProduct);
}

export function updateStore(
  storeId: string,
  payload: UpdateStorePayload,
): StoreEntity | undefined {
  const currentStore = storesDb.find((store) => store.id === storeId);

  if (!currentStore) {
    return undefined;
  }

  const nextStore: StoreRecord = {
    ...currentStore,
    ...payload,
  };

  storesDb = storesDb.map((store) => (store.id === storeId ? nextStore : store));

  return buildStoreSummary(nextStore);
}
