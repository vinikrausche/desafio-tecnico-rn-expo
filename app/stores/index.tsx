import { VStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { StateCard } from '../../src/components/feedback/state-card';
import { ListHeader } from '../../src/components/layout/list-header';
import { FloatingActionButton } from '../../src/components/actions/floating-action-button';
import { ScreenShell } from '../../src/components/layout/screen-shell';
import { useProductZustand } from '../../src/features/products/store/products.store';
import { StoreListCard } from '../../src/features/stores/components/store-list-card';
import { storesScreenStyles as styles } from '../../src/features/stores/stores-screen.styles';
import { useStoreZustand } from '../../src/features/stores/store/stores.store';

export default function StoresScreen() {
  const router = useRouter();
  const deleteStore = useStoreZustand((state) => state.deleteStore);
  const errorMessage = useStoreZustand((state) => state.errorMessage);
  const loadStores = useStoreZustand((state) => state.loadStores);
  const storeIds = useStoreZustand((state) => state.storeIds);
  const storesById = useStoreZustand((state) => state.storesById);
  const status = useStoreZustand((state) => state.status);
  const removeProductsByStore = useProductZustand(
    (state) => state.removeProductsByStore,
  );
  const [pendingStoreId, setPendingStoreId] = useState<string | null>(null);

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

  const isLoadingStores = status === 'idle' || status === 'loading';
  const hasStoreLoadError = status === 'error';

  async function handleDeleteStore(storeId: string) {
    try {
      setPendingStoreId(storeId);

      await deleteStore(storeId);
      removeProductsByStore(storeId);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel excluir a loja.';

      Alert.alert('Erro ao excluir', message);
    } finally {
      setPendingStoreId(null);
    }
  }

  function confirmDeleteStore(storeId: string, storeName: string) {
    Alert.alert(
      'Excluir loja',
      `Deseja excluir a loja "${storeName}"? Os produtos vinculados tambem sairao da lista.`,
      [
        { style: 'cancel', text: 'Cancelar' },
        {
          style: 'destructive',
          text: 'Excluir',
          onPress: () => {
            void handleDeleteStore(storeId);
          },
        },
      ],
    );
  }

  return (
    <ScreenShell
      eyebrow="Lojas"
      floatingAction={
        <FloatingActionButton
          accessibilityLabel="Cadastrar loja"
          onPress={() => router.push('/stores/new')}
        />
      }
      title="Lojas"
    >
      <VStack style={styles.content}>
        <ListHeader badgeLabel={`${stores.length} lojas`} title="Lista" />

        {isLoadingStores ? (
          <StateCard
            layout="row"
            message="Carregando lojas..."
            minHeight={120}
            showSpinner
            tone="surface"
          />
        ) : null}

        {hasStoreLoadError ? (
          <StateCard
            actionLabel="Tentar novamente"
            message={errorMessage ?? 'Nao foi possivel carregar as lojas.'}
            onAction={() => void loadStores({ force: true })}
            title="Falha ao carregar"
            tone="error"
          />
        ) : null}

        {!isLoadingStores && !hasStoreLoadError && stores.length === 0 ? (
          <StateCard message="Nenhuma loja cadastrada." tone="surface" />
        ) : null}

        {!isLoadingStores && !hasStoreLoadError && stores.length > 0 ? (
          <VStack style={styles.list}>
            {stores.map((store) => (
              <StoreListCard
                key={store.id}
                onDelete={() => {
                  if (pendingStoreId === store.id) {
                    return;
                  }

                  confirmDeleteStore(store.id, store.name);
                }}
                onEdit={() => router.push(`/stores/${store.id}/edit`)}
                onOpenProducts={() =>
                  router.push(`/stores/${store.id}/products`)
                }
                store={store}
              />
            ))}
          </VStack>
        ) : null}
      </VStack>
    </ScreenShell>
  );
}
