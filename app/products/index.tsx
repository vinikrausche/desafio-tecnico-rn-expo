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

import { FloatingActionButton } from '../../src/components/actions/floating-action-button';
import { ScreenShell } from '../../src/components/layout/screen-shell';
import { ProductListCard } from '../../src/features/products/components/product-list-card';
import { productsScreenStyles as styles } from '../../src/features/products/products-screen.styles';
import { productsService } from '../../src/features/products/services/products.service';
import type { ProductSummary } from '../../src/features/products/product.types';
import { storesService } from '../../src/features/stores/services/stores.service';
import type { StoreSummary } from '../../src/features/stores/store.types';
import { corporateTheme } from '../../src/theme/corporate-theme';
import { useNavigationStore } from '../../src/store/navigation.store';

type ProductsCatalogStatus = 'error' | 'loading' | 'ready';

function attachStoreName(
  products: ProductSummary[],
  stores: StoreSummary[],
): ProductSummary[] {
  const storeNameById = new Map(stores.map((store) => [store.id, store.name]));

  return products.map((product) => ({
    ...product,
    storeName: storeNameById.get(product.storeId) ?? 'Loja indisponivel',
  }));
}

// ! The main products screen keeps the dashboard shortcut independent from a single store.
export default function ProductsCatalogScreen() {
  const router = useRouter();
  const setLastVisitedModule = useNavigationStore(
    (state) => state.setLastVisitedModule,
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [status, setStatus] = useState<ProductsCatalogStatus>('loading');

  useEffect(() => {
    setLastVisitedModule('products');

    void loadProducts();
  }, [setLastVisitedModule]);

  // ! Product cards also display the store name, so both sources are loaded together here.
  async function loadProducts() {
    try {
      setStatus('loading');
      setErrorMessage(null);

      const [nextProducts, stores] = await Promise.all([
        productsService.list(),
        storesService.list(),
      ]);

      setProducts(attachStoreName(nextProducts, stores));
      setStatus('ready');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível carregar os produtos.';

      setErrorMessage(message);
      setStatus('error');
    }
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
              {products.length} produtos
            </BadgeText>
          </Badge>
        </HStack>

        {status === 'loading' ? (
          <Card style={styles.loadingCard}>
            <HStack style={styles.loadingRow}>
              <Spinner size="large" color={corporateTheme.colors.brand} />
              <Text style={styles.loadingText}>Carregando produtos...</Text>
            </HStack>
          </Card>
        ) : null}

        {status === 'error' ? (
          <Card style={styles.errorCard}>
            <VStack style={styles.content}>
              <Text style={styles.errorTitle}>Falha ao carregar</Text>
              <Text style={styles.errorText}>
                {errorMessage ?? 'Não foi possível carregar os produtos.'}
              </Text>

              <Button style={styles.retryButton} onPress={() => void loadProducts()}>
                <ButtonText style={styles.retryButtonText}>Tentar novamente</ButtonText>
              </Button>
            </VStack>
          </Card>
        ) : null}

        {status === 'ready' && products.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
          </Card>
        ) : null}

        {status === 'ready' && products.length > 0 ? (
          <VStack style={styles.list}>
            {products.map((product) => (
              <ProductListCard key={product.id} product={product} />
            ))}
          </VStack>
        ) : null}
      </VStack>
    </ScreenShell>
  );
}
