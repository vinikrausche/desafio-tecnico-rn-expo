import {
  AddIcon,
  Badge,
  BadgeText,
  Button,
  Card,
  EditIcon,
  Heading,
  HStack,
  Icon,
  SearchIcon,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { ScreenShell } from '../src/components/layout/screen-shell';
import { StorefrontIcon } from '../src/components/icons/storefront-icon';
import { dashboardStyles as styles } from '../src/features/dashboard/dashboard.styles';
import { getDashboardSnapshot } from '../src/features/dashboard/services/dashboard.service';
import type { ProductSummary } from '../src/features/products/product.types';
import type { StoreSummary } from '../src/features/stores/store.types';
import { corporateTheme } from '../src/theme/corporate-theme';
import { useNavigationStore } from '../src/store/navigation.store';

// ! Dashboard keeps only operational data visible.
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

  // ! Home reads only live snapshot data exposed by the app service layer.
  async function loadDashboard() {
    try {
      setStatus('loading');
      setErrorMessage(null);

      const snapshot = await getDashboardSnapshot();
      setStores(snapshot.stores);
      setProducts(snapshot.products);
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
  const canManageProducts = totalStores > 0;
  const actionTiles = [
    {
      icon: StorefrontIcon,
      isDisabled: false,
      key: 'view-stores',
      label: 'Ver lojas',
      onPress: () => {
        setLastVisitedModule('stores');
        router.push('/stores');
      },
      variant: 'secondary' as const,
    },
    {
      icon: AddIcon,
      isDisabled: false,
      key: 'create-store',
      label: 'Nova loja',
      onPress: () => {
        setLastVisitedModule('stores');
        router.push('/stores/new');
      },
      variant: 'primary' as const,
    },
    {
      icon: SearchIcon,
      isDisabled: !canManageProducts,
      key: 'view-products',
      label: 'Ver produtos',
      onPress: () => {
        if (!leadingStore) {
          return;
        }

        setLastVisitedModule('products');
        router.push(`/stores/${leadingStore.id}/products`);
      },
      variant: 'secondary' as const,
    },
    {
      icon: EditIcon,
      isDisabled: !canManageProducts,
      key: 'create-product',
      label: 'Novo produto',
      onPress: () => {
        if (!leadingStore) {
          return;
        }

        setLastVisitedModule('products');
        router.push(`/stores/${leadingStore.id}/products/new`);
      },
      variant: 'primary' as const,
    },
  ];

  return (
    <ScreenShell eyebrow="Início" title="Dashboard">
      <VStack style={styles.content}>
        <VStack style={styles.metricGrid}>
          <Card style={styles.metricCardPrimary}>
            <VStack style={styles.metricContent}>
              <Text style={styles.metricLabel}>Lojas</Text>
              <Heading style={styles.metricValue}>{totalStores}</Heading>
            </VStack>
          </Card>

          <Card style={styles.metricCardSecondary}>
            <VStack style={styles.metricContent}>
              <Text style={styles.metricLabelDark}>Produtos</Text>
              <Heading style={styles.metricValueDark}>{totalProducts}</Heading>
            </VStack>
          </Card>

          <Card style={styles.metricCardSecondary}>
            <VStack style={styles.metricContent}>
              <Text style={styles.metricLabelDark}>Com estoque</Text>
              <Heading style={styles.metricValueDark}>{activeStores}</Heading>
            </VStack>
          </Card>

          <Card style={styles.metricCardAccent}>
            <VStack style={styles.metricContent}>
              <Text style={styles.metricLabel}>Valor</Text>
              <Heading style={styles.metricValueAccent}>{formatCurrency(stockValue)}</Heading>
            </VStack>
          </Card>
        </VStack>

        <Card style={styles.actionsCard}>
          <VStack style={styles.sectionContent}>
            <Heading size="md" style={styles.sectionTitle}>
              Ações
            </Heading>

            <HStack style={styles.actionGrid}>
              {actionTiles.map((action) => (
                <Button
                  key={action.key}
                  isDisabled={action.isDisabled}
                  onPress={action.onPress}
                  style={[
                    styles.actionTile,
                    action.variant === 'primary'
                      ? styles.actionTilePrimary
                      : styles.actionTileSecondary,
                    action.isDisabled ? styles.actionTileDisabled : null,
                  ]}
                >
                  <VStack style={styles.actionTileContent}>
                    <VStack
                      style={[
                        styles.actionTileIconWrap,
                        action.variant === 'primary'
                          ? styles.actionTileIconWrapPrimary
                          : styles.actionTileIconWrapSecondary,
                        action.isDisabled ? styles.actionTileIconWrapDisabled : null,
                      ]}
                    >
                      <Icon
                        as={action.icon}
                        color={
                          action.isDisabled
                            ? corporateTheme.colors.textMuted
                            : corporateTheme.colors.brandStrong
                        }
                        style={styles.actionTileIcon}
                      />
                    </VStack>

                    <Text
                      style={[
                        styles.actionTileText,
                        styles.actionTileTextDefault,
                        action.isDisabled ? styles.actionTileTextDisabled : null,
                      ]}
                    >
                      {action.label}
                    </Text>
                  </VStack>
                </Button>
              ))}
            </HStack>
          </VStack>
        </Card>

        <Card style={styles.highlightCard}>
          <VStack style={styles.sectionContent}>
            <HStack style={styles.sectionHeader}>
              <Heading size="md" style={styles.sectionTitle}>
                Destaque
              </Heading>
              {leadingStore ? (
                <Badge style={styles.sectionBadge}>
                  <BadgeText style={styles.sectionBadgeText}>
                    {formatProductCount(leadingStore.productCount)}
                  </BadgeText>
                </Badge>
              ) : null}
            </HStack>

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
                    <Text style={styles.ghostButtonText}>Abrir produtos</Text>
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <Text style={styles.emptyStateText}>Nenhuma loja cadastrada.</Text>
            )}
          </VStack>
        </Card>

        <Card style={styles.rankingCard}>
          <VStack style={styles.sectionContent}>
            <HStack style={styles.sectionHeader}>
              <Heading size="md" style={styles.sectionTitle}>
                Ranking
              </Heading>
              <Badge style={styles.sectionBadge}>
                <BadgeText style={styles.sectionBadgeText}>
                  {spotlightStores.length}
                </BadgeText>
              </Badge>
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
                  <Text style={styles.retryButtonText}>Tentar novamente</Text>
                </Button>
              </VStack>
            ) : null}

            {status === 'ready' && spotlightStores.length === 0 ? (
              <Text style={styles.emptyStateText}>Nenhuma loja cadastrada.</Text>
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
