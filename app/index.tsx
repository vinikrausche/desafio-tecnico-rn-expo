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
import { useEffect, useMemo } from 'react';

import { ScreenShell } from '../src/components/layout/screen-shell';
import { StorefrontIcon } from '../src/components/icons/storefront-icon';
import { corporateTheme } from '../src/theme/corporate-theme';
import { useProductZustand } from '../src/features/products/store/products.store';
import { useStoreZustand } from '../src/features/stores/store/stores.store';
import { dashboardStyles as styles } from '../src/features/dashboard/dashboard.styles';

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
  const catalogErrorMessage = useProductZustand(
    (state) => state.catalogErrorMessage,
  );
  const catalogStatus = useProductZustand((state) => state.catalogStatus);
  const loadCatalog = useProductZustand((state) => state.loadCatalog);
  const productIds = useProductZustand((state) => state.productIds);
  const productsById = useProductZustand((state) => state.productsById);
  const loadStores = useStoreZustand((state) => state.loadStores);
  const storeIds = useStoreZustand((state) => state.storeIds);
  const storesById = useStoreZustand((state) => state.storesById);
  const storesErrorMessage = useStoreZustand((state) => state.errorMessage);
  const storesStatus = useStoreZustand((state) => state.status);

  useEffect(() => {
    void Promise.all([loadStores(), loadCatalog()]);
  }, [loadCatalog, loadStores]);

  const products = useMemo(
    () =>
      productIds
        .map((productId) => productsById[productId])
        .filter((product): product is NonNullable<typeof product> =>
          Boolean(product),
        ),
    [productIds, productsById],
  );
  const stores = useMemo(
    () =>
      storeIds
        .map((storeId) => storesById[storeId])
        .filter((store): store is NonNullable<typeof store> => Boolean(store)),
    [storeIds, storesById],
  );

  const totalStores = stores.length;
  const totalProducts = products.length;
  const activeStores = stores.filter((store) => store.productCount > 0).length;
  const stockValue = products.reduce(
    (total, product) => total + product.price,
    0,
  );
  const leadingStore =
    [...stores].sort(
      (left, right) => right.productCount - left.productCount,
    )[0] ?? null;
  const spotlightStores = [...stores]
    .sort((left, right) => right.productCount - left.productCount)
    .slice(0, 3);
  const dashboardErrorMessage = storesErrorMessage ?? catalogErrorMessage;
  const hasDashboardError =
    storesStatus === 'error' || catalogStatus === 'error';
  const isLoadingDashboard =
    storesStatus === 'idle' ||
    storesStatus === 'loading' ||
    catalogStatus === 'idle' ||
    catalogStatus === 'loading';
  const isDashboardReady = !isLoadingDashboard && !hasDashboardError;
  const actionTiles = [
    {
      icon: StorefrontIcon,
      isDisabled: false,
      key: 'view-stores',
      label: 'Ver lojas',
      onPress: () => {
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
        router.push('/stores/new');
      },
      variant: 'primary' as const,
    },
    {
      icon: SearchIcon,
      isDisabled: false,
      key: 'view-products',
      label: 'Ver produtos',
      onPress: () => {
        router.push('/products');
      },
      variant: 'secondary' as const,
    },
    {
      icon: EditIcon,
      isDisabled: false,
      key: 'create-product',
      label: 'Novo produto',
      onPress: () => {
        router.push('/products/new');
      },
      variant: 'primary' as const,
    },
  ];

  return (
    <ScreenShell eyebrow="Inicio" title="Dashboard">
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
              <Heading style={styles.metricValueAccent}>
                {formatCurrency(stockValue)}
              </Heading>
            </VStack>
          </Card>
        </VStack>

        <Card style={styles.actionsCard}>
          <VStack style={styles.sectionContent}>
            <Heading size="md" style={styles.sectionTitle}>
              Acoes
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
                        action.isDisabled
                          ? styles.actionTileIconWrapDisabled
                          : null,
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
                        action.isDisabled
                          ? styles.actionTileTextDisabled
                          : null,
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
                      router.push(`/stores/${leadingStore.id}/products`);
                    }}
                  >
                    <Text style={styles.ghostButtonText}>Abrir produtos</Text>
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <Text style={styles.emptyStateText}>
                Nenhuma loja cadastrada.
              </Text>
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

            {isLoadingDashboard ? (
              <HStack style={styles.loadingRow}>
                <Spinner size="large" color={corporateTheme.colors.brand} />
                <Text style={styles.loadingText}>
                  Carregando visao resumida...
                </Text>
              </HStack>
            ) : null}

            {hasDashboardError ? (
              <VStack style={styles.feedbackBlock}>
                <Text style={styles.feedbackTitle}>
                  Falha ao carregar o dashboard
                </Text>
                <Text style={styles.feedbackText}>
                  {dashboardErrorMessage ??
                    'O mock nao respondeu como esperado.'}
                </Text>

                <Button
                  style={styles.retryButton}
                  onPress={() =>
                    void Promise.all([
                      loadStores({ force: true }),
                      loadCatalog({ force: true }),
                    ])
                  }
                >
                  <Text style={styles.retryButtonText}>Tentar novamente</Text>
                </Button>
              </VStack>
            ) : null}

            {isDashboardReady && spotlightStores.length === 0 ? (
              <Text style={styles.emptyStateText}>
                Nenhuma loja cadastrada.
              </Text>
            ) : null}

            {isDashboardReady ? (
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
