import type { Server } from 'miragejs';

import { registerProductRoutes } from './products';
import { registerStoreRoutes } from './stores';

// ! v1 centralizes the active Mirage contract for the mobile app.
export function registerV1Routes(server: Server) {
  registerStoreRoutes(server);
  registerProductRoutes(server);
}
