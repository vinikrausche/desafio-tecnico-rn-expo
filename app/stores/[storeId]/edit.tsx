import { Button, ButtonText, Card, Text, VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ScreenShell } from '../../../src/components/layout/screen-shell';
import {
  centeredButtonStyle,
  centeredButtonTextStyle,
} from '../../../src/theme/button-presets';

function resolveParam(param: string | string[] | undefined): string {
  if (Array.isArray(param)) {
    return param[0] ?? 'unknown-store';
  }

  return param ?? 'unknown-store';
}

export default function EditStoreScreen() {
  const router = useRouter();
  const { storeId } = useLocalSearchParams<{ storeId?: string | string[] }>();
  const resolvedStoreId = resolveParam(storeId);

  return (
    <ScreenShell eyebrow="Lojas" title="Editar Loja">
      <Card style={styles.card}>
        <VStack style={styles.content}>
          <Text style={styles.text}>Loja: {resolvedStoreId}</Text>

          <Button style={styles.button} onPress={() => router.back()}>
            <ButtonText style={styles.buttonText}>Voltar</ButtonText>
          </Button>
        </VStack>
      </Card>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  button: {
    ...centeredButtonStyle,
    backgroundColor: '#163020',
    minHeight: 52,
  },
  buttonText: {
    ...centeredButtonTextStyle,
    color: '#f8f4ec',
    fontSize: 15,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#d9d4ca',
    borderWidth: 1,
    padding: 18,
  },
  content: {
    gap: 16,
  },
  text: {
    color: '#495057',
    fontSize: 15,
    lineHeight: 22,
  },
});
