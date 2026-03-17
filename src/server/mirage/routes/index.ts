import type { Server } from 'miragejs';
import { V1Routes } from './v1';

export function handlers(server: Server) {
  V1Routes(server);
}
