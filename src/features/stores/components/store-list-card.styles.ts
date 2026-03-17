import { StyleSheet } from 'react-native';

import { corporateShadows, corporateTheme } from '../../../theme/corporate-theme';

export const storeListCardStyles = StyleSheet.create({
  address: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  badge: {
    backgroundColor: corporateTheme.colors.brandSoft,
    borderColor: corporateTheme.colors.brandMuted,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: corporateTheme.colors.brandStrong,
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    ...corporateShadows.card,
    backgroundColor: corporateTheme.colors.surface,
    borderColor: corporateTheme.colors.border,
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
  },
  content: {
    gap: 10,
  },
  header: {
    alignItems: 'flex-start',
    gap: 12,
    justifyContent: 'space-between',
  },
  headerCopy: {
    flex: 1,
    gap: 6,
  },
  meta: {
    color: corporateTheme.colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  name: {
    color: corporateTheme.colors.textPrimary,
    lineHeight: 26,
  },
});
