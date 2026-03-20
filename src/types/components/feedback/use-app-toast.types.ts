import type { ShowAppToastOptions, ShowAppToastShortcutOptions } from './app-toast.types';

export type UseAppToastResult = {
  closeAll: () => void;
  showError: (options: ShowAppToastShortcutOptions) => string;
  showInfo: (options: ShowAppToastShortcutOptions) => string;
  showSuccess: (options: ShowAppToastShortcutOptions) => string;
  showToast: (options: ShowAppToastOptions) => string;
  showWarning: (options: ShowAppToastShortcutOptions) => string;
};
