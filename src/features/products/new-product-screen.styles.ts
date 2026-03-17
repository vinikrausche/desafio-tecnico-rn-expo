import { StyleSheet } from 'react-native';

import {
  centeredButtonStyle,
  centeredButtonTextStyle,
} from '../../theme/button-presets';
import { corporateShadows, corporateTheme } from '../../theme/corporate-theme';

export const newProductScreenStyles = StyleSheet.create({
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
  emptyStateCard: {
    ...corporateShadows.card,
    backgroundColor: corporateTheme.colors.brandSoft,
    borderColor: corporateTheme.colors.brandMuted,
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
  },
  emptyStateContent: {
    gap: 14,
  },
  emptyStateText: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
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
  loadingCard: {
    ...corporateShadows.card,
    backgroundColor: corporateTheme.colors.surface,
    borderColor: corporateTheme.colors.border,
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
  loadingContent: {
    alignItems: 'center',
    gap: 12,
    minHeight: 96,
    justifyContent: 'center',
  },
  loadingText: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 14,
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
  storeEmptyText: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  storeOptionAddress: {
    color: corporateTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'left',
  },
  storeOptionAddressSelected: {
    color: corporateTheme.colors.brandStrong,
  },
  storeOptionButton: {
    backgroundColor: corporateTheme.colors.surface,
    borderColor: corporateTheme.colors.borderStrong,
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  storeOptionButtonSelected: {
    backgroundColor: corporateTheme.colors.brandSoft,
    borderColor: corporateTheme.colors.brandStrong,
  },
  storeOptionContent: {
    alignItems: 'flex-start',
    gap: 6,
    width: '100%',
  },
  storeOptionList: {
    gap: 10,
  },
  storeOptionName: {
    color: corporateTheme.colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'left',
  },
  storeOptionNameSelected: {
    color: corporateTheme.colors.brandStrong,
  },
});
