import { StyleSheet } from 'react-native';

import { corporateTheme } from '../../theme/corporate-theme';

export const formTextInputStyles = StyleSheet.create({
  errorText: {
    color: corporateTheme.colors.error,
    fontSize: 13,
    fontWeight: '600',
  },
  field: {
    gap: 8,
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
});
