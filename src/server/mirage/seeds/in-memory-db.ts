export type ProductEntity = {
  category: string;
  id: string;
  name: string;
  price: number;
  storeId: string;
};

export type StoreEntity = {
  address: string;
  id: string;
  name: string;
  productCount: number;
};

export type StoreRecord = Omit<StoreEntity, 'productCount'>;

export type MockDatabaseState = {
  products: ProductEntity[];
  stores: StoreRecord[];
};

const initialMockDb: MockDatabaseState = {
  products: [],
  stores: [],
};

let mockDb = clone(initialMockDb);

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

// ! Seed helpers expose the raw database snapshot; CRUD lives in the model layer.
export function readMockDb(): MockDatabaseState {
  return clone(mockDb);
}

export function resetMockDb() {
  mockDb = clone(initialMockDb);
}

export function writeMockDb(nextState: MockDatabaseState) {
  mockDb = clone(nextState);
}
