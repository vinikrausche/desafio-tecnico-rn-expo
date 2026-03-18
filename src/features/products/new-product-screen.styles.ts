import { StyleSheet } from 'react-native';

import { corporateTheme } from '../../theme/corporate-theme';

export const newProductScreenStyles = StyleSheet.create({
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
  label: {
    color: corporateTheme.colors.textPrimary,
    fontSize: 14,
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
