import { StyleSheet } from 'react-native';

import { centeredButtonStyle } from '../../../theme/button-presets';
import {
  corporateShadows,
  corporateTheme,
} from '../../../theme/corporate-theme';

export const storeListCardStyles = StyleSheet.create({
  address: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
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
  iconAction: {
    height: 18,
    width: 18,
  },
  iconActionButton: {
    ...centeredButtonStyle,
    backgroundColor: corporateTheme.colors.surfaceAlt,
    borderColor: corporateTheme.colors.borderStrong,
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: 0,
  },
  iconDangerActionButton: {
    ...centeredButtonStyle,
    backgroundColor: corporateTheme.colors.errorSoft,
    borderColor: corporateTheme.colors.errorBorder,
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: 0,
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
