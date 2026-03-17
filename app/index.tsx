import {
  Button,
  ButtonText,
  Card,
  Heading,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ScreenShell } from '../src/components/layout/screen-shell';
import { useNavigationStore } from '../src/store/navigation.store';

const foundationItems = [
  {
    title: 'Expo Router configurado',
    description:
      'Estrutura inicial com rotas para o dashboard, módulo de lojas e módulo de produtos.',
  },
  {
    title: 'Gluestack UI pronto',
    description:
      'Provider global e componentes básicos já conectados para a camada visual.',
  },
  {
    title: 'Zustand + AsyncStorage',
    description:
      'Store inicial pronta para preferências e seleção de contexto entre módulos.',
  },
  {
    title: 'Mock API isolada',
    description:
      'A camada de API simulada foi separada do restante do app para evoluir o CRUD depois.',
  },
];

const lastVisitedLabels = {
  home: 'Início',
  stores: 'Lojas',
  products: 'Produtos',
} as const;

export default function HomeScreen() {
  const router = useRouter();
  const lastVisitedModule = useNavigationStore((state) => state.lastVisitedModule);
  const setLastVisitedModule = useNavigationStore(
    (state) => state.setLastVisitedModule,
  );

  return (
    <ScreenShell
      eyebrow="Projeto base"
      title="Retail Hub Mobile"
      description="Scaffold inicial criado para o desafio técnico com Expo, Expo Router, Gluestack UI, Zustand e mock API local."
    >
      <VStack style={styles.content}>
        <Card style={styles.highlightCard}>
          <Text style={styles.highlightText}>
            Nenhuma funcionalidade de cadastro, edição, listagem ou exclusão foi
            implementada. A base arquitetural está pronta para começar os módulos.
          </Text>
        </Card>

        <VStack style={styles.sectionList}>
          {foundationItems.map((item) => (
            <Card key={item.title} style={styles.infoCard}>
              <VStack style={styles.cardContent}>
                <Heading size="md" style={styles.cardTitle}>
                  {item.title}
                </Heading>
                <Text style={styles.cardText}>{item.description}</Text>
              </VStack>
            </Card>
          ))}
        </VStack>

        <HStack style={styles.actions}>
          <Button
            style={styles.primaryButton}
            onPress={() => {
              setLastVisitedModule('stores');
              router.push('/stores');
            }}
          >
            <ButtonText style={styles.primaryButtonText}>
              Abrir módulo de lojas
            </ButtonText>
          </Button>

          <Button
            style={styles.secondaryButton}
            onPress={() => {
              setLastVisitedModule('products');
              router.push('/stores/demo-store/products');
            }}
          >
            <ButtonText style={styles.secondaryButtonText}>
              Ver rota de produtos
            </ButtonText>
          </Button>
        </HStack>

        <Card style={styles.footerCard}>
          <Text style={styles.footerText}>
            Último módulo selecionado via Zustand:{' '}
            {lastVisitedLabels[lastVisitedModule]}.
          </Text>
        </Card>
      </VStack>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexWrap: 'wrap',
    gap: 12,
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
  footerCard: {
    backgroundColor: '#f0ebe1',
    borderColor: '#d3c8b8',
    borderWidth: 1,
    padding: 18,
  },
  footerText: {
    color: '#334155',
    fontSize: 14,
    lineHeight: 20,
  },
  highlightCard: {
    backgroundColor: '#ece6d8',
    borderColor: '#d9ccb5',
    borderWidth: 1,
    padding: 18,
  },
  highlightText: {
    color: '#3d3325',
    fontSize: 15,
    lineHeight: 22,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderColor: '#d9d4ca',
    borderWidth: 1,
    padding: 18,
  },
  primaryButton: {
    backgroundColor: '#163020',
    flexGrow: 1,
    minHeight: 52,
    minWidth: 220,
  },
  primaryButtonText: {
    color: '#f8f4ec',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#4c6b57',
    flexGrow: 1,
    minHeight: 52,
    minWidth: 220,
  },
  secondaryButtonText: {
    color: '#f8f4ec',
    fontSize: 15,
    fontWeight: '700',
  },
  sectionList: {
    gap: 12,
  },
});
