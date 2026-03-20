import { renderHook } from '@testing-library/react-native';

import { useAppToast } from './use-app-toast';

const mockShow = jest.fn(() => 'toast-id');
const mockCloseAll = jest.fn();

jest.mock('@gluestack-ui/themed', () => ({
  useToast: () => ({
    closeAll: mockCloseAll,
    show: mockShow,
  }),
}));

describe('useAppToast', () => {
  beforeEach(() => {
    mockShow.mockClear();
    mockCloseAll.mockClear();
  });

  it('dispara toast de sucesso com configuracao padrao', () => {
    const { result } = renderHook(() => useAppToast());

    const toastId = result.current.showSuccess({
      message: 'A loja foi salva com sucesso.',
      title: 'Loja criada',
    });

    expect(toastId).toBe('toast-id');
    expect(mockShow).toHaveBeenCalledWith(
      expect.objectContaining({
        duration: 3200,
        placement: 'top',
        render: expect.any(Function),
      }),
    );
  });

  it('dispara toast de erro com duracao maior', () => {
    const { result } = renderHook(() => useAppToast());

    result.current.showError({
      message: 'Nao foi possivel salvar a loja.',
      title: 'Erro ao salvar',
    });

    expect(mockShow).toHaveBeenCalledWith(
      expect.objectContaining({
        duration: 4200,
        placement: 'top',
        render: expect.any(Function),
      }),
    );
  });
});
