import {
  buildStoreInput,
  buildUpdateStoreInput,
  createInitialStoreFormValues,
  validateStoreForm,
} from './store-form.model';

describe('store-form.model', () => {
  it('cria valores iniciais vazios por padrao', () => {
    expect(createInitialStoreFormValues()).toEqual({
      address: '',
      name: '',
    });
  });

  it('retorna erros quando os campos obrigatorios estao vazios', () => {
    expect(
      validateStoreForm({
        address: ' ',
        name: '',
      }),
    ).toEqual({
      address: 'Informe o endereco da loja.',
      name: 'Informe o nome da loja.',
    });
  });

  it('monta o payload de cadastro com campos normalizados', () => {
    expect(
      buildStoreInput({
        address: ' Avenida Central, 100 ',
        name: ' Loja Centro ',
      }),
    ).toEqual({
      data: {
        address: 'Avenida Central, 100',
        name: 'Loja Centro',
      },
      success: true,
    });
  });

  it('reaproveita o mesmo contrato no payload de atualizacao', () => {
    expect(
      buildUpdateStoreInput({
        address: ' Rua Nova, 42 ',
        name: ' Loja Sul ',
      }),
    ).toEqual({
      data: {
        address: 'Rua Nova, 42',
        name: 'Loja Sul',
      },
      success: true,
    });
  });
});
