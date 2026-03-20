import { StyleSheet } from 'react-native';

import { corporateShadows, corporateTheme } from '../../theme/corporate-theme';

export const appAlertDialogStyles = StyleSheet.create({
  actions: {
    columnGap: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    rowGap: 12,
  },
  backdrop: {
    backgroundColor: 'rgba(7, 21, 35, 0.64)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  body: {
    gap: 12,
  },
  confirmButtonText: {
    color: corporateTheme.colors.textInverse,
    fontWeight: '700',
  },
  content: {
    ...corporateShadows.hero,
    backgroundColor: corporateTheme.colors.surface,
    borderColor: corporateTheme.colors.border,
    borderRadius: 24,
    borderWidth: 1,
    gap: 20,
    maxWidth: 440,
    padding: 24,
    width: '100%',
  },
  contentHost: {
    maxWidth: 480,
    width: '100%',
  },
  description: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
  dialogRoot: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  noticeButton: {
    backgroundColor: corporateTheme.colors.brandStrong,
  },
  secondaryButton: {
    borderColor: corporateTheme.colors.borderStrong,
  },
  secondaryButtonText: {
    color: corporateTheme.colors.brandStrong,
    fontWeight: '700',
  },
  title: {
    color: corporateTheme.colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
  },
});
