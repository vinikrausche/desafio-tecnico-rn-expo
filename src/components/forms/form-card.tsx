import { Card, Text, VStack } from '@gluestack-ui/themed';
import { type PropsWithChildren } from 'react';

import { formCardStyles as styles } from './form-card.styles';

type FormCardProps = PropsWithChildren<{
  errorMessage?: string;
}>;

// ! Superficie padrao de formularios para concentrar espacamento e erro global.
export function FormCard({ children, errorMessage }: FormCardProps) {
  return (
    <Card style={styles.card}>
      <VStack style={styles.content}>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        {children}
      </VStack>
    </Card>
  );
}
