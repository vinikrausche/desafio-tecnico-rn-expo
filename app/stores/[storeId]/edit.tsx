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

import { ScreenShell } from '../../../src/components/layout/screen-shell';
import { StoreForm } from '../../../src/features/stores/components/store-form';
import { useStoreForm } from '../../../src/features/stores/hooks/use-store-form';
import { newStoreScreenStyles as styles } from '../../../src/features/stores/new-store-screen.styles';
import { useNavigationStore } from '../../../src/store/navigation.store';
import { useStoreZustand } from '../../../src/zustand/store';
import { corporateTheme } from '../../../src/theme/corporate-theme';

function resolveParam(param: string | string[] | undefined): string {
  if (Array.isArray(param)) {
    return param[0] ?? 'unknown-store';
  }

  return param ?? 'unknown-store';
}

// ! A edicao de loja usa o mesmo formulario do cadastro e so hidrata os dados iniciais.
export default function EditStoreScreen() {
  const router = useRouter();
  const { storeId } = useLocalSearchParams<{ storeId?: string | string[] }>();
  const resolvedStoreId = resolveParam(storeId);
  const loadStores = useStoreZustand((state) => state.loadStores);
  const store = useStoreZustand((state) => state.storesById[resolvedStoreId]);
  const storesErrorMessage = useStoreZustand((state) => state.errorMessage);
  const storesStatus = useStoreZustand((state) => state.status);
  const updateStore = useStoreZustand((state) => state.updateStore);
  const setLastVisitedModule = useNavigationStore(
    (state) => state.setLastVisitedModule,
  );
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
    setLastVisitedModule('stores');

    void loadStores();
  }, [loadStores, setLastVisitedModule]);

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
      router.replace('/stores');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel atualizar a loja.';

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
          <Card style={styles.loadingCard}>
            <VStack style={styles.loadingContent}>
              <Spinner size="large" color={corporateTheme.colors.brand} />
              <Text style={styles.loadingText}>Carregando loja...</Text>
            </VStack>
          </Card>
        ) : null}

        {hasStoreLoadError ? (
          <Card style={styles.emptyStateCard}>
            <VStack style={styles.emptyStateContent}>
              <Text style={styles.emptyStateText}>
                {storesErrorMessage ?? 'Nao foi possivel carregar a loja.'}
              </Text>

              <Button
                style={styles.primaryButton}
                onPress={() => void loadStores({ force: true })}
              >
                <ButtonText style={styles.primaryButtonText}>
                  Tentar novamente
                </ButtonText>
              </Button>
            </VStack>
          </Card>
        ) : null}

        {isStoreMissing ? (
          <Card style={styles.emptyStateCard}>
            <VStack style={styles.emptyStateContent}>
              <Text style={styles.emptyStateText}>Loja nao encontrada.</Text>

              <Button
                style={styles.secondaryButton}
                onPress={() => router.replace('/stores')}
              >
                <ButtonText style={styles.secondaryButtonText}>
                  Voltar para lojas
                </ButtonText>
              </Button>
            </VStack>
          </Card>
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
