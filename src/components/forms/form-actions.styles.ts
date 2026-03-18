import { StyleSheet } from 'react-native';

import {
  centeredButtonStyle,
  centeredButtonTextStyle,
} from '../../theme/button-presets';
import { corporateTheme } from '../../theme/corporate-theme';

export const formActionsStyles = StyleSheet.create({
  actions: {
    gap: 12,
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
