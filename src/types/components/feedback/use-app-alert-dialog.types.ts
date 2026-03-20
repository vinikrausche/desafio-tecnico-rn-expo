import type {
  AppAlertDialogMode,
  AppAlertDialogProps,
} from './app-alert-dialog.types';
import type { FeedbackAlertTone } from './feedback-alert.types';

export type AlertDialogState = {
  cancelLabel: string;
  confirmLabel: string;
  isOpen: boolean;
  message: string;
  mode: AppAlertDialogMode;
  title: string;
  tone: FeedbackAlertTone;
};

export type ShowAlertOptions = {
  confirmLabel?: string;
  message: string;
  title: string;
  tone?: FeedbackAlertTone;
};

export type ShowConfirmOptions = {
  cancelLabel?: string;
  confirmLabel?: string;
  message: string;
  onConfirm: () => void;
  title: string;
  tone?: FeedbackAlertTone;
};

export type UseAppAlertDialogResult = {
  closeAlert: () => void;
  dialogProps: AppAlertDialogProps;
  showAlert: (options: ShowAlertOptions) => void;
  showConfirm: (options: ShowConfirmOptions) => void;
};
