import { act, renderHook } from '@testing-library/react-native';

import { useAppAlertDialog } from './use-app-alert-dialog';

describe('useAppAlertDialog', () => {
  it('abre um alerta simples com os valores padrao', () => {
    const { result } = renderHook(() => useAppAlertDialog());

    act(() => {
      result.current.showAlert({
        message: 'Nao foi possivel salvar o produto.',
        title: 'Erro ao salvar',
        tone: 'error',
      });
    });

    expect(result.current.dialogProps).toMatchObject({
      confirmLabel: 'Fechar',
      isOpen: true,
      message: 'Nao foi possivel salvar o produto.',
      mode: 'notice',
      title: 'Erro ao salvar',
      tone: 'error',
    });

    act(() => {
      result.current.closeAlert();
    });

    expect(result.current.dialogProps.isOpen).toBe(false);
  });

  it('abre confirmacao e executa o callback ao confirmar', () => {
    const onConfirm = jest.fn();
    const { result } = renderHook(() => useAppAlertDialog());

    act(() => {
      result.current.showConfirm({
        confirmLabel: 'Excluir',
        message: 'Deseja excluir o produto "Cafe"?',
        onConfirm,
        title: 'Excluir produto',
      });
    });

    expect(result.current.dialogProps).toMatchObject({
      cancelLabel: 'Cancelar',
      confirmLabel: 'Excluir',
      isOpen: true,
      mode: 'confirm',
      title: 'Excluir produto',
      tone: 'error',
    });

    act(() => {
      result.current.dialogProps.onConfirm?.();
    });

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
