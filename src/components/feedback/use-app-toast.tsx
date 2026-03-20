import { useToast } from '@gluestack-ui/themed';
import { useCallback } from 'react';

import { AppToast } from './app-toast';
import type {
  ShowAppToastOptions,
  ShowAppToastShortcutOptions,
} from '../../types/components/feedback/app-toast.types';
import type { UseAppToastResult } from '../../types/components/feedback/use-app-toast.types';

export function useAppToast(): UseAppToastResult {
  const toast = useToast();

  const showToast = useCallback(
    ({
      duration = 3200,
      message,
      placement = 'top',
      title,
      tone = 'info',
    }: ShowAppToastOptions) =>
      toast.show({
        duration,
        placement,
        render: ({ id }) => (
          <AppToast id={id} message={message} title={title} tone={tone} />
        ),
      }),
    [toast],
  );

  const showSuccess = useCallback(
    (options: ShowAppToastShortcutOptions) =>
      showToast({
        ...options,
        tone: 'success',
      }),
    [showToast],
  );

  const showError = useCallback(
    (options: ShowAppToastShortcutOptions) =>
      showToast({
        ...options,
        duration: options.duration ?? 4200,
        tone: 'error',
      }),
    [showToast],
  );

  const showInfo = useCallback(
    (options: ShowAppToastShortcutOptions) =>
      showToast({
        ...options,
        tone: 'info',
      }),
    [showToast],
  );

  const showWarning = useCallback(
    (options: ShowAppToastShortcutOptions) =>
      showToast({
        ...options,
        tone: 'warning',
      }),
    [showToast],
  );

  return {
    closeAll: toast.closeAll,
    showError,
    showInfo,
    showSuccess,
    showToast,
    showWarning,
  };
}
