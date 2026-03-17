import { productModel } from './product';
import { storeModel } from './store';
import { readMockDb, resetMockDb } from '../seeds/in-memory-db';

describe('storeModel', () => {
  beforeEach(() => {
    resetMockDb();
  });

  it('cria a loja com contagem inicial zerada', () => {
    const store = storeModel.create({
      address: 'Avenida Brasil, 100',
      name: 'Loja Centro',
    });

    expect(store.id).toMatch(/^store-/);
    expect(store.productCount).toBe(0);
    expect(readMockDb().stores).toHaveLength(1);
  });

  it('calcula o total de produtos ao listar as lojas', () => {
    const firstStore = storeModel.create({
      address: 'Rua Um, 10',
      name: 'Loja A',
    });
    const secondStore = storeModel.create({
      address: 'Rua Dois, 20',
      name: 'Loja B',
    });

    productModel.create({
      category: 'Categoria',
      name: 'Produto 1',
      price: 10,
      storeId: firstStore.id,
    });
    productModel.create({
      category: 'Categoria',
      name: 'Produto 2',
      price: 20,
      storeId: firstStore.id,
    });
    productModel.create({
      category: 'Categoria',
      name: 'Produto 3',
      price: 30,
      storeId: secondStore.id,
    });

    expect(storeModel.list()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: firstStore.id,
          productCount: 2,
        }),
        expect.objectContaining({
          id: secondStore.id,
          productCount: 1,
        }),
      ]),
    );
  });

  it('atualiza a loja sem perder a contagem de produtos', () => {
    const store = storeModel.create({
      address: 'Rua Antiga, 1',
      name: 'Loja Norte',
    });

    productModel.create({
      category: 'Acessorios',
      name: 'Cabo',
      price: 15,
      storeId: store.id,
    });

    expect(
      storeModel.update(store.id, {
        address: 'Rua Nova, 200',
        name: 'Loja Norte Atualizada',
      }),
    ).toEqual(
      expect.objectContaining({
        address: 'Rua Nova, 200',
        name: 'Loja Norte Atualizada',
        productCount: 1,
      }),
    );
  });

  it('remove a loja e todos os produtos vinculados', () => {
    const store = storeModel.create({
      address: 'Avenida Sul, 7',
      name: 'Loja Sul',
    });

    productModel.create({
      category: 'Moveis',
      name: 'Cadeira',
      price: 99,
      storeId: store.id,
    });

    expect(storeModel.delete(store.id)).toBe(true);
    expect(readMockDb()).toEqual({
      products: [],
      stores: [],
    });
  });
});
