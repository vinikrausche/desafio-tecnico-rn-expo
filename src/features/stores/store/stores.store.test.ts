import { storesService } from '../services/stores.service';
import type { StoreSummary } from '../store.types';
import { useStoreZustand } from './stores.store';

jest.mock('../services/stores.service', () => ({
  storesService: {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
    update: jest.fn(),
  },
}));

const mockedStoresService = jest.mocked(storesService);
const initialStoreState = useStoreZustand.getState();

function resetStoreZustand() {
  useStoreZustand.setState(initialStoreState, true);
}

describe('useStoreZustand', () => {
  beforeEach(() => {
    resetStoreZustand();
    jest.clearAllMocks();
  });

  it('reutiliza o cache de lojas depois da primeira carga', async () => {
    const apiStores: StoreSummary[] = [
      {
        address: 'Avenida Central, 100',
        id: 'store-1',
        name: 'Loja Centro',
        productCount: 2,
      },
    ];

    mockedStoresService.list.mockResolvedValue(apiStores);

    const firstResult = await useStoreZustand.getState().loadStores();
    const secondResult = await useStoreZustand.getState().loadStores();

    expect(firstResult).toEqual(apiStores);
    expect(secondResult).toEqual(apiStores);
    expect(mockedStoresService.list).toHaveBeenCalledTimes(1);
  });

  it('insere a nova loja no cache local apos criar', async () => {
    const createdStore: StoreSummary = {
      address: 'Rua Nova, 45',
      id: 'store-10',
      name: 'Loja Nova',
      productCount: 0,
    };

    mockedStoresService.create.mockResolvedValue(createdStore);

    await useStoreZustand.getState().createStore({
      address: 'Rua Nova, 45',
      name: 'Loja Nova',
    });

    expect(useStoreZustand.getState().storesById['store-10']).toEqual(
      createdStore,
    );
    expect(useStoreZustand.getState().storeIds).toEqual(['store-10']);
  });

  it('remove a loja do cache local apos excluir', async () => {
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

    mockedStoresService.delete.mockResolvedValue(undefined);

    await useStoreZustand.getState().deleteStore('store-1');

    expect(useStoreZustand.getState().storeIds).toEqual([]);
    expect(useStoreZustand.getState().storesById).toEqual({});
  });
});
