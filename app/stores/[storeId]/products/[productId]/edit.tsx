import { Button, ButtonText, Card, Text, VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ScreenShell } from '../../../../../src/components/layout/screen-shell';

function resolveParam(param: string | string[] | undefined, fallback: string): string {
  if (Array.isArray(param)) {
    return param[0] ?? fallback;
  }

  return param ?? fallback;
}

export default function EditProductScreen() {
  const router = useRouter();
  const { productId, storeId } = useLocalSearchParams<{
    productId?: string | string[];
    storeId?: string | string[];
  }>();

  const resolvedProductId = resolveParam(productId, 'unknown-product');
  const resolvedStoreId = resolveParam(storeId, 'unknown-store');

  return (
    <ScreenShell
      eyebrow="Produtos"
      title="Rota de edição de produto reservada"
      description="A rota dinâmica por loja e produto já está definida para a próxima etapa de implementação."
    >
      <Card style={styles.card}>
        <VStack style={styles.content}>
          <Text style={styles.text}>Loja selecionada: {resolvedStoreId}</Text>
          <Text style={styles.text}>Produto selecionado: {resolvedProductId}</Text>

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
    backgroundColor: '#4c6b57',
    minHeight: 52,
  },
  buttonText: {
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
