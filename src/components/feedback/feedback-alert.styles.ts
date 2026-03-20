import { StyleSheet } from 'react-native';

import { corporateTheme } from '../../theme/corporate-theme';

export const feedbackAlertStyles = StyleSheet.create({
  content: {
    alignItems: 'flex-start',
    gap: 12,
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  errorContainer: {
    backgroundColor: corporateTheme.colors.errorSoft,
    borderColor: corporateTheme.colors.errorBorder,
  },
  errorIcon: {
    color: corporateTheme.colors.error,
  },
  errorMessage: {
    color: corporateTheme.colors.error,
  },
  errorTitle: {
    color: corporateTheme.colors.error,
  },
  icon: {
    marginTop: 2,
  },
  infoContainer: {
    backgroundColor: corporateTheme.colors.infoSoft,
    borderColor: corporateTheme.colors.infoBorder,
  },
  infoIcon: {
    color: corporateTheme.colors.info,
  },
  infoMessage: {
    color: corporateTheme.colors.info,
  },
  infoTitle: {
    color: corporateTheme.colors.info,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
  root: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  successContainer: {
    backgroundColor: corporateTheme.colors.successSoft,
    borderColor: corporateTheme.colors.successBorder,
  },
  successIcon: {
    color: corporateTheme.colors.success,
  },
  successMessage: {
    color: corporateTheme.colors.success,
  },
  successTitle: {
    color: corporateTheme.colors.success,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 18,
  },
  warningContainer: {
    backgroundColor: corporateTheme.colors.warningSoft,
    borderColor: corporateTheme.colors.warningBorder,
  },
  warningIcon: {
    color: corporateTheme.colors.warning,
  },
  warningMessage: {
    color: corporateTheme.colors.warning,
  },
  warningTitle: {
    color: corporateTheme.colors.warning,
  },
});
