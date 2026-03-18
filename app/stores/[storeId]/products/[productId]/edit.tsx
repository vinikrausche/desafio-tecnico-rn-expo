import { VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { StateCard } from '../../../../../src/components/feedback/state-card';
import { ScreenShell } from '../../../../../src/components/layout/screen-shell';
import { resolveRouteParam } from '../../../../../src/lib/router/resolve-route-param';
import { ProductForm } from '../../../../../src/features/products/components/product-form';
import { useCreateProductForm } from '../../../../../src/features/products/hooks/use-create-product-form';
import { newProductScreenStyles as styles } from '../../../../../src/features/products/new-product-screen.styles';
import { useProductZustand } from '../../../../../src/features/products/store/products.store';

function formatPriceForInput(value: number) {
  return value.toFixed(2).replace('.', ',');
}

export default function EditProductScreen() {
  const router = useRouter();
  const { productId, storeId } = useLocalSearchParams<{
    productId?: string | string[];
    storeId?: string | string[];
  }>();
  const resolvedProductId = resolveRouteParam(productId, 'unknown-product');
  const resolvedStoreId = resolveRouteParam(storeId, 'unknown-store');
  const currentProduct = useProductZustand(
    (state) => state.productsById[resolvedProductId],
  );
  const loadProductsByStore = useProductZustand(
    (state) => state.loadProductsByStore,
  );
  const productErrorMessage = useProductZustand(
    (state) => state.storeErrorMessageById[resolvedStoreId] ?? null,
  );
  const productStatus = useProductZustand(
    (state) => state.storeStatusById[resolvedStoreId] ?? 'idle',
  );
  const updateProduct = useProductZustand((state) => state.updateProduct);
  const {
    errors,
    formValues,
    getUpdatePayload,
    replaceFormValues,
    setFormError,
    syncStoreId,
    updateField,
  } = useCreateProductForm(resolvedStoreId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    void loadProductsByStore(resolvedStoreId);
  }, [loadProductsByStore, resolvedStoreId]);

  useEffect(() => {
    syncStoreId(resolvedStoreId);
  }, [resolvedStoreId, syncStoreId]);

  useEffect(() => {
    if (!currentProduct) {
      return;
    }

    replaceFormValues({
      category: currentProduct.category,
      name: currentProduct.name,
      price: formatPriceForInput(currentProduct.price),
      storeId: currentProduct.storeId,
    });
  }, [currentProduct, replaceFormValues]);

  async function handleSubmit() {
    const payload = getUpdatePayload();

    if (!payload) {
      return;
    }

    try {
      setIsSubmitting(true);

      await updateProduct(resolvedProductId, payload);
      router.replace(`/stores/${resolvedStoreId}/products`);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel atualizar o produto.';

      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isLoadingProduct =
    (productStatus === 'idle' || productStatus === 'loading') &&
    !currentProduct;
  const hasProductLoadError = productStatus === 'error' && !currentProduct;
  const isProductMissing = productStatus === 'ready' && !currentProduct;

  return (
    <ScreenShell eyebrow="Produtos" title="Editar Produto">
      <VStack style={styles.content}>
        {isLoadingProduct ? (
          <StateCard
            align="center"
            layout="column"
            message="Carregando produto..."
            minHeight={96}
            showSpinner
            tone="surface"
          />
        ) : null}

        {hasProductLoadError ? (
          <StateCard
            actionLabel="Tentar novamente"
            message={
              productErrorMessage ?? 'Nao foi possivel carregar o produto.'
            }
            onAction={() =>
              void loadProductsByStore(resolvedStoreId, { force: true })
            }
            tone="soft"
          />
        ) : null}

        {isProductMissing ? (
          <StateCard
            actionLabel="Voltar para produtos"
            actionVariant="secondary"
            message="Produto nao encontrado."
            onAction={() =>
              router.replace(`/stores/${resolvedStoreId}/products`)
            }
            tone="soft"
          />
        ) : null}

        {!isLoadingProduct && !hasProductLoadError && !isProductMissing ? (
          <ProductForm
            errors={errors}
            formValues={formValues}
            isStoreEditable={false}
            isSubmitting={isSubmitting}
            onCancel={() => router.back()}
            onFieldChange={updateField}
            onStoreSelect={syncStoreId}
            onSubmit={handleSubmit}
            submitLabel="Salvar alteracoes"
          />
        ) : null}
      </VStack>
    </ScreenShell>
  );
}
