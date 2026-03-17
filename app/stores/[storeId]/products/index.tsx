import { Button, ButtonText, Card, Heading, Text, VStack } from '@gluestack-ui/themed';
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
    <ScreenShell
      eyebrow="Módulo de Produtos"
      title="Estrutura inicial de produtos criada"
      description="A rota dinâmica por loja já existe. No próximo passo, ela pode consumir o repositório e exibir os produtos vinculados à loja selecionada."
    >
      <VStack style={styles.content}>
        <Card style={styles.card}>
          <VStack style={styles.cardContent}>
            <Heading size="md" style={styles.cardTitle}>
              Loja de referência
            </Heading>
            <Text style={styles.cardText}>{resolvedStoreId}</Text>
          </VStack>
        </Card>

        <Card style={styles.card}>
          <VStack style={styles.cardContent}>
            <Heading size="md" style={styles.cardTitle}>
              Endpoints prontos
            </Heading>
            <Text style={styles.cardText}>
              O mock já expõe rotas para consultar e manipular produtos por loja em
              /stores/:storeId/products e /products.
            </Text>
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
  cardTitle: {
    color: '#1f2933',
    fontSize: 18,
  },
  content: {
    gap: 16,
  },
});
