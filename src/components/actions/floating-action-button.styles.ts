import { StyleSheet } from 'react-native';

import { corporateShadows, corporateTheme } from '../../theme/corporate-theme';

export const floatingActionButtonStyles = StyleSheet.create({
  fab: {
    ...corporateShadows.hero,
    backgroundColor: corporateTheme.colors.brandStrong,
    borderColor: corporateTheme.colors.brandStrong,
    borderRadius: 999,
    borderWidth: 1,
    height: 64,
    width: 64,
  },
  icon: {
    color: corporateTheme.colors.textInverse,
    height: 24,
    width: 24,
  },
});
