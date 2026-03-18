import { StyleSheet } from 'react-native';

import { corporateTheme } from '../../theme/corporate-theme';

export const listHeaderStyles = StyleSheet.create({
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
    textTransform: 'uppercase',
  },
  row: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    color: corporateTheme.colors.textPrimary,
    textAlign: 'left',
  },
});
