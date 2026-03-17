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
import { useEffect, useState } from 'react';

import { FloatingActionButton } from '../../src/components/actions/floating-action-button';
import { ScreenShell } from '../../src/components/layout/screen-shell';
import { StoreListCard } from '../../src/features/stores/components/store-list-card';
import { storesScreenStyles as styles } from '../../src/features/stores/stores-screen.styles';
import { storesService } from '../../src/features/stores/services/stores.service';
import type { StoreSummary } from '../../src/features/stores/store.types';
import { corporateTheme } from '../../src/theme/corporate-theme';
import { useNavigationStore } from '../../src/store/navigation.store';

type StoresScreenStatus = 'error' | 'loading' | 'ready';

// ! Stores screen reads live data from Mirage through the service layer.
export default function StoresScreen() {
  const router = useRouter();
  const setLastVisitedModule = useNavigationStore(
    (state) => state.setLastVisitedModule,
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<StoresScreenStatus>('loading');
  const [stores, setStores] = useState<StoreSummary[]>([]);

  useEffect(() => {
    setLastVisitedModule('stores');

    void loadStores();
  }, [setLastVisitedModule]);

  // ! Reload stays local to the screen to keep the flow explicit and easy to trace.
  async function loadStores() {
    try {
      setStatus('loading');
      setErrorMessage(null);

      const nextStores = await storesService.list();
      setStores(nextStores);
      setStatus('ready');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Não foi possível carregar as lojas.';

      setErrorMessage(message);
      setStatus('error');
    }
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

        {status === 'loading' ? (
          <Card style={styles.loadingCard}>
            <HStack style={styles.loadingRow}>
              <Spinner size="large" color={corporateTheme.colors.brand} />
              <Text style={styles.loadingText}>Carregando lojas...</Text>
            </HStack>
          </Card>
        ) : null}

        {status === 'error' ? (
          <Card style={styles.errorCard}>
            <VStack style={styles.content}>
              <Text style={styles.errorTitle}>Falha ao carregar</Text>
              <Text style={styles.errorText}>
                {errorMessage ?? 'Não foi possível carregar as lojas.'}
              </Text>

              <Button style={styles.retryButton} onPress={() => void loadStores()}>
                <ButtonText style={styles.retryButtonText}>Tentar novamente</ButtonText>
              </Button>
            </VStack>
          </Card>
        ) : null}

        {status === 'ready' && stores.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>Nenhuma loja cadastrada.</Text>
          </Card>
        ) : null}

        {status === 'ready' && stores.length > 0 ? (
          <VStack style={styles.list}>
            {stores.map((store) => (
              <StoreListCard key={store.id} store={store} />
            ))}
          </VStack>
        ) : null}
      </VStack>
    </ScreenShell>
  );
}
