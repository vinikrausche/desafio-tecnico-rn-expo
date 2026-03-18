import { act, renderHook } from '@testing-library/react-native';

import { useCreateProductForm } from './use-create-product-form';

describe('useCreateProductForm', () => {
  it('inicializa o formulario com a loja padrao informada', () => {
    const { result } = renderHook(() => useCreateProductForm('store-10'));

    expect(result.current.formValues).toEqual({
      category: '',
      name: '',
      price: '',
      storeId: 'store-10',
    });
    expect(result.current.errors).toEqual({});
  });

  it('limpa o erro global e o erro do campo ao atualizar valores', () => {
    const { result } = renderHook(() => useCreateProductForm());

    act(() => {
      result.current.setFormError('Falha no envio');
      result.current.getPayload();
    });

    act(() => {
      result.current.updateField('name', 'Notebook');
      result.current.syncStoreId('store-2');
    });

    expect(result.current.formValues.name).toBe('Notebook');
    expect(result.current.formValues.storeId).toBe('store-2');
    expect(result.current.errors.name).toBeUndefined();
    expect(result.current.errors.storeId).toBeUndefined();
    expect(result.current.errors.form).toBeUndefined();
  });

  it('substitui valores e limpa os erros atuais', () => {
    const { result } = renderHook(() => useCreateProductForm());

    act(() => {
      result.current.getPayload();
    });

    act(() => {
      result.current.replaceFormValues({
        category: 'Tecnologia',
        name: 'Monitor',
        price: '2499,90',
        storeId: 'store-1',
      });
    });

    expect(result.current.formValues).toEqual({
      category: 'Tecnologia',
      name: 'Monitor',
      price: '2499,90',
      storeId: 'store-1',
    });
    expect(result.current.errors).toEqual({});
  });

  it('retorna null e salva os erros quando o payload e invalido', () => {
    const { result } = renderHook(() => useCreateProductForm());
    let payload: ReturnType<typeof result.current.getPayload> | null = null;

    act(() => {
      payload = result.current.getPayload();
    });

    expect(payload).toBeNull();
    expect(result.current.errors).toEqual({
      category: 'Informe a categoria.',
      name: 'Informe o nome do produto.',
      price: 'Informe um preco valido.',
      storeId: 'Selecione a loja do produto.',
    });
  });

  it('retorna payloads normalizados para criacao e edicao', () => {
    const { result } = renderHook(() => useCreateProductForm('store-1'));

    act(() => {
      result.current.replaceFormValues({
        category: '  Tecnologia  ',
        name: '  Notebook Pro  ',
        price: ' 1999,90 ',
      });
    });

    expect(result.current.getPayload()).toEqual({
      category: 'Tecnologia',
      name: 'Notebook Pro',
      price: 1999.9,
      storeId: 'store-1',
    });
    expect(result.current.getUpdatePayload()).toEqual({
      category: 'Tecnologia',
      name: 'Notebook Pro',
      price: 1999.9,
    });
  });
});
