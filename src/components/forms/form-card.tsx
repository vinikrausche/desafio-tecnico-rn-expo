import { Card, VStack } from '@gluestack-ui/themed';

import type { FormCardProps } from '../../types/components/forms/form-card.types';
import { FeedbackAlert } from '../feedback/feedback-alert';
import { formCardStyles as styles } from './form-card.styles';

// ! Superficie padrao de formularios para concentrar espacamento e erro global.
export function FormCard({ children, errorMessage }: FormCardProps) {
  return (
    <Card style={styles.card}>
      <VStack style={styles.content}>
        {errorMessage ? (
          <FeedbackAlert message={errorMessage} tone="error" />
        ) : null}
        {children}
      </VStack>
    </Card>
  );
}
