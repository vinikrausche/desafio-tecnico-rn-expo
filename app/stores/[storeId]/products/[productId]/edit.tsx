import {
  Button,
  ButtonText,
  Card,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { ScreenShell } from '../../../../../src/components/layout/screen-shell';
import { ProductForm } from '../../../../../src/features/products/components/product-form';
import { useCreateProductForm } from '../../../../../src/features/products/hooks/use-create-product-form';
import { newProductScreenStyles as styles } from '../../../../../src/features/products/new-product-screen.styles';
import { useNavigationStore } from '../../../../../src/store/navigation.store';
import { useProductZustand } from '../../../../../src/zustand/product';
import { corporateTheme } from '../../../../../src/theme/corporate-theme';

function resolveParam(
  param: string | string[] | undefined,
  fallback: string,
): string {
  if (Array.isArray(param)) {
    return param[0] ?? fallback;
  }

  return param ?? fallback;
}

function formatPriceForInput(value: number): string {
  return value.toFixed(2).replace('.', ',');
}

// ! A edicao de produto reaproveita o formulario do cadastro e mantem a loja vinculada fixa.
export default function EditProductScreen() {
  const router = useRouter();
  const { productId, storeId } = useLocalSearchParams<{
    productId?: string | string[];
    storeId?: string | string[];
  }>();
  const resolvedProductId = resolveParam(productId, 'unknown-product');
  const resolvedStoreId = resolveParam(storeId, 'unknown-store');
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
  const setLastVisitedModule = useNavigationStore(
    (state) => state.setLastVisitedModule,
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
    setLastVisitedModule('products');

    void loadProductsByStore(resolvedStoreId);
  }, [loadProductsByStore, resolvedStoreId, setLastVisitedModule]);

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
          <Card style={styles.loadingCard}>
            <VStack style={styles.loadingContent}>
              <Spinner size="large" color={corporateTheme.colors.brand} />
              <Text style={styles.loadingText}>Carregando produto...</Text>
            </VStack>
          </Card>
        ) : null}

        {hasProductLoadError ? (
          <Card style={styles.emptyStateCard}>
            <VStack style={styles.emptyStateContent}>
              <Text style={styles.emptyStateText}>
                {productErrorMessage ?? 'Nao foi possivel carregar o produto.'}
              </Text>

              <Button
                style={styles.primaryButton}
                onPress={() =>
                  void loadProductsByStore(resolvedStoreId, { force: true })
                }
              >
                <ButtonText style={styles.primaryButtonText}>
                  Tentar novamente
                </ButtonText>
              </Button>
            </VStack>
          </Card>
        ) : null}

        {isProductMissing ? (
          <Card style={styles.emptyStateCard}>
            <VStack style={styles.emptyStateContent}>
              <Text style={styles.emptyStateText}>Produto nao encontrado.</Text>

              <Button
                style={styles.secondaryButton}
                onPress={() =>
                  router.replace(`/stores/${resolvedStoreId}/products`)
                }
              >
                <ButtonText style={styles.secondaryButtonText}>
                  Voltar para produtos
                </ButtonText>
              </Button>
            </VStack>
          </Card>
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
