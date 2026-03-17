import { productsService } from '../features/products/services/products.service';
import type { ProductSummary } from '../features/products/product.types';
import { useProductZustand } from './product';
import { useStoreZustand } from './store';

jest.mock('../features/products/services/products.service', () => ({
  productsService: {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
    listByStore: jest.fn(),
    update: jest.fn(),
  },
}));

const mockedProductsService = jest.mocked(productsService);
const initialProductState = useProductZustand.getState();
const initialStoreState = useStoreZustand.getState();

function resetProductZustand() {
  useProductZustand.setState(initialProductState, true);
}

function resetStoreZustand() {
  useStoreZustand.setState(initialStoreState, true);
}

describe('useProductZustand', () => {
  beforeEach(() => {
    resetProductZustand();
    resetStoreZustand();
    jest.clearAllMocks();
  });

  it('reutiliza o catalogo depois da primeira carga', async () => {
    const apiProducts: ProductSummary[] = [
      {
        category: 'Tecnologia',
        id: 'product-1',
        name: 'Notebook',
        price: 3500,
        storeId: 'store-1',
      },
    ];

    mockedProductsService.list.mockResolvedValue(apiProducts);

    const firstResult = await useProductZustand.getState().loadCatalog();
    const secondResult = await useProductZustand.getState().loadCatalog();

    expect(firstResult).toEqual(apiProducts);
    expect(secondResult).toEqual(apiProducts);
    expect(mockedProductsService.list).toHaveBeenCalledTimes(1);
  });

  it('adiciona o produto ao cache e incrementa a contagem da loja', async () => {
    useStoreZustand.setState((state) => ({
      ...state,
      hasLoadedOnce: true,
      status: 'ready',
      storeIds: ['store-1'],
      storesById: {
        'store-1': {
          address: 'Rua A, 10',
          id: 'store-1',
          name: 'Loja A',
          productCount: 0,
        },
      },
    }));

    const createdProduct: ProductSummary = {
      category: 'Tecnologia',
      id: 'product-1',
      name: 'Notebook',
      price: 3500,
      storeId: 'store-1',
    };

    mockedProductsService.create.mockResolvedValue(createdProduct);

    await useProductZustand.getState().createProduct({
      category: 'Tecnologia',
      name: 'Notebook',
      price: 3500,
      storeId: 'store-1',
    });

    expect(useProductZustand.getState().productsById['product-1']).toEqual(
      createdProduct,
    );
    expect(useProductZustand.getState().productIdsByStore['store-1']).toEqual([
      'product-1',
    ]);
    expect(useStoreZustand.getState().storesById['store-1']?.productCount).toBe(
      1,
    );
  });

  it('remove o produto do cache e decrementa a contagem da loja', async () => {
    useStoreZustand.setState((state) => ({
      ...state,
      hasLoadedOnce: true,
      status: 'ready',
      storeIds: ['store-1'],
      storesById: {
        'store-1': {
          address: 'Rua A, 10',
          id: 'store-1',
          name: 'Loja A',
          productCount: 1,
        },
      },
    }));
    useProductZustand.setState((state) => ({
      ...state,
      catalogStatus: 'ready',
      hasLoadedCatalog: true,
      productIds: ['product-1'],
      productIdsByStore: {
        'store-1': ['product-1'],
      },
      productsById: {
        'product-1': {
          category: 'Tecnologia',
          id: 'product-1',
          name: 'Notebook',
          price: 3500,
          storeId: 'store-1',
        },
      },
    }));

    mockedProductsService.delete.mockResolvedValue(undefined);

    await useProductZustand.getState().deleteProduct('product-1', 'store-1');

    expect(useProductZustand.getState().productIds).toEqual([]);
    expect(useProductZustand.getState().productsById).toEqual({});
    expect(useStoreZustand.getState().storesById['store-1']?.productCount).toBe(
      0,
    );
  });
});
