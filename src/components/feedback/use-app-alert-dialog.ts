import { useCallback, useMemo, useRef, useState } from 'react';

import type {
  AppAlertDialogProps,
} from '../../types/components/feedback/app-alert-dialog.types';
import type {
  AlertDialogState,
  ShowAlertOptions,
  ShowConfirmOptions,
  UseAppAlertDialogResult,
} from '../../types/components/feedback/use-app-alert-dialog.types';

const CLOSED_DIALOG_STATE: AlertDialogState = {
  cancelLabel: 'Cancelar',
  confirmLabel: 'Fechar',
  isOpen: false,
  message: '',
  mode: 'notice',
  title: '',
  tone: 'info',
};

export function useAppAlertDialog(): UseAppAlertDialogResult {
  const confirmActionRef = useRef<(() => void) | null>(null);
  const [dialogState, setDialogState] = useState<AlertDialogState>(
    CLOSED_DIALOG_STATE,
  );

  const closeAlert = useCallback(() => {
    confirmActionRef.current = null;
    setDialogState((currentState) => ({
      ...currentState,
      isOpen: false,
    }));
  }, []);

  const showAlert = useCallback(
    ({
      confirmLabel = 'Fechar',
      message,
      title,
      tone = 'info',
    }: ShowAlertOptions) => {
      confirmActionRef.current = null;

      setDialogState({
        cancelLabel: CLOSED_DIALOG_STATE.cancelLabel,
        confirmLabel,
        isOpen: true,
        message,
        mode: 'notice',
        title,
        tone,
      });
    },
    [],
  );

  const showConfirm = useCallback(
    ({
      cancelLabel = 'Cancelar',
      confirmLabel = 'Confirmar',
      message,
      onConfirm,
      title,
      tone = 'error',
    }: ShowConfirmOptions) => {
      confirmActionRef.current = onConfirm;

      setDialogState({
        cancelLabel,
        confirmLabel,
        isOpen: true,
        message,
        mode: 'confirm',
        title,
        tone,
      });
    },
    [],
  );

  const handleConfirm = useCallback(() => {
    const currentConfirmAction = confirmActionRef.current;

    currentConfirmAction?.();
  }, []);

  const dialogProps = useMemo<AppAlertDialogProps>(
    () => ({
      ...dialogState,
      onClose: closeAlert,
      onConfirm: dialogState.mode === 'confirm' ? handleConfirm : undefined,
    }),
    [closeAlert, dialogState, handleConfirm],
  );

  return {
    closeAlert,
    dialogProps,
    showAlert,
    showConfirm,
  };
}
