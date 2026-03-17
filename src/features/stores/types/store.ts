export type StoreEntity = {
  address: string;
  id: string;
  name: string;
  productCount: number;
};

export type CreateStorePayload = Pick<StoreEntity, 'address' | 'name'>;

export type UpdateStorePayload = CreateStorePayload;
