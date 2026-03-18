import { act, renderHook } from '@testing-library/react-native';

import { useStoreForm } from './use-store-form';

describe('useStoreForm', () => {
  it('inicializa o formulario com os valores padrao mesclados', () => {
    const { result } = renderHook(() =>
      useStoreForm({
        name: 'Loja Centro',
      }),
    );

    expect(result.current.formValues).toEqual({
      address: '',
      name: 'Loja Centro',
    });
    expect(result.current.errors).toEqual({});
  });

  it('limpa o erro do campo e o erro global ao atualizar um campo', () => {
    const { result } = renderHook(() => useStoreForm());

    act(() => {
      result.current.setFormError('Falha no envio');
      result.current.getCreatePayload();
    });

    act(() => {
      result.current.updateField('name', 'Loja Norte');
    });

    expect(result.current.formValues.name).toBe('Loja Norte');
    expect(result.current.errors.name).toBeUndefined();
    expect(result.current.errors.form).toBeUndefined();
    expect(result.current.errors.address).toBe('Informe o endereco da loja.');
  });

  it('substitui valores e limpa os erros atuais', () => {
    const { result } = renderHook(() => useStoreForm());

    act(() => {
      result.current.getCreatePayload();
    });

    act(() => {
      result.current.replaceFormValues({
        address: 'Avenida Brasil, 100',
        name: 'Loja Sul',
      });
    });

    expect(result.current.formValues).toEqual({
      address: 'Avenida Brasil, 100',
      name: 'Loja Sul',
    });
    expect(result.current.errors).toEqual({});
  });

  it('retorna null e salva os erros quando o payload de criacao e invalido', () => {
    const { result } = renderHook(() => useStoreForm());
    let payload: ReturnType<typeof result.current.getCreatePayload> | null =
      null;

    act(() => {
      payload = result.current.getCreatePayload();
    });

    expect(payload).toBeNull();
    expect(result.current.errors).toEqual({
      address: 'Informe o endereco da loja.',
      name: 'Informe o nome da loja.',
    });
  });

  it('retorna payloads normalizados para criacao e edicao', () => {
    const { result } = renderHook(() =>
      useStoreForm({
        address: '  Avenida Central, 200  ',
        name: '  Loja Premium  ',
      }),
    );

    expect(result.current.getCreatePayload()).toEqual({
      address: 'Avenida Central, 200',
      name: 'Loja Premium',
    });
    expect(result.current.getUpdatePayload()).toEqual({
      address: 'Avenida Central, 200',
      name: 'Loja Premium',
    });
  });
});
