import { StyleSheet } from 'react-native';

import {
  centeredButtonStyle,
  centeredButtonTextStyle,
} from '../../theme/button-presets';
import { corporateShadows, corporateTheme } from '../../theme/corporate-theme';

const cardBase = {
  ...corporateShadows.card,
  backgroundColor: corporateTheme.colors.surface,
  borderColor: corporateTheme.colors.border,
  borderRadius: 24,
  borderWidth: 1,
  padding: 18,
} as const;

export const productsScreenStyles = StyleSheet.create({
  content: {
    gap: 16,
  },
  counterBadge: {
    backgroundColor: corporateTheme.colors.brandSoft,
    borderColor: corporateTheme.colors.brandMuted,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  counterBadgeText: {
    color: corporateTheme.colors.brandStrong,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  emptyCard: {
    ...cardBase,
  },
  emptyText: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  errorCard: {
    ...cardBase,
    backgroundColor: corporateTheme.colors.errorSoft,
    borderColor: corporateTheme.colors.errorBorder,
  },
  errorText: {
    color: '#7A271A',
    fontSize: 14,
    lineHeight: 20,
  },
  errorTitle: {
    color: corporateTheme.colors.error,
    fontSize: 16,
    fontWeight: '700',
  },
  headerRow: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    width: '100%',
  },
  list: {
    gap: 12,
  },
  loadingCard: {
    ...cardBase,
  },
  loadingRow: {
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
    minHeight: 120,
  },
  loadingText: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 14,
  },
  retryButton: {
    ...centeredButtonStyle,
    alignSelf: 'flex-start',
    backgroundColor: corporateTheme.colors.brandStrong,
    borderRadius: 16,
    minHeight: 44,
  },
  retryButtonText: {
    ...centeredButtonTextStyle,
    color: corporateTheme.colors.textInverse,
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    color: corporateTheme.colors.textPrimary,
    textAlign: 'left',
  },
});
