import {
  Badge,
  BadgeText,
  Button,
  ButtonText,
  Card,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { FloatingActionButton } from '../../src/components/actions/floating-action-button';
import { ScreenShell } from '../../src/components/layout/screen-shell';
import { StoreListCard } from '../../src/features/stores/components/store-list-card';
import { storesScreenStyles as styles } from '../../src/features/stores/stores-screen.styles';
import { corporateTheme } from '../../src/theme/corporate-theme';
import { useNavigationStore } from '../../src/store/navigation.store';
import { useProductZustand } from '../../src/zustand/product';
import { useStoreZustand } from '../../src/zustand/store';

// ! A tela de lojas le do cache global e so faz fetch quando o catalogo ainda nao foi hidratado.
export default function StoresScreen() {
  const router = useRouter();
  const deleteStore = useStoreZustand((state) => state.deleteStore);
  const errorMessage = useStoreZustand((state) => state.errorMessage);
  const loadStores = useStoreZustand((state) => state.loadStores);
  const storeIds = useStoreZustand((state) => state.storeIds);
  const storesById = useStoreZustand((state) => state.storesById);
  const status = useStoreZustand((state) => state.status);
  const removeProductsByStore = useProductZustand((state) => state.removeProductsByStore);
  const setLastVisitedModule = useNavigationStore(
    (state) => state.setLastVisitedModule,
  );
  const [pendingStoreId, setPendingStoreId] = useState<string | null>(null);

  useEffect(() => {
    setLastVisitedModule('stores');

    void loadStores();
  }, [loadStores, setLastVisitedModule]);

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
        error instanceof Error ? error.message : 'Nao foi possivel excluir a loja.';

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
        <HStack style={styles.headerRow}>
          <Heading size="md" style={styles.title}>
            Lista
          </Heading>

          <Badge style={styles.counterBadge}>
            <BadgeText style={styles.counterBadgeText}>{stores.length} lojas</BadgeText>
          </Badge>
        </HStack>

        {isLoadingStores ? (
          <Card style={styles.loadingCard}>
            <HStack style={styles.loadingRow}>
              <Spinner size="large" color={corporateTheme.colors.brand} />
              <Text style={styles.loadingText}>Carregando lojas...</Text>
            </HStack>
          </Card>
        ) : null}

        {hasStoreLoadError ? (
          <Card style={styles.errorCard}>
            <VStack style={styles.content}>
              <Text style={styles.errorTitle}>Falha ao carregar</Text>
              <Text style={styles.errorText}>
                {errorMessage ?? 'Não foi possível carregar as lojas.'}
              </Text>

              <Button
                style={styles.retryButton}
                onPress={() => void loadStores({ force: true })}
              >
                <ButtonText style={styles.retryButtonText}>Tentar novamente</ButtonText>
              </Button>
            </VStack>
          </Card>
        ) : null}

        {!isLoadingStores && !hasStoreLoadError && stores.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>Nenhuma loja cadastrada.</Text>
          </Card>
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
                onOpenProducts={() => router.push(`/stores/${store.id}/products`)}
                store={store}
              />
            ))}
          </VStack>
        ) : null}
      </VStack>
    </ScreenShell>
  );
}
