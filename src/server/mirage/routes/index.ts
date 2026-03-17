import type { Server } from 'miragejs';

import { registerProductRoutes } from './products';
import { registerStoreRoutes } from './stores';

export function handlers(server: Server) {
  registerStoreRoutes(server);
  registerProductRoutes(server);
}
