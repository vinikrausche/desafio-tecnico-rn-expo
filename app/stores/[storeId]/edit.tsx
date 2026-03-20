import { VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { useAppToast } from '../../../src/components/feedback/use-app-toast';
import { StateCard } from '../../../src/components/feedback/state-card';
import { ScreenShell } from '../../../src/components/layout/screen-shell';
import { resolveRouteParam } from '../../../src/lib/router/resolve-route-param';
import { StoreForm } from '../../../src/features/stores/components/store-form';
import { useStoreForm } from '../../../src/features/stores/hooks/use-store-form';
import { newStoreScreenStyles as styles } from '../../../src/features/stores/new-store-screen.styles';
import { useStoreZustand } from '../../../src/features/stores/store/stores.store';

export default function EditStoreScreen() {
  const router = useRouter();
  const { showError, showSuccess } = useAppToast();
  const { storeId } = useLocalSearchParams<{ storeId?: string | string[] }>();
  const resolvedStoreId = resolveRouteParam(storeId, 'unknown-store');
  const loadStores = useStoreZustand((state) => state.loadStores);
  const store = useStoreZustand((state) => state.storesById[resolvedStoreId]);
  const storesErrorMessage = useStoreZustand((state) => state.errorMessage);
  const storesStatus = useStoreZustand((state) => state.status);
  const updateStore = useStoreZustand((state) => state.updateStore);
  const {
    errors,
    formValues,
    getUpdatePayload,
    replaceFormValues,
    setFormError,
    updateField,
  } = useStoreForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    void loadStores();
  }, [loadStores]);

  useEffect(() => {
    if (!store) {
      return;
    }

    replaceFormValues({
      address: store.address,
      name: store.name,
    });
  }, [replaceFormValues, store]);

  async function handleSubmit() {
    const payload = getUpdatePayload();

    if (!payload) {
      return;
    }

    try {
      setIsSubmitting(true);

      await updateStore(resolvedStoreId, payload);

      showSuccess({
        message: `A loja "${payload.name}" foi atualizada com sucesso.`,
        title: 'Loja atualizada',
      });
      router.replace('/stores');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel atualizar a loja.';

      showError({
        message,
        title: 'Erro ao atualizar',
      });
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isLoadingStore =
    (storesStatus === 'idle' || storesStatus === 'loading') && !store;
  const hasStoreLoadError = storesStatus === 'error' && !store;
  const isStoreMissing = storesStatus === 'ready' && !store;

  return (
    <ScreenShell eyebrow="Lojas" title="Editar Loja">
      <VStack style={styles.content}>
        {isLoadingStore ? (
          <StateCard
            align="center"
            layout="column"
            message="Carregando loja..."
            minHeight={96}
            showSpinner
            tone="surface"
          />
        ) : null}

        {hasStoreLoadError ? (
          <StateCard
            actionLabel="Tentar novamente"
            message={storesErrorMessage ?? 'Nao foi possivel carregar a loja.'}
            onAction={() => void loadStores({ force: true })}
            tone="soft"
          />
        ) : null}

        {isStoreMissing ? (
          <StateCard
            actionLabel="Voltar para lojas"
            actionVariant="secondary"
            message="Loja nao encontrada."
            onAction={() => router.replace('/stores')}
            tone="soft"
          />
        ) : null}

        {!isLoadingStore && !hasStoreLoadError && !isStoreMissing ? (
          <StoreForm
            errors={errors}
            formValues={formValues}
            isSubmitting={isSubmitting}
            onCancel={() => router.back()}
            onFieldChange={updateField}
            onSubmit={handleSubmit}
            submitLabel="Salvar alteracoes"
          />
        ) : null}
      </VStack>
    </ScreenShell>
  );
}
