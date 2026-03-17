import { StyleSheet } from 'react-native';

import { corporateShadows, corporateTheme } from '../../../theme/corporate-theme';

export const productListCardStyles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
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
    gap: 12,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    width: '100%',
  },
  price: {
    color: corporateTheme.colors.brandStrong,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 28,
  },
  storeName: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  title: {
    color: corporateTheme.colors.textPrimary,
    lineHeight: 26,
  },
});
