import { StyleSheet } from 'react-native';

import { corporateShadows, corporateTheme } from '../../theme/corporate-theme';

const cardBase = {
  ...corporateShadows.card,
  backgroundColor: corporateTheme.colors.surface,
  borderColor: corporateTheme.colors.border,
  borderRadius: 26,
  borderWidth: 1,
  padding: 20,
} as const;

const metricCardBase = {
  ...corporateShadows.card,
  borderRadius: 24,
  borderWidth: 1,
  flexGrow: 1,
  minWidth: 155,
  padding: 18,
} as const;

const pillBase = {
  borderRadius: 999,
  borderWidth: 1,
  paddingHorizontal: 12,
  paddingVertical: 6,
} as const;

export const dashboardStyles = StyleSheet.create({
  actionsCard: {
    ...cardBase,
  },
  buttonList: {
    gap: 12,
  },
  content: {
    gap: 18,
  },
  emptyStateText: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  feedbackBlock: {
    backgroundColor: corporateTheme.colors.errorSoft,
    borderColor: corporateTheme.colors.errorBorder,
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  feedbackText: {
    color: '#7A271A',
    fontSize: 14,
    lineHeight: 20,
  },
  feedbackTitle: {
    color: corporateTheme.colors.error,
    fontSize: 16,
    fontWeight: '700',
  },
  ghostButton: {
    alignSelf: 'flex-start',
    backgroundColor: corporateTheme.colors.brandStrong,
    borderColor: corporateTheme.colors.brandStrong,
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 42,
  },
  ghostButtonText: {
    color: corporateTheme.colors.textInverse,
    fontSize: 13,
    fontWeight: '700',
  },
  highlightCard: {
    ...cardBase,
  },
  leadStoreAddress: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  leadStoreBadge: {
    ...pillBase,
    backgroundColor: corporateTheme.colors.brandSoft,
    borderColor: corporateTheme.colors.brandMuted,
  },
  leadStoreBadgeText: {
    color: corporateTheme.colors.brandStrong,
    fontSize: 12,
    fontWeight: '700',
  },
  leadStoreContent: {
    gap: 14,
  },
  leadStoreMeta: {
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  leadStoreName: {
    color: corporateTheme.colors.textPrimary,
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 30,
  },
  loadingRow: {
    alignItems: 'center',
    gap: 12,
    minHeight: 72,
  },
  loadingText: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 14,
  },
  metricCardAccent: {
    ...metricCardBase,
    backgroundColor: corporateTheme.colors.brand,
    borderColor: corporateTheme.colors.brand,
  },
  metricCardPrimary: {
    ...metricCardBase,
    backgroundColor: corporateTheme.colors.brandStrong,
    borderColor: corporateTheme.colors.brandStrong,
  },
  metricCardSecondary: {
    ...metricCardBase,
    backgroundColor: corporateTheme.colors.surface,
    borderColor: corporateTheme.colors.border,
  },
  metricContent: {
    gap: 8,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  metricLabel: {
    color: '#D6E4F0',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  metricLabelDark: {
    color: corporateTheme.colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  metricValue: {
    color: corporateTheme.colors.textInverse,
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 38,
  },
  metricValueAccent: {
    color: corporateTheme.colors.textInverse,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  metricValueDark: {
    color: corporateTheme.colors.textPrimary,
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 38,
  },
  positionBadge: {
    ...pillBase,
    backgroundColor: corporateTheme.colors.brandSoft,
    borderColor: corporateTheme.colors.brandMuted,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  positionBadgeText: {
    color: corporateTheme.colors.brandStrong,
    fontSize: 12,
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: corporateTheme.colors.brandStrong,
    borderRadius: 18,
    minHeight: 52,
  },
  primaryButtonText: {
    color: corporateTheme.colors.textInverse,
    fontSize: 15,
    fontWeight: '700',
  },
  rankingCard: {
    ...cardBase,
  },
  retryButton: {
    alignSelf: 'flex-start',
    backgroundColor: corporateTheme.colors.brandStrong,
    borderRadius: 16,
    minHeight: 44,
  },
  retryButtonText: {
    color: corporateTheme.colors.textInverse,
    fontSize: 14,
    fontWeight: '700',
  },
  sectionBadge: {
    ...pillBase,
    backgroundColor: corporateTheme.colors.brandSoft,
    borderColor: corporateTheme.colors.brandMuted,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  sectionBadgeText: {
    color: corporateTheme.colors.brandStrong,
    fontSize: 12,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: corporateTheme.colors.surface,
    borderColor: corporateTheme.colors.borderStrong,
    borderRadius: 18,
    borderWidth: 1,
    minHeight: 52,
  },
  secondaryButtonText: {
    color: corporateTheme.colors.brandStrong,
    fontSize: 15,
    fontWeight: '700',
  },
  sectionContent: {
    gap: 16,
  },
  sectionHeader: {
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: corporateTheme.colors.textPrimary,
    lineHeight: 26,
  },
  storeCard: {
    backgroundColor: corporateTheme.colors.surfaceAlt,
    borderColor: corporateTheme.colors.border,
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  storeCardAddress: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  storeCardContent: {
    gap: 10,
  },
  storeCardCount: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  storeCardHeader: {
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
  },
  storeCardTitle: {
    color: corporateTheme.colors.textPrimary,
    lineHeight: 24,
  },
  storeList: {
    gap: 12,
  },
});
