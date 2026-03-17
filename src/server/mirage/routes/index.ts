import { productHandlers } from './products';
import { storeHandlers } from './stores';

export const handlers = [...storeHandlers, ...productHandlers];
