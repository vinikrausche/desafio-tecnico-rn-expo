import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { ScreenShell } from '../../../../src/components/layout/screen-shell';
import { resolveRouteParam } from '../../../../src/lib/router/resolve-route-param';
import { ProductForm } from '../../../../src/features/products/components/product-form';
import { useCreateProductForm } from '../../../../src/features/products/hooks/use-create-product-form';
import { useProductZustand } from '../../../../src/features/products/store/products.store';

export default function StoreProductCreationScreen() {
  const router = useRouter();
  const createProduct = useProductZustand((state) => state.createProduct);
  const { storeId } = useLocalSearchParams<{ storeId?: string | string[] }>();
  const resolvedStoreId = resolveRouteParam(storeId, 'unknown-store');
  const {
    errors,
    formValues,
    getPayload,
    setFormError,
    syncStoreId,
    updateField,
  } = useCreateProductForm(resolvedStoreId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    syncStoreId(resolvedStoreId);
  }, [resolvedStoreId, syncStoreId]);

  async function handleSubmit() {
    const payload = getPayload();

    if (!payload) {
      return;
    }

    try {
      setIsSubmitting(true);

      await createProduct(payload);
      router.replace(`/stores/${resolvedStoreId}/products`);
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

  return (
    <ScreenShell eyebrow="Produtos" title="Novo Produto">
      <ProductForm
        errors={errors}
        formValues={formValues}
        isStoreEditable={false}
        isSubmitting={isSubmitting}
        onCancel={() => router.back()}
        onFieldChange={updateField}
        onStoreSelect={syncStoreId}
        onSubmit={handleSubmit}
      />
    </ScreenShell>
  );
}
