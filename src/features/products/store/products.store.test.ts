import { useStoreZustand } from '../../stores/store/stores.store';
import { productsService } from '../services/products.service';
import type { ProductSummary } from '../product.types';
import { useProductZustand } from './products.store';

jest.mock('../services/products.service', () => ({
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

function createProduct(
  overrides: Partial<ProductSummary> = {},
): ProductSummary {
  return {
    category: 'Tecnologia',
    id: 'product-1',
    name: 'Notebook',
    price: 3500,
    storeId: 'store-1',
    ...overrides,
  };
}

describe('useProductZustand', () => {
  beforeEach(() => {
    resetProductZustand();
    resetStoreZustand();
    jest.clearAllMocks();
  });

  it('reutiliza o catalogo depois da primeira carga', async () => {
    const apiProducts: ProductSummary[] = [createProduct()];

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

    const createdProduct = createProduct();

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
        'product-1': createProduct(),
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

  it('reutiliza o cache da loja quando ele ja foi carregado', async () => {
    const cachedProduct = createProduct();

    useProductZustand.setState((state) => ({
      ...state,
      productIds: ['product-1'],
      productIdsByStore: {
        'store-1': ['product-1'],
      },
      productsById: {
        'product-1': cachedProduct,
      },
      storeStatusById: {
        'store-1': 'ready',
      },
      storesLoadedById: {
        'store-1': true,
      },
    }));

    const result = await useProductZustand
      .getState()
      .loadProductsByStore('store-1');

    expect(result).toEqual([cachedProduct]);
    expect(mockedProductsService.listByStore).not.toHaveBeenCalled();
  });

  it('filtra os produtos da loja apos recarregar o catalogo com force', async () => {
    useProductZustand.setState((state) => ({
      ...state,
      catalogStatus: 'ready',
      hasLoadedCatalog: true,
      productIds: ['product-1'],
      productIdsByStore: {
        'store-1': ['product-1'],
      },
      productsById: {
        'product-1': createProduct(),
      },
    }));

    const refreshedCatalog = [
      createProduct({
        name: 'Notebook Pro',
        price: 4200,
      }),
      createProduct({
        id: 'product-2',
        name: 'Teclado',
        storeId: 'store-2',
      }),
    ];

    mockedProductsService.list.mockResolvedValue(refreshedCatalog);

    const result = await useProductZustand
      .getState()
      .loadProductsByStore('store-1', {
        force: true,
      });

    expect(result).toEqual([
      expect.objectContaining({
        id: 'product-1',
        name: 'Notebook Pro',
      }),
    ]);
    expect(mockedProductsService.list).toHaveBeenCalledTimes(1);
  });

  it('reaproveita a requisicao em andamento por loja', async () => {
    const storeProducts = [createProduct()];
    let resolveRequest: ((value: ProductSummary[]) => void) | undefined;

    mockedProductsService.listByStore.mockImplementation(
      () =>
        new Promise<ProductSummary[]>((resolve) => {
          resolveRequest = resolve;
        }),
    );

    const firstPromise = useProductZustand
      .getState()
      .loadProductsByStore('store-1');
    const secondPromise = useProductZustand
      .getState()
      .loadProductsByStore('store-1');

    expect(mockedProductsService.listByStore).toHaveBeenCalledTimes(1);

    resolveRequest?.(storeProducts);

    const [firstResult, secondResult] = await Promise.all([
      firstPromise,
      secondPromise,
    ]);

    expect(firstResult).toEqual(storeProducts);
    expect(secondResult).toEqual(storeProducts);
  });

  it('salva status e mensagem quando a carga por loja falha', async () => {
    const error = new Error('Falha ao buscar produtos da loja');

    mockedProductsService.listByStore.mockRejectedValue(error);

    await expect(
      useProductZustand.getState().loadProductsByStore('store-1'),
    ).rejects.toThrow('Falha ao buscar produtos da loja');

    expect(useProductZustand.getState().storeStatusById['store-1']).toBe(
      'error',
    );
    expect(useProductZustand.getState().storeErrorMessageById['store-1']).toBe(
      'Falha ao buscar produtos da loja',
    );
  });

  it('remove todos os produtos vinculados a uma loja do cache local', () => {
    useProductZustand.setState((state) => ({
      ...state,
      productIds: ['product-1', 'product-2', 'product-3'],
      productIdsByStore: {
        'store-1': ['product-1', 'product-2'],
        'store-2': ['product-3'],
      },
      productsById: {
        'product-1': createProduct(),
        'product-2': createProduct({
          id: 'product-2',
          name: 'Mouse',
        }),
        'product-3': createProduct({
          id: 'product-3',
          name: 'Monitor',
          storeId: 'store-2',
        }),
      },
      storeErrorMessageById: {
        'store-1': 'Erro antigo',
      },
      storeStatusById: {
        'store-1': 'ready',
      },
      storesLoadedById: {
        'store-1': true,
      },
    }));

    useProductZustand.getState().removeProductsByStore('store-1');

    expect(useProductZustand.getState().productIds).toEqual(['product-3']);
    expect(useProductZustand.getState().productIdsByStore).toEqual({
      'store-2': ['product-3'],
    });
    expect(useProductZustand.getState().productsById).toEqual({
      'product-3': expect.objectContaining({
        id: 'product-3',
        storeId: 'store-2',
      }),
    });
    expect(useProductZustand.getState().storeStatusById['store-1']).toBe(
      'idle',
    );
    expect(useProductZustand.getState().storesLoadedById['store-1']).toBe(
      false,
    );
    expect(useProductZustand.getState().storeErrorMessageById['store-1']).toBe(
      null,
    );
  });

  it('atualiza o produto no cache local apos editar', async () => {
    useProductZustand.setState((state) => ({
      ...state,
      productIds: ['product-1'],
      productIdsByStore: {
        'store-1': ['product-1'],
      },
      productsById: {
        'product-1': createProduct(),
      },
      storeStatusById: {
        'store-1': 'ready',
      },
      storesLoadedById: {
        'store-1': true,
      },
    }));

    const updatedProduct = createProduct({
      name: 'Notebook Pro',
      price: 4200,
    });

    mockedProductsService.update.mockResolvedValue(updatedProduct);

    await useProductZustand.getState().updateProduct('product-1', {
      category: 'Tecnologia',
      name: 'Notebook Pro',
      price: 4200,
    });

    expect(useProductZustand.getState().productsById['product-1']).toEqual(
      updatedProduct,
    );
    expect(useProductZustand.getState().storeStatusById['store-1']).toBe(
      'ready',
    );
  });
});
