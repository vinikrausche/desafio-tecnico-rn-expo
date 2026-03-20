import type { ToastPlacement } from '@gluestack-ui/toast/lib/types';

export type AppToastTone = 'error' | 'info' | 'success' | 'warning';

export type AppToastProps = {
  id: string;
  message?: string;
  title: string;
  tone?: AppToastTone;
};

export type ShowAppToastOptions = {
  duration?: number | null;
  message?: string;
  placement?: ToastPlacement;
  title: string;
  tone?: AppToastTone;
};

export type ShowAppToastShortcutOptions = Omit<ShowAppToastOptions, 'tone'>;
