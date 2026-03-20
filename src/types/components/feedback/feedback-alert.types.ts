export type FeedbackAlertTone = 'error' | 'info' | 'success' | 'warning';

export type FeedbackAlertProps = {
  message: string;
  title?: string;
  tone?: FeedbackAlertTone;
};
