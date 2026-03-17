import {
  Badge,
  BadgeText,
  Button,
  ButtonText,
  Card,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { requestJson } from '../src/lib/api/client';
import { ScreenShell } from '../src/components/layout/screen-shell';
import { dashboardStyles as styles } from '../src/features/dashboard/dashboard.styles';
import { corporateTheme } from '../src/theme/corporate-theme';
import { useNavigationStore } from '../src/store/navigation.store';

type StoreSummary = {
  address: string;
  id: string;
  name: string;
  productCount: number;
};

type ProductSummary = {
  category: string;
  id: string;
  name: string;
  price: number;
  storeId: string;
};

type DashboardStatus = 'error' | 'loading' | 'ready';

function formatCurrency(value: number) {
  const [integer, decimal] = value.toFixed(2).split('.');
  const normalizedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `R$ ${normalizedInteger},${decimal}`;
}

function formatProductCount(value: number) {
  if (value === 1) {
    return '1 produto';
  }

  return `${value} produtos`;
}

function shortenAddress(address: string) {
  if (address.length <= 44) {
    return address;
  }

  return `${address.slice(0, 41)}...`;
}

export default function HomeScreen() {
  const router = useRouter();
  const lastVisitedModule = useNavigationStore((state) => state.lastVisitedModule);
  const setLastVisitedModule = useNavigationStore(
    (state) => state.setLastVisitedModule,
  );
  const [status, setStatus] = useState<DashboardStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [stores, setStores] = useState<StoreSummary[]>([]);

  useEffect(() => {
    setLastVisitedModule('home');

    void loadDashboard();
  }, [setLastVisitedModule]);

  async function loadDashboard() {
    try {
      setStatus('loading');
      setErrorMessage(null);

      const [storesResponse, productsResponse] = await Promise.all([
        requestJson<StoreSummary[]>('/stores'),
        requestJson<ProductSummary[]>('/products'),
      ]);

      setStores(storesResponse);
      setProducts(productsResponse);
      setStatus('ready');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível carregar o resumo da operação.';

      setErrorMessage(message);
      setStatus('error');
    }
  }

  const totalStores = stores.length;
  const totalProducts = products.length;
  const activeStores = stores.filter((store) => store.productCount > 0).length;
  const stockValue = products.reduce((total, product) => total + product.price, 0);
  const leadingStore =
    [...stores].sort((left, right) => right.productCount - left.productCount)[0] ??
    null;
  const spotlightStores = [...stores]
    .sort((left, right) => right.productCount - left.productCount)
    .slice(0, 3);

  return (
    <ScreenShell
      eyebrow="Dashboard"
      title="Centro de controle das filiais"
      description="Acompanhe a operação, entre nas lojas mais relevantes e avance para os próximos cadastros sem sair da visão principal."
    >
      <VStack style={styles.content}>
        <Card style={styles.signalCard}>
          <VStack style={styles.signalContent}>
            <HStack style={styles.signalHeader}>
              <Badge style={styles.signalBadge}>
                <BadgeText style={styles.signalBadgeText}>Operação</BadgeText>
              </Badge>
              <Badge style={styles.signalBadgeMuted}>
                <BadgeText style={styles.signalBadgeMutedText}>
                  Último módulo: {lastVisitedModule}
                </BadgeText>
              </Badge>
            </HStack>

            <Heading size="md" style={styles.signalTitle}>
              Painel inicial focado em gestão de lojas e estoque
            </Heading>

            <Text style={styles.signalText}>
              A ideia aqui não é vender produto, e sim dar visão rápida para quem
              administra a rede: quantas filiais existem, como está o volume de itens
              e quais unidades precisam de atenção primeiro.
            </Text>
          </VStack>
        </Card>

        <VStack style={styles.metricGrid}>
          <Card style={styles.metricCardPrimary}>
            <VStack style={styles.metricContent}>
              <Text style={styles.metricLabel}>Lojas cadastradas</Text>
              <Heading style={styles.metricValue}>{totalStores}</Heading>
              <Text style={styles.metricHelper}>Base total de filiais da operação</Text>
            </VStack>
          </Card>

          <Card style={styles.metricCardSecondary}>
            <VStack style={styles.metricContent}>
              <Text style={styles.metricLabelDark}>Produtos em catálogo</Text>
              <Heading style={styles.metricValueDark}>{totalProducts}</Heading>
              <Text style={styles.metricHelperDark}>Itens somados entre todas as lojas</Text>
            </VStack>
          </Card>

          <Card style={styles.metricCardSecondary}>
            <VStack style={styles.metricContent}>
              <Text style={styles.metricLabelDark}>Lojas com estoque</Text>
              <Heading style={styles.metricValueDark}>{activeStores}</Heading>
              <Text style={styles.metricHelperDark}>
                Filiais com pelo menos um produto ativo
              </Text>
            </VStack>
          </Card>

          <Card style={styles.metricCardAccent}>
            <VStack style={styles.metricContent}>
              <Text style={styles.metricLabel}>Valor de referência</Text>
              <Heading style={styles.metricValueAccent}>{formatCurrency(stockValue)}</Heading>
              <Text style={styles.metricHelperAccent}>
                Soma simples dos preços mockados no ambiente atual
              </Text>
            </VStack>
          </Card>
        </VStack>

        <Card style={styles.actionsCard}>
          <VStack style={styles.sectionContent}>
            <HStack style={styles.sectionHeader}>
              <VStack style={styles.sectionCopy}>
                <Text style={styles.sectionEyebrow}>Ações rápidas</Text>
                <Heading size="md" style={styles.sectionTitle}>
                  Próximos passos da operação
                </Heading>
              </VStack>
              <Text style={styles.sectionAside}>Mobile first</Text>
            </HStack>

            <VStack style={styles.buttonList}>
              <Button
                style={styles.primaryButton}
                onPress={() => {
                  setLastVisitedModule('stores');
                  router.push('/stores');
                }}
              >
                <ButtonText style={styles.primaryButtonText}>
                  Ver todas as lojas
                </ButtonText>
              </Button>

              <Button
                style={styles.secondaryButton}
                onPress={() => {
                  setLastVisitedModule('stores');
                  router.push('/stores/new');
                }}
              >
                <ButtonText style={styles.secondaryButtonText}>
                  Cadastrar nova loja
                </ButtonText>
              </Button>
            </VStack>
          </VStack>
        </Card>

        <Card style={styles.highlightCard}>
          <VStack style={styles.sectionContent}>
            <Text style={styles.sectionEyebrow}>Destaque</Text>
            <Heading size="md" style={styles.sectionTitle}>
              Loja com maior concentração de itens
            </Heading>

            {leadingStore ? (
              <VStack style={styles.leadStoreContent}>
                <Text style={styles.leadStoreName}>{leadingStore.name}</Text>
                <Text style={styles.leadStoreAddress}>
                  {shortenAddress(leadingStore.address)}
                </Text>
                <HStack style={styles.leadStoreMeta}>
                  <Badge style={styles.leadStoreBadge}>
                    <BadgeText style={styles.leadStoreBadgeText}>
                      {formatProductCount(leadingStore.productCount)}
                    </BadgeText>
                  </Badge>

                  <Button
                    style={styles.ghostButton}
                    onPress={() => {
                      setLastVisitedModule('products');
                      router.push(`/stores/${leadingStore.id}/products`);
                    }}
                  >
                    <ButtonText style={styles.ghostButtonText}>
                      Abrir produtos
                    </ButtonText>
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <Text style={styles.emptyStateText}>
                Nenhuma loja foi cadastrada ainda. O dashboard já está pronto para
                receber os dados assim que o CRUD começar.
              </Text>
            )}
          </VStack>
        </Card>

        <Card style={styles.rankingCard}>
          <VStack style={styles.sectionContent}>
            <HStack style={styles.sectionHeader}>
              <VStack style={styles.sectionCopy}>
                <Text style={styles.sectionEyebrow}>Ranking</Text>
                <Heading size="md" style={styles.sectionTitle}>
                  Lojas com mais produtos
                </Heading>
              </VStack>
              <Text style={styles.sectionAside}>
                {spotlightStores.length} em destaque
              </Text>
            </HStack>

            {status === 'loading' ? (
              <HStack style={styles.loadingRow}>
                <Spinner size="large" color={corporateTheme.colors.brand} />
                <Text style={styles.loadingText}>Carregando visão resumida...</Text>
              </HStack>
            ) : null}

            {status === 'error' ? (
              <VStack style={styles.feedbackBlock}>
                <Text style={styles.feedbackTitle}>Falha ao carregar o dashboard</Text>
                <Text style={styles.feedbackText}>
                  {errorMessage ?? 'O mock não respondeu como esperado.'}
                </Text>

                <Button style={styles.retryButton} onPress={() => void loadDashboard()}>
                  <ButtonText style={styles.retryButtonText}>Tentar novamente</ButtonText>
                </Button>
              </VStack>
            ) : null}

            {status === 'ready' && spotlightStores.length === 0 ? (
              <Text style={styles.emptyStateText}>
                Ainda não existe ranking disponível porque nenhuma loja foi cadastrada.
              </Text>
            ) : null}

            {status === 'ready' ? (
              <VStack style={styles.storeList}>
                {spotlightStores.map((store, index) => (
                  <Card key={store.id} style={styles.storeCard}>
                    <VStack style={styles.storeCardContent}>
                      <HStack style={styles.storeCardHeader}>
                        <Badge style={styles.positionBadge}>
                          <BadgeText style={styles.positionBadgeText}>
                            #{index + 1}
                          </BadgeText>
                        </Badge>
                        <Text style={styles.storeCardCount}>
                          {formatProductCount(store.productCount)}
                        </Text>
                      </HStack>

                      <Heading size="sm" style={styles.storeCardTitle}>
                        {store.name}
                      </Heading>
                      <Text style={styles.storeCardAddress}>
                        {shortenAddress(store.address)}
                      </Text>
                    </VStack>
                  </Card>
                ))}
              </VStack>
            ) : null}
          </VStack>
        </Card>
      </VStack>
    </ScreenShell>
  );
}
