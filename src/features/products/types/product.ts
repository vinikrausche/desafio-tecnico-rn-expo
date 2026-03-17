export type ProductEntity = {
  category: string;
  id: string;
  name: string;
  price: number;
  storeId: string;
};

export type CreateProductPayload = Pick<
  ProductEntity,
  'category' | 'name' | 'price' | 'storeId'
>;

export type UpdateProductPayload = Pick<
  ProductEntity,
  'category' | 'name' | 'price'
>;
