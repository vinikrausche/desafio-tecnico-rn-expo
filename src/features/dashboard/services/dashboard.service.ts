import { requestJson } from '../../../lib/api/client';
import type { ProductSummary } from '../../products/product.types';
import type { StoreSummary } from '../../stores/store.types';

export type DashboardSnapshot = {
  products: ProductSummary[];
  stores: StoreSummary[];
};

// ! Dashboard data comes from the same app service layer used by the feature screens.
export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const [stores, products] = await Promise.all([
    requestJson<StoreSummary[]>('/stores'),
    requestJson<ProductSummary[]>('/products'),
  ]);

  return {
    products,
    stores,
  };
}
