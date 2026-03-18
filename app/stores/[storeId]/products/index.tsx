import { VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { StateCard } from '../../../../src/components/feedback/state-card';
import { ListHeader } from '../../../../src/components/layout/list-header';
import { FloatingActionButton } from '../../../../src/components/actions/floating-action-button';
import { ScreenShell } from '../../../../src/components/layout/screen-shell';
import { resolveRouteParam } from '../../../../src/lib/router/resolve-route-param';
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
        <ListHeader badgeLabel={`${products.length} produtos`} title="Lista" />

        {isLoadingProducts ? (
          <StateCard
            layout="row"
            message="Carregando produtos..."
            minHeight={120}
            showSpinner
            tone="surface"
          />
        ) : null}

        {hasProductLoadError ? (
          <StateCard
            actionLabel="Tentar novamente"
            message={
              productErrorMessage ?? 'Nao foi possivel carregar os produtos.'
            }
            onAction={() =>
              void loadProductsByStore(resolvedStoreId, { force: true })
            }
            title="Falha ao carregar"
            tone="error"
          />
        ) : null}

        {!isLoadingProducts && !hasProductLoadError && products.length === 0 ? (
          <StateCard message="Nenhum produto cadastrado." tone="surface" />
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
