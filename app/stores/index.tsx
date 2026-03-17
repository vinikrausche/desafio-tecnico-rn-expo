import { Button, ButtonText, Card, Heading, Text, VStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { ScreenShell } from '../../src/components/layout/screen-shell';
import { useNavigationStore } from '../../src/store/navigation.store';

export default function StoresScreen() {
  const router = useRouter();
  const setLastVisitedModule = useNavigationStore(
    (state) => state.setLastVisitedModule,
  );

  useEffect(() => {
    setLastVisitedModule('stores');
  }, [setLastVisitedModule]);

  return (
    <ScreenShell
      eyebrow="Módulo de Lojas"
      title="Estrutura inicial de lojas criada"
      description="Esta rota já está preparada para receber a listagem, o cadastro, a edição e a exclusão de lojas quando você decidir avançar para as funcionalidades."
    >
      <VStack style={styles.content}>
        <Card style={styles.card}>
          <VStack style={styles.cardContent}>
            <Heading size="md" style={styles.cardTitle}>
              O que já está pronto
            </Heading>
            <Text style={styles.cardText}>
              Rotas dedicadas, provider visual, mock API em memória e base de estado
              compartilhado.
            </Text>
          </VStack>
        </Card>

        <Card style={styles.card}>
          <VStack style={styles.cardContent}>
            <Heading size="md" style={styles.cardTitle}>
              O que fica para depois
            </Heading>
            <Text style={styles.cardText}>
              Formulários, busca, filtro, listagem real e integração entre tela e
              repositório.
            </Text>
          </VStack>
        </Card>

        <Button
          style={styles.button}
          onPress={() => {
            setLastVisitedModule('products');
            router.push('/stores/demo-store/products');
          }}
        >
          <ButtonText style={styles.buttonText}>
            Abrir placeholder de produtos
          </ButtonText>
        </Button>
      </VStack>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#163020',
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
