import 'react-native-gesture-handler';

import { Stack } from 'expo-router';

import { AppProvider } from '../src/providers/app-provider';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#163020',
          },
          headerTintColor: '#f5efe6',
          contentStyle: {
            backgroundColor: '#f5efe6',
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Início' }} />
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
