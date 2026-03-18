import { Text, VStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';

import { StateCard } from '../../src/components/feedback/state-card';
import { ScreenShell } from '../../src/components/layout/screen-shell';
import { useStoreZustand } from '../../src/features/stores/store/stores.store';
import { ProductForm } from '../../src/features/products/components/product-form';
import { useCreateProductForm } from '../../src/features/products/hooks/use-create-product-form';
import { newProductScreenStyles as styles } from '../../src/features/products/new-product-screen.styles';
import { useProductZustand } from '../../src/features/products/store/products.store';

export default function NewProductScreen() {
  const router = useRouter();
  const createProduct = useProductZustand((state) => state.createProduct);
  const loadStores = useStoreZustand((state) => state.loadStores);
  const storeIds = useStoreZustand((state) => state.storeIds);
  const storesById = useStoreZustand((state) => state.storesById);
  const storesErrorMessage = useStoreZustand((state) => state.errorMessage);
  const storesStatus = useStoreZustand((state) => state.status);
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
    void loadStores();
  }, [loadStores]);

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
          <StateCard
            align="center"
            layout="column"
            message="Carregando lojas..."
            minHeight={96}
            showSpinner
            tone="surface"
          />
        ) : null}

        {hasStoreLoadError ? (
          <StateCard
            actionLabel="Tentar novamente"
            message="Nao foi possivel carregar as lojas para vincular o produto."
            onAction={() => void loadStores({ force: true })}
            tone="soft"
          >
            {storesErrorMessage ? (
              <Text style={styles.formError}>{storesErrorMessage}</Text>
            ) : null}
          </StateCard>
        ) : null}

        {!isLoadingStores && !hasStoreLoadError && !hasStores ? (
          <StateCard
            actionLabel="Cadastrar loja"
            message="Cadastre uma loja para vincular o produto antes de salvar."
            onAction={() => router.push('/stores/new')}
            tone="soft"
          />
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
