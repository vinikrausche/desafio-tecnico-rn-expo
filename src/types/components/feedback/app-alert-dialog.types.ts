import type { FeedbackAlertTone } from './feedback-alert.types';

export type AppAlertDialogMode = 'confirm' | 'notice';

export type AppAlertDialogProps = {
  cancelLabel?: string;
  confirmLabel?: string;
  isOpen: boolean;
  message: string;
  mode?: AppAlertDialogMode;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  tone?: FeedbackAlertTone;
};
