import 'react-native-url-polyfill/auto';

import { setupServer } from 'msw/native';

import { handlers } from './routes';

const server = setupServer(...handlers);

let isRunning = false;

export async function startMockServer() {
  if (isRunning) {
    return;
  }

  server.listen({
    onUnhandledRequest: 'bypass',
  });

  isRunning = true;
}

export { server };
