import {
  Alert,
  AlertCircleIcon,
  AlertIcon,
  AlertText,
  CheckCircleIcon,
  HStack,
  InfoIcon,
  Text,
  VStack,
} from '@gluestack-ui/themed';

import type {
  FeedbackAlertProps,
  FeedbackAlertTone,
} from '../../types/components/feedback/feedback-alert.types';
import { feedbackAlertStyles as styles } from './feedback-alert.styles';

const toneMap = {
  error: {
    container: styles.errorContainer,
    icon: AlertCircleIcon,
    iconStyle: styles.errorIcon,
    message: styles.errorMessage,
    title: styles.errorTitle,
  },
  info: {
    container: styles.infoContainer,
    icon: InfoIcon,
    iconStyle: styles.infoIcon,
    message: styles.infoMessage,
    title: styles.infoTitle,
  },
  success: {
    container: styles.successContainer,
    icon: CheckCircleIcon,
    iconStyle: styles.successIcon,
    message: styles.successMessage,
    title: styles.successTitle,
  },
  warning: {
    container: styles.warningContainer,
    icon: AlertCircleIcon,
    iconStyle: styles.warningIcon,
    message: styles.warningMessage,
    title: styles.warningTitle,
  },
} as const;

export function FeedbackAlert({
  message,
  title,
  tone = 'info',
}: FeedbackAlertProps) {
  const toneConfig = toneMap[tone];

  return (
    <Alert style={[styles.root, toneConfig.container]}>
      <HStack style={styles.content}>
        <AlertIcon
          as={toneConfig.icon}
          style={[styles.icon, toneConfig.iconStyle]}
        />

        <VStack style={styles.copy}>
          {title ? (
            <Text style={[styles.title, toneConfig.title]}>{title}</Text>
          ) : null}

          <AlertText style={[styles.message, toneConfig.message]}>
            {message}
          </AlertText>
        </VStack>
      </HStack>
    </Alert>
  );
}
