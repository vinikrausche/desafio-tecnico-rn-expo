import { StyleSheet } from 'react-native';

import {
  centeredButtonStyle,
  centeredButtonTextStyle,
} from '../../../theme/button-presets';
import { corporateShadows, corporateTheme } from '../../../theme/corporate-theme';

export const storeListCardStyles = StyleSheet.create({
  address: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    gap: 14,
  },
  dangerActionButton: {
    ...centeredButtonStyle,
    backgroundColor: corporateTheme.colors.errorSoft,
    borderColor: corporateTheme.colors.errorBorder,
    borderRadius: 16,
    borderWidth: 1,
    flexBasis: '48%',
    minHeight: 42,
  },
  dangerActionButtonText: {
    ...centeredButtonTextStyle,
    color: corporateTheme.colors.error,
    fontSize: 13,
    fontWeight: '700',
  },
  header: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    width: '100%',
  },
  headerCopy: {
    flex: 1,
    gap: 6,
    paddingRight: 8,
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
  primaryActionButton: {
    ...centeredButtonStyle,
    backgroundColor: corporateTheme.colors.brandStrong,
    borderRadius: 16,
    flexBasis: '48%',
    minHeight: 42,
  },
  primaryActionButtonText: {
    ...centeredButtonTextStyle,
    color: corporateTheme.colors.textInverse,
    fontSize: 13,
    fontWeight: '700',
  },
  secondaryActionButton: {
    ...centeredButtonStyle,
    backgroundColor: corporateTheme.colors.surfaceAlt,
    borderColor: corporateTheme.colors.borderStrong,
    borderRadius: 16,
    borderWidth: 1,
    flexBasis: '48%',
    minHeight: 42,
  },
  secondaryActionButtonText: {
    ...centeredButtonTextStyle,
    color: corporateTheme.colors.brandStrong,
    fontSize: 13,
    fontWeight: '700',
  },
});
