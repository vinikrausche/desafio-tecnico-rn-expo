import 'react-native-gesture-handler';

import { Stack } from 'expo-router';

import { AppProvider } from '../src/providers/app-provider';
import { corporateTheme } from '../src/theme/corporate-theme';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: corporateTheme.colors.brandStrong,
          },
          headerTintColor: corporateTheme.colors.textInverse,
          contentStyle: {
            backgroundColor: corporateTheme.colors.background,
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Início' }} />
        <Stack.Screen name="products/index" options={{ title: 'Produtos' }} />
        <Stack.Screen name="products/new" options={{ title: 'Novo Produto' }} />
        <Stack.Screen name="stores/index" options={{ title: 'Lojas' }} />
        <Stack.Screen name="stores/new" options={{ title: 'Nova Loja' }} />
        <Stack.Screen
          name="stores/[storeId]/edit"
          options={{ title: 'Editar Loja' }}
        />
        <Stack.Screen
          name="stores/[storeId]/products/index"
          options={{ title: 'Produtos da Loja' }}
        />
        <Stack.Screen
          name="stores/[storeId]/products/new"
          options={{ title: 'Novo Produto' }}
        />
        <Stack.Screen
          name="stores/[storeId]/products/[productId]/edit"
          options={{ title: 'Editar Produto' }}
        />
        <Stack.Screen name="+not-found" options={{ title: 'Rota não encontrada' }} />
      </Stack>
    </AppProvider>
  );
}
