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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { FloatingActionButton } from '../../../../src/components/actions/floating-action-button';
import { ScreenShell } from '../../../../src/components/layout/screen-shell';
import { resolveRouteParam } from '../../../../src/lib/router/resolve-route-param';
import { corporateTheme } from '../../../../src/theme/corporate-theme';
import { ProductListCard } from '../../../../src/features/products/components/product-list-card';
import { productsScreenStyles as styles } from '../../../../src/features/products/products-screen.styles';
import { useProductZustand } from '../../../../src/features/products/store/products.store';

const EMPTY_PRODUCT_IDS: string[] = [];

export default function ProductsScreen() {
  const router = useRouter();
  const { storeId } = useLocalSearchParams<{ storeId?: string | string[] }>();
  const resolvedStoreId = resolveRouteParam(storeId, 'unknown-store');
  const deleteProduct = useProductZustand((state) => state.deleteProduct);
  const loadProductsByStore = useProductZustand(
    (state) => state.loadProductsByStore,
  );
  const productIdsByStore = useProductZustand(
    (state) => state.productIdsByStore[resolvedStoreId],
  );
  const productsById = useProductZustand((state) => state.productsById);
  const productErrorMessage = useProductZustand(
    (state) => state.storeErrorMessageById[resolvedStoreId] ?? null,
  );
  const productStatus = useProductZustand(
    (state) => state.storeStatusById[resolvedStoreId] ?? 'idle',
  );
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);

  useEffect(() => {
    void loadProductsByStore(resolvedStoreId);
  }, [loadProductsByStore, resolvedStoreId]);

  const scopedProductIds = productIdsByStore ?? EMPTY_PRODUCT_IDS;
  const products = useMemo(
    () =>
      scopedProductIds
        .map((productId) => productsById[productId])
        .filter((product): product is NonNullable<typeof product> =>
          Boolean(product),
        ),
    [productsById, scopedProductIds],
  );
  const hasProductLoadError = productStatus === 'error';
  const isLoadingProducts =
    productStatus === 'idle' || productStatus === 'loading';

  async function handleDeleteProduct(productId: string) {
    try {
      setPendingProductId(productId);
      await deleteProduct(productId, resolvedStoreId);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel excluir o produto.';

      Alert.alert('Erro ao excluir', message);
    } finally {
      setPendingProductId(null);
    }
  }

  function confirmDeleteProduct(productId: string, productName: string) {
    Alert.alert(
      'Excluir produto',
      `Deseja excluir o produto "${productName}"?`,
      [
        { style: 'cancel', text: 'Cancelar' },
        {
          style: 'destructive',
          text: 'Excluir',
          onPress: () => {
            void handleDeleteProduct(productId);
          },
        },
      ],
    );
  }

  return (
    <ScreenShell
      eyebrow="Produtos"
      floatingAction={
        <FloatingActionButton
          accessibilityLabel="Cadastrar produto"
          onPress={() => router.push(`/stores/${resolvedStoreId}/products/new`)}
        />
      }
      title="Produtos"
    >
      <VStack style={styles.content}>
        <HStack style={styles.headerRow}>
          <Heading size="md" style={styles.title}>
            Lista
          </Heading>

          <Badge style={styles.counterBadge}>
            <BadgeText style={styles.counterBadgeText}>
              {products.length} produtos
            </BadgeText>
          </Badge>
        </HStack>

        {isLoadingProducts ? (
          <Card style={styles.loadingCard}>
            <HStack style={styles.loadingRow}>
              <Spinner size="large" color={corporateTheme.colors.brand} />
              <Text style={styles.loadingText}>Carregando produtos...</Text>
            </HStack>
          </Card>
        ) : null}

        {hasProductLoadError ? (
          <Card style={styles.errorCard}>
            <VStack style={styles.content}>
              <Text style={styles.errorTitle}>Falha ao carregar</Text>
              <Text style={styles.errorText}>
                {productErrorMessage ??
                  'Nao foi possivel carregar os produtos.'}
              </Text>

              <Button
                style={styles.retryButton}
                onPress={() =>
                  void loadProductsByStore(resolvedStoreId, { force: true })
                }
              >
                <ButtonText style={styles.retryButtonText}>
                  Tentar novamente
                </ButtonText>
              </Button>
            </VStack>
          </Card>
        ) : null}

        {!isLoadingProducts && !hasProductLoadError && products.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
          </Card>
        ) : null}

        {!isLoadingProducts && !hasProductLoadError && products.length > 0 ? (
          <VStack style={styles.list}>
            {products.map((product) => (
              <ProductListCard
                key={product.id}
                onDelete={() => {
                  if (pendingProductId === product.id) {
                    return;
                  }

                  confirmDeleteProduct(product.id, product.name);
                }}
                onEdit={() =>
                  router.push(
                    `/stores/${resolvedStoreId}/products/${product.id}/edit`,
                  )
                }
                product={product}
              />
            ))}
          </VStack>
        ) : null}
      </VStack>
    </ScreenShell>
  );
}
