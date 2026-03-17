import type {
  CreateProductPayload,
  UpdateProductPayload,
} from '../dto/product.dto';
import {
  readMockDb,
  writeMockDb,
  type ProductEntity,
} from '../seeds/in-memory-db';
import { generateModelId } from './model-id';

function replaceProduct(
  products: ProductEntity[],
  nextProduct: ProductEntity,
): ProductEntity[] {
  return products.map((product) =>
    product.id === nextProduct.id ? nextProduct : product,
  );
}

// ! Product persistence stays isolated here so routes and screens do not touch the raw db shape.
export const productModel = {
  create(payload: CreateProductPayload): ProductEntity {
    const snapshot = readMockDb();

    const nextProduct: ProductEntity = {
      ...payload,
      id: generateModelId('product'),
    };

    writeMockDb({
      ...snapshot,
      products: [...snapshot.products, nextProduct],
    });

    return nextProduct;
  },
  delete(productId: string): boolean {
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
  list(storeId?: string): ProductEntity[] {
    const snapshot = readMockDb();

    if (!storeId) {
      return snapshot.products;
    }

    return snapshot.products.filter((product) => product.storeId === storeId);
  },
  update(
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
      products: replaceProduct(snapshot.products, nextProduct),
    });

    return nextProduct;
  },
};
