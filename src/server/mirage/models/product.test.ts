import { productModel } from './product';
import { storeModel } from './store';
import { readMockDb, resetMockDb } from '../seeds/in-memory-db';

describe('productModel', () => {
  beforeEach(() => {
    resetMockDb();
  });

  it('cria produto e permite listar por loja', () => {
    const store = storeModel.create({
      address: 'Rua Principal, 10',
      name: 'Loja Centro',
    });

    const product = productModel.create({
      category: 'Tecnologia',
      name: 'Notebook',
      price: 3500,
      storeId: store.id,
    });

    expect(product.id).toMatch(/^product-/);
    expect(productModel.list(store.id)).toEqual([product]);
  });

  it('atualiza apenas os campos mutaveis do produto', () => {
    const store = storeModel.create({
      address: 'Rua Principal, 10',
      name: 'Loja Centro',
    });
    const product = productModel.create({
      category: 'Tecnologia',
      name: 'Notebook',
      price: 3500,
      storeId: store.id,
    });

    expect(
      productModel.update(product.id, {
        category: 'Informatica',
        name: 'Notebook Pro',
        price: 4200,
      }),
    ).toEqual({
      ...product,
      category: 'Informatica',
      name: 'Notebook Pro',
      price: 4200,
    });
  });

  it('remove o produto do banco em memoria', () => {
    const store = storeModel.create({
      address: 'Rua Principal, 10',
      name: 'Loja Centro',
    });
    const product = productModel.create({
      category: 'Tecnologia',
      name: 'Notebook',
      price: 3500,
      storeId: store.id,
    });

    expect(productModel.delete(product.id)).toBe(true);
    expect(readMockDb().products).toEqual([]);
  });
});
