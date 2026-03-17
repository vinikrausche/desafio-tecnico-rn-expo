// ! Shared store contracts used by screens and app services.
export type StoreSummary = {
  address: string;
  id: string;
  name: string;
  productCount: number;
};

export type CreateStoreInput = {
  address: string;
  name: string;
};
