import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { ScreenShell } from '../../../../src/components/layout/screen-shell';
import { ProductForm } from '../../../../src/features/products/components/product-form';
import { useCreateProductForm } from '../../../../src/features/products/hooks/use-create-product-form';
import { useNavigationStore } from '../../../../src/store/navigation.store';
import { useProductZustand } from '../../../../src/zustand/product';

function resolveParam(param: string | string[] | undefined): string {
  if (Array.isArray(param)) {
    return param[0] ?? 'unknown-store';
  }

  return param ?? 'unknown-store';
}

// ! The store-scoped route reuses the same form model but keeps the store binding fixed.
export default function StoreProductCreationScreen() {
  const router = useRouter();
  const createProduct = useProductZustand((state) => state.createProduct);
  const { storeId } = useLocalSearchParams<{ storeId?: string | string[] }>();
  const resolvedStoreId = resolveParam(storeId);
  const setLastVisitedModule = useNavigationStore(
    (state) => state.setLastVisitedModule,
  );
  const { errors, formValues, getPayload, setFormError, syncStoreId, updateField } =
    useCreateProductForm(resolvedStoreId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLastVisitedModule('products');
  }, [setLastVisitedModule]);

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
        error instanceof Error ? error.message : 'Nao foi possivel salvar o produto.';

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
