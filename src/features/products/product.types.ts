// ! Shared product contracts used by the dashboard and product flows.
export type ProductSummary = {
  category: string;
  id: string;
  name: string;
  price: number;
  storeId: string;
  storeName?: string;
};

export type CreateProductInput = {
  category: string;
  name: string;
  price: number;
  storeId: string;
};
