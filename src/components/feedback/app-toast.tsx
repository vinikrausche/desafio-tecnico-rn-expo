import {
  AlertCircleIcon,
  CheckCircleIcon,
  HStack,
  Icon,
  InfoIcon,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed';

import type {
  AppToastProps,
  AppToastTone,
} from '../../types/components/feedback/app-toast.types';
import { corporateTheme } from '../../theme/corporate-theme';
import { appToastStyles as styles } from './app-toast.styles';

const toneMap = {
  error: {
    description: styles.errorDescription,
    icon: AlertCircleIcon,
    iconColor: corporateTheme.colors.error,
    root: styles.errorRoot,
    title: styles.errorTitle,
  },
  info: {
    description: styles.infoDescription,
    icon: InfoIcon,
    iconColor: corporateTheme.colors.info,
    root: styles.infoRoot,
    title: styles.infoTitle,
  },
  success: {
    description: styles.successDescription,
    icon: CheckCircleIcon,
    iconColor: corporateTheme.colors.success,
    root: styles.successRoot,
    title: styles.successTitle,
  },
  warning: {
    description: styles.warningDescription,
    icon: AlertCircleIcon,
    iconColor: corporateTheme.colors.warning,
    root: styles.warningRoot,
    title: styles.warningTitle,
  },
} as const satisfies Record<
  AppToastTone,
  {
    description: object;
    icon: typeof AlertCircleIcon;
    iconColor: string;
    root: object;
    title: object;
  }
>;

export function AppToast({ id, message, title, tone = 'info' }: AppToastProps) {
  const toneStyles = toneMap[tone];

  return (
    <Toast nativeID={id} style={[styles.root, toneStyles.root]}>
      <HStack style={styles.row}>
        <Icon
          as={toneStyles.icon}
          color={toneStyles.iconColor}
          style={styles.icon}
        />

        <VStack style={styles.copy}>
          <ToastTitle style={[styles.title, toneStyles.title]}>
            {title}
          </ToastTitle>

          {message ? (
            <ToastDescription
              style={[styles.description, toneStyles.description]}
            >
              {message}
            </ToastDescription>
          ) : null}
        </VStack>
      </HStack>
    </Toast>
  );
}
