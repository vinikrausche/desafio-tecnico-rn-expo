import { StyleSheet } from 'react-native';

import {
  centeredButtonStyle,
  centeredButtonTextStyle,
} from '../../theme/button-presets';
import { corporateShadows, corporateTheme } from '../../theme/corporate-theme';

export const stateCardStyles = StyleSheet.create({
  card: {
    ...corporateShadows.card,
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
  },
  centerCopy: {
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  columnContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    gap: 12,
  },
  copy: {
    gap: 10,
  },
  errorMessage: {
    color: '#7A271A',
  },
  errorTitle: {
    color: corporateTheme.colors.error,
  },
  message: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  primaryAction: {
    ...centeredButtonStyle,
    backgroundColor: corporateTheme.colors.brandStrong,
    borderRadius: 16,
    minHeight: 44,
  },
  primaryActionText: {
    ...centeredButtonTextStyle,
    color: corporateTheme.colors.textInverse,
    fontSize: 14,
    fontWeight: '700',
  },
  rowContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondaryAction: {
    ...centeredButtonStyle,
    backgroundColor: corporateTheme.colors.surface,
    borderColor: corporateTheme.colors.borderStrong,
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 44,
  },
  secondaryActionText: {
    ...centeredButtonTextStyle,
    color: corporateTheme.colors.brandStrong,
    fontSize: 14,
    fontWeight: '700',
  },
  softTone: {
    backgroundColor: corporateTheme.colors.brandSoft,
    borderColor: corporateTheme.colors.brandMuted,
  },
  surfaceTone: {
    backgroundColor: corporateTheme.colors.surface,
    borderColor: corporateTheme.colors.border,
  },
  title: {
    color: corporateTheme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  errorTone: {
    backgroundColor: corporateTheme.colors.errorSoft,
    borderColor: corporateTheme.colors.errorBorder,
  },
});
