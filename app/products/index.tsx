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
import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { FloatingActionButton } from '../../src/components/actions/floating-action-button';
import { ScreenShell } from '../../src/components/layout/screen-shell';
import { ProductListCard } from '../../src/features/products/components/product-list-card';
import { productsScreenStyles as styles } from '../../src/features/products/products-screen.styles';
import type { ProductSummary } from '../../src/features/products/product.types';
import { corporateTheme } from '../../src/theme/corporate-theme';
import { useNavigationStore } from '../../src/store/navigation.store';
import { useProductZustand } from '../../src/zustand/product';
import { useStoreZustand } from '../../src/zustand/store';

function attachStoreName(
  products: ProductSummary[],
  storesById: Record<string, { name: string }>,
): ProductSummary[] {
  return products.map((product) => ({
    ...product,
    storeName: storesById[product.storeId]?.name ?? 'Loja indisponivel',
  }));
}

// ! A tela principal de produtos le do cache global e aproveita o catalogo ja hidratado.
export default function ProductsCatalogScreen() {
  const router = useRouter();
  const catalogErrorMessage = useProductZustand(
    (state) => state.catalogErrorMessage,
  );
  const catalogStatus = useProductZustand((state) => state.catalogStatus);
  const deleteProduct = useProductZustand((state) => state.deleteProduct);
  const loadCatalog = useProductZustand((state) => state.loadCatalog);
  const productIds = useProductZustand((state) => state.productIds);
  const productsById = useProductZustand((state) => state.productsById);
  const loadStores = useStoreZustand((state) => state.loadStores);
  const storesById = useStoreZustand((state) => state.storesById);
  const setLastVisitedModule = useNavigationStore(
    (state) => state.setLastVisitedModule,
  );
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);

  useEffect(() => {
    setLastVisitedModule('products');

    void Promise.all([loadCatalog(), loadStores()]);
  }, [loadCatalog, loadStores, setLastVisitedModule]);

  const products = useMemo(
    () =>
      productIds
        .map((productId) => productsById[productId])
        .filter((product): product is NonNullable<typeof product> =>
          Boolean(product),
        ),
    [productIds, productsById],
  );
  const catalogProducts = useMemo(
    () => attachStoreName(products, storesById),
    [products, storesById],
  );
  const hasCatalogError = catalogStatus === 'error';
  const isLoadingCatalog =
    catalogStatus === 'idle' || catalogStatus === 'loading';

  async function handleDeleteProduct(productId: string, storeId: string) {
    try {
      setPendingProductId(productId);
      await deleteProduct(productId, storeId);
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

  function confirmDeleteProduct(
    productId: string,
    productName: string,
    storeId: string,
  ) {
    Alert.alert(
      'Excluir produto',
      `Deseja excluir o produto "${productName}"?`,
      [
        { style: 'cancel', text: 'Cancelar' },
        {
          style: 'destructive',
          text: 'Excluir',
          onPress: () => {
            void handleDeleteProduct(productId, storeId);
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
          onPress={() => router.push('/products/new')}
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
              {catalogProducts.length} produtos
            </BadgeText>
          </Badge>
        </HStack>

        {isLoadingCatalog ? (
          <Card style={styles.loadingCard}>
            <HStack style={styles.loadingRow}>
              <Spinner size="large" color={corporateTheme.colors.brand} />
              <Text style={styles.loadingText}>Carregando produtos...</Text>
            </HStack>
          </Card>
        ) : null}

        {hasCatalogError ? (
          <Card style={styles.errorCard}>
            <VStack style={styles.content}>
              <Text style={styles.errorTitle}>Falha ao carregar</Text>
              <Text style={styles.errorText}>
                {catalogErrorMessage ??
                  'Não foi possível carregar os produtos.'}
              </Text>

              <Button
                style={styles.retryButton}
                onPress={() =>
                  void Promise.all([
                    loadCatalog({ force: true }),
                    loadStores({ force: true }),
                  ])
                }
              >
                <ButtonText style={styles.retryButtonText}>
                  Tentar novamente
                </ButtonText>
              </Button>
            </VStack>
          </Card>
        ) : null}

        {!isLoadingCatalog &&
        !hasCatalogError &&
        catalogProducts.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
          </Card>
        ) : null}

        {!isLoadingCatalog && !hasCatalogError && catalogProducts.length > 0 ? (
          <VStack style={styles.list}>
            {catalogProducts.map((product) => (
              <ProductListCard
                key={product.id}
                onDelete={() => {
                  if (pendingProductId === product.id) {
                    return;
                  }

                  confirmDeleteProduct(
                    product.id,
                    product.name,
                    product.storeId,
                  );
                }}
                onEdit={() =>
                  router.push(
                    `/stores/${product.storeId}/products/${product.id}/edit`,
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
