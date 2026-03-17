import {
  Button,
  ButtonText,
  Card,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';

import { ScreenShell } from '../../src/components/layout/screen-shell';
import { ProductForm } from '../../src/features/products/components/product-form';
import { useCreateProductForm } from '../../src/features/products/hooks/use-create-product-form';
import { newProductScreenStyles as styles } from '../../src/features/products/new-product-screen.styles';
import { corporateTheme } from '../../src/theme/corporate-theme';
import { useNavigationStore } from '../../src/store/navigation.store';
import { useStoreZustand } from '../../src/zustand/store';
import { useProductZustand } from '../../src/zustand/product';

// ! The top-level product flow keeps the full form visible and lets the user bind the item to a store.
export default function NewProductScreen() {
  const router = useRouter();
  const createProduct = useProductZustand((state) => state.createProduct);
  const loadStores = useStoreZustand((state) => state.loadStores);
  const storeIds = useStoreZustand((state) => state.storeIds);
  const storesById = useStoreZustand((state) => state.storesById);
  const storesErrorMessage = useStoreZustand((state) => state.errorMessage);
  const storesStatus = useStoreZustand((state) => state.status);
  const setLastVisitedModule = useNavigationStore(
    (state) => state.setLastVisitedModule,
  );
  const {
    errors,
    formValues,
    getPayload,
    setFormError,
    syncStoreId,
    updateField,
  } = useCreateProductForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLastVisitedModule('products');

    void loadStores();
  }, [loadStores, setLastVisitedModule]);

  const stores = useMemo(
    () =>
      storeIds
        .map((storeId) => storesById[storeId])
        .filter((store): store is NonNullable<typeof store> => Boolean(store)),
    [storeIds, storesById],
  );

  useEffect(() => {
    if (stores.length === 1 && !formValues.storeId) {
      syncStoreId(stores[0].id);
    }
  }, [formValues.storeId, stores, syncStoreId]);

  async function handleSubmit() {
    const payload = getPayload();

    if (!payload) {
      return;
    }

    try {
      setIsSubmitting(true);

      await createProduct(payload);
      router.replace('/products');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel salvar o produto.';

      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const hasStores = stores.length > 0;
  const isLoadingStores = storesStatus === 'idle' || storesStatus === 'loading';
  const hasStoreLoadError = storesStatus === 'error';

  return (
    <ScreenShell eyebrow="Produtos" title="Novo Produto">
      <VStack style={styles.content}>
        {isLoadingStores ? (
          <Card style={styles.loadingCard}>
            <VStack style={styles.loadingContent}>
              <Spinner size="large" color={corporateTheme.colors.brand} />
              <Text style={styles.loadingText}>Carregando lojas...</Text>
            </VStack>
          </Card>
        ) : null}

        {hasStoreLoadError ? (
          <Card style={styles.emptyStateCard}>
            <VStack style={styles.emptyStateContent}>
              <Text style={styles.emptyStateText}>
                Nao foi possivel carregar as lojas para vincular o produto.
              </Text>

              <Button
                style={styles.primaryButton}
                onPress={() => void loadStores({ force: true })}
              >
                <ButtonText style={styles.primaryButtonText}>
                  Tentar novamente
                </ButtonText>
              </Button>

              {storesErrorMessage ? (
                <Text style={styles.formError}>{storesErrorMessage}</Text>
              ) : null}
            </VStack>
          </Card>
        ) : null}

        {!isLoadingStores && !hasStoreLoadError && !hasStores ? (
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

        {!isLoadingStores && !hasStoreLoadError ? (
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
