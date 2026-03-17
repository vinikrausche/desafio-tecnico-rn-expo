import type {
  CreateProductPayload,
  UpdateProductPayload,
} from '../dto/product.dto';
import {
  readMockDb,
  type MockDatabaseState,
  type ProductEntity,
  writeMockDb,
} from '../seeds/in-memory-db';
import { generateModelId } from './model-id';

// ! Helpers puros deixam a transformacao dos dados fora da API publica do model.
function buildProductEntity(payload: CreateProductPayload): ProductEntity {
  return {
    ...payload,
    id: generateModelId('product'),
  };
}

function findProductById(
  products: ProductEntity[],
  productId: string,
): ProductEntity | undefined {
  return products.find((product) => product.id === productId);
}

function replaceProduct(
  products: ProductEntity[],
  nextProduct: ProductEntity,
): ProductEntity[] {
  return products.map((product) =>
    product.id === nextProduct.id ? nextProduct : product,
  );
}

function writeProducts(
  snapshot: MockDatabaseState,
  products: ProductEntity[],
): void {
  writeMockDb({
    ...snapshot,
    products,
  });
}

// ! Este model concentra a persistencia de produtos e evita repeticao nas rotas.
export const productModel = {
  create(payload: CreateProductPayload): ProductEntity {
    const snapshot = readMockDb();
    const nextProduct = buildProductEntity(payload);

    writeProducts(snapshot, [...snapshot.products, nextProduct]);

    return nextProduct;
  },

  delete(productId: string): boolean {
    const snapshot = readMockDb();
    const nextProducts = snapshot.products.filter(
      (product) => product.id !== productId,
    );

    if (nextProducts.length === snapshot.products.length) {
      return false;
    }

    writeProducts(snapshot, nextProducts);

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
    const currentProduct = findProductById(snapshot.products, productId);

    if (!currentProduct) {
      return undefined;
    }

    const nextProduct: ProductEntity = {
      ...currentProduct,
      ...payload,
    };

    writeProducts(snapshot, replaceProduct(snapshot.products, nextProduct));

    return nextProduct;
  },
};
