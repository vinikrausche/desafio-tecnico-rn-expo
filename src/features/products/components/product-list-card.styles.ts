import { StyleSheet } from 'react-native';

import {
  centeredButtonStyle,
  centeredButtonTextStyle,
} from '../../../theme/button-presets';
import { corporateShadows, corporateTheme } from '../../../theme/corporate-theme';

export const productListCardStyles = StyleSheet.create({
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
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
  dangerActionButton: {
    ...centeredButtonStyle,
    backgroundColor: corporateTheme.colors.errorSoft,
    borderColor: corporateTheme.colors.errorBorder,
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    minHeight: 42,
  },
  dangerActionButtonText: {
    ...centeredButtonTextStyle,
    color: corporateTheme.colors.error,
    fontSize: 13,
    fontWeight: '700',
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
  secondaryActionButton: {
    ...centeredButtonStyle,
    backgroundColor: corporateTheme.colors.surfaceAlt,
    borderColor: corporateTheme.colors.borderStrong,
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    minHeight: 42,
  },
  secondaryActionButtonText: {
    ...centeredButtonTextStyle,
    color: corporateTheme.colors.brandStrong,
    fontSize: 13,
    fontWeight: '700',
  },
  title: {
    color: corporateTheme.colors.textPrimary,
    lineHeight: 26,
  },
});
