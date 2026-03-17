import {
  buildCreateProductInput,
  buildUpdateProductInput,
  createInitialProductFormValues,
  parseProductPriceInput,
  validateCreateProductForm,
} from './create-product-form.model';

describe('create-product-form.model', () => {
  it('cria valores iniciais usando o storeId informado', () => {
    expect(createInitialProductFormValues('store-1')).toEqual({
      category: '',
      name: '',
      price: '',
      storeId: 'store-1',
    });
  });

  it('converte preco com virgula para numero', () => {
    expect(parseProductPriceInput(' 19,90 ')).toBe(19.9);
  });

  it('retorna erros quando o formulario esta invalido', () => {
    expect(
      validateCreateProductForm({
        category: '',
        name: '',
        price: '-10',
        storeId: '',
      }),
    ).toEqual({
      category: 'Informe a categoria.',
      name: 'Informe o nome do produto.',
      price: 'O preco nao pode ser negativo.',
      storeId: 'Selecione a loja do produto.',
    });
  });

  it('monta o payload de cadastro com o preco numerico', () => {
    expect(
      buildCreateProductInput({
        category: ' Eletronicos ',
        name: ' Tablet ',
        price: ' 1999,90 ',
        storeId: ' store-1 ',
      }),
    ).toEqual({
      data: {
        category: 'Eletronicos',
        name: 'Tablet',
        price: 1999.9,
        storeId: 'store-1',
      },
      success: true,
    });
  });

  it('remove o vinculo da loja ao montar o payload de atualizacao', () => {
    expect(
      buildUpdateProductInput({
        category: ' Perifericos ',
        name: ' Mouse ',
        price: ' 79.9 ',
        storeId: 'store-1',
      }),
    ).toEqual({
      data: {
        category: 'Perifericos',
        name: 'Mouse',
        price: 79.9,
      },
      success: true,
    });
  });
});
