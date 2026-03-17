import { Button, ButtonText, Card, Text, VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { ScreenShell } from '../../../../src/components/layout/screen-shell';
import { useNavigationStore } from '../../../../src/store/navigation.store';

function resolveParam(param: string | string[] | undefined): string {
  if (Array.isArray(param)) {
    return param[0] ?? 'unknown-store';
  }

  return param ?? 'unknown-store';
}

export default function ProductsScreen() {
  const router = useRouter();
  const { storeId } = useLocalSearchParams<{ storeId?: string | string[] }>();
  const resolvedStoreId = resolveParam(storeId);
  const setLastVisitedModule = useNavigationStore(
    (state) => state.setLastVisitedModule,
  );

  useEffect(() => {
    setLastVisitedModule('products');
  }, [setLastVisitedModule]);

  return (
    <ScreenShell eyebrow="Produtos" title="Produtos da Loja">
      <VStack style={styles.content}>
        <Card style={styles.card}>
          <VStack style={styles.cardContent}>
            <Text style={styles.cardText}>{resolvedStoreId}</Text>
          </VStack>
        </Card>

        <Button style={styles.button} onPress={() => router.push('/stores')}>
          <ButtonText style={styles.buttonText}>Voltar para lojas</ButtonText>
        </Button>
      </VStack>
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
  cardContent: {
    gap: 8,
  },
  cardText: {
    color: '#495057',
    fontSize: 15,
    lineHeight: 22,
  },
  content: {
    gap: 16,
  },
});
