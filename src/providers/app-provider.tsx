import { gluestackUIConfig } from '@gluestack-ui/config';
import { OverlayProvider } from '@gluestack-ui/overlay';
import {
  Box,
  GluestackUIProvider,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';
import { type PropsWithChildren, useEffect, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { appProviderStyles as styles } from './app-provider.styles';
import { useAppBootstrapStore } from '../store/app-bootstrap.store';

async function bootstrapApplication() {
  if (__DEV__) {
    const { startMockServer } = await import('../server/mirage');
    await startMockServer();
  }
}

function BootstrapFallback({
  errorMessage,
  status,
}: {
  errorMessage: string | null;
  status: 'idle' | 'starting' | 'ready' | 'error';
}) {
  const helperText =
    status === 'error'
      ? (errorMessage ?? 'Falha ao inicializar a base do aplicativo.')
      : 'Carregando providers, navegação e mock API local.';

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={gluestackUIConfig}>
        <Box style={styles.fallbackContainer}>
          <VStack style={styles.fallbackContent}>
            <Spinner size="large" color="$emerald600" />
            <Text style={styles.fallbackTitle}>
              {status === 'error'
                ? 'Inicialização interrompida'
                : 'Preparando o app'}
            </Text>
            <Text style={styles.fallbackText}>{helperText}</Text>
          </VStack>
          <StatusBar style="dark" />
        </Box>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

export function AppProvider({ children }: PropsWithChildren) {
  const hasStartedRef = useRef(false);
  const errorMessage = useAppBootstrapStore((state) => state.errorMessage);
  const markError = useAppBootstrapStore((state) => state.markError);
  const markReady = useAppBootstrapStore((state) => state.markReady);
  const markStarting = useAppBootstrapStore((state) => state.markStarting);
  const status = useAppBootstrapStore((state) => state.status);

  useEffect(() => {
    if (hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;

    void (async () => {
      try {
        markStarting();
        await bootstrapApplication();
        markReady();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown bootstrap error';

        markError(message);
      }
    })();
  }, [markError, markReady, markStarting]);

  if (status !== 'ready') {
    return <BootstrapFallback errorMessage={errorMessage} status={status} />;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <GluestackUIProvider config={gluestackUIConfig}>
          <OverlayProvider>
            {children}
            <StatusBar style="light" />
          </OverlayProvider>
        </GluestackUIProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
