import { StyleSheet } from 'react-native';

import {
  centeredButtonStyle,
  centeredButtonTextStyle,
} from '../../theme/button-presets';
import { corporateShadows, corporateTheme } from '../../theme/corporate-theme';

export const newStoreScreenStyles = StyleSheet.create({
  buttonGroup: {
    gap: 12,
  },
  card: {
    ...corporateShadows.card,
    backgroundColor: corporateTheme.colors.surface,
    borderColor: corporateTheme.colors.border,
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
  content: {
    gap: 18,
  },
  field: {
    gap: 8,
  },
  fieldError: {
    color: corporateTheme.colors.error,
    fontSize: 13,
    fontWeight: '600',
  },
  formError: {
    color: corporateTheme.colors.error,
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    backgroundColor: corporateTheme.colors.surfaceAlt,
    borderColor: corporateTheme.colors.borderStrong,
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 52,
  },
  inputField: {
    color: corporateTheme.colors.textPrimary,
    fontSize: 15,
  },
  label: {
    color: corporateTheme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  primaryButton: {
    ...centeredButtonStyle,
    backgroundColor: corporateTheme.colors.brandStrong,
    borderRadius: 18,
    minHeight: 52,
  },
  primaryButtonText: {
    ...centeredButtonTextStyle,
    color: corporateTheme.colors.textInverse,
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    ...centeredButtonStyle,
    backgroundColor: corporateTheme.colors.surface,
    borderColor: corporateTheme.colors.borderStrong,
    borderRadius: 18,
    borderWidth: 1,
    minHeight: 52,
  },
  secondaryButtonText: {
    ...centeredButtonTextStyle,
    color: corporateTheme.colors.brandStrong,
    fontSize: 15,
    fontWeight: '700',
  },
});
