// ! Gera ids consistentes para os models do Mirage.
export function generateModelId(prefix: 'product' | 'store'): string {
  const suffix = Math.random().toString(36).slice(2, 8);

  return `${prefix}-${Date.now()}-${suffix}`;
}
