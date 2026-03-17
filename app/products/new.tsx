import {
  Button,
  ButtonText,
  Card,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { ScreenShell } from '../../src/components/layout/screen-shell';
import { ProductForm } from '../../src/features/products/components/product-form';
import { useCreateProductForm } from '../../src/features/products/hooks/use-create-product-form';
import { newProductScreenStyles as styles } from '../../src/features/products/new-product-screen.styles';
import { productsService } from '../../src/features/products/services/products.service';
import { storesService } from '../../src/features/stores/services/stores.service';
import type { StoreSummary } from '../../src/features/stores/store.types';
import { corporateTheme } from '../../src/theme/corporate-theme';
import { useNavigationStore } from '../../src/store/navigation.store';

type ProductCreationStatus = 'error' | 'loading' | 'ready';

// ! The top-level product flow keeps the full form visible and lets the user bind the item to a store.
export default function NewProductScreen() {
  const router = useRouter();
  const setLastVisitedModule = useNavigationStore(
    (state) => state.setLastVisitedModule,
  );
  const { errors, formValues, getPayload, setFormError, syncStoreId, updateField } =
    useCreateProductForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<ProductCreationStatus>('loading');
  const [stores, setStores] = useState<StoreSummary[]>([]);

  useEffect(() => {
    setLastVisitedModule('products');

    void loadStores();
  }, [setLastVisitedModule]);

  // ! Store loading stays on the screen because this route needs the available options before submit.
  async function loadStores() {
    try {
      setStatus('loading');

      const nextStores = await storesService.list();

      setStores(nextStores);
      setStatus('ready');

      if (nextStores.length === 1) {
        syncStoreId(nextStores[0].id);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Nao foi possivel carregar as lojas.';

      setFormError(message);
      setStatus('error');
    }
  }

  async function handleSubmit() {
    const payload = getPayload();

    if (!payload) {
      return;
    }

    try {
      setIsSubmitting(true);

      await productsService.create(payload);
      router.replace('/products');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Nao foi possivel salvar o produto.';

      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const hasStores = stores.length > 0;

  return (
    <ScreenShell eyebrow="Produtos" title="Novo Produto">
      <VStack style={styles.content}>
        {status === 'loading' ? (
          <Card style={styles.loadingCard}>
            <VStack style={styles.loadingContent}>
              <Spinner size="large" color={corporateTheme.colors.brand} />
              <Text style={styles.loadingText}>Carregando lojas...</Text>
            </VStack>
          </Card>
        ) : null}

        {status === 'error' ? (
          <Card style={styles.emptyStateCard}>
            <VStack style={styles.emptyStateContent}>
              <Text style={styles.emptyStateText}>
                Nao foi possivel carregar as lojas para vincular o produto.
              </Text>

              <Button style={styles.primaryButton} onPress={() => void loadStores()}>
                <ButtonText style={styles.primaryButtonText}>Tentar novamente</ButtonText>
              </Button>
            </VStack>
          </Card>
        ) : null}

        {status === 'ready' && !hasStores ? (
          <Card style={styles.emptyStateCard}>
            <VStack style={styles.emptyStateContent}>
              <Text style={styles.emptyStateText}>
                Cadastre uma loja para vincular o produto antes de salvar.
              </Text>

              <Button
                onPress={() => router.push('/stores/new')}
                style={styles.primaryButton}
              >
                <ButtonText style={styles.primaryButtonText}>
                  Cadastrar loja
                </ButtonText>
              </Button>
            </VStack>
          </Card>
        ) : null}

        {status === 'ready' ? (
          <ProductForm
            errors={errors}
            formValues={formValues}
            isStoreEditable
            isSubmitDisabled={!hasStores}
            isSubmitting={isSubmitting}
            onCancel={() => router.back()}
            onFieldChange={updateField}
            onStoreSelect={syncStoreId}
            onSubmit={handleSubmit}
            storeOptions={stores}
          />
        ) : null}
      </VStack>
    </ScreenShell>
  );
}
