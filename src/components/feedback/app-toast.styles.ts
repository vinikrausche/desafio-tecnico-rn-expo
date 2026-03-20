import { StyleSheet } from 'react-native';

import { corporateShadows, corporateTheme } from '../../theme/corporate-theme';

export const appToastStyles = StyleSheet.create({
  copy: {
    flex: 1,
    gap: 2,
  },
  description: {
    color: corporateTheme.colors.textSecondary,
    lineHeight: 20,
  },
  errorDescription: {
    color: corporateTheme.colors.error,
  },
  errorRoot: {
    backgroundColor: corporateTheme.colors.errorSoft,
    borderColor: corporateTheme.colors.errorBorder,
  },
  errorTitle: {
    color: corporateTheme.colors.error,
  },
  icon: {
    marginTop: 2,
  },
  infoDescription: {
    color: corporateTheme.colors.info,
  },
  infoRoot: {
    backgroundColor: corporateTheme.colors.infoSoft,
    borderColor: corporateTheme.colors.infoBorder,
  },
  infoTitle: {
    color: corporateTheme.colors.info,
  },
  root: {
    ...corporateShadows.card,
    borderRadius: 18,
    borderWidth: 1,
    maxWidth: 420,
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: '100%',
  },
  row: {
    alignItems: 'flex-start',
    gap: 12,
  },
  successDescription: {
    color: corporateTheme.colors.success,
  },
  successRoot: {
    backgroundColor: corporateTheme.colors.successSoft,
    borderColor: corporateTheme.colors.successBorder,
  },
  successTitle: {
    color: corporateTheme.colors.success,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 18,
  },
  warningDescription: {
    color: corporateTheme.colors.warning,
  },
  warningRoot: {
    backgroundColor: corporateTheme.colors.warningSoft,
    borderColor: corporateTheme.colors.warningBorder,
  },
  warningTitle: {
    color: corporateTheme.colors.warning,
  },
});
