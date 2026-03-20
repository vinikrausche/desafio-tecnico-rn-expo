import { StyleSheet } from 'react-native';

import { corporateShadows, corporateTheme } from '../../theme/corporate-theme';

export const formCardStyles = StyleSheet.create({
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
});
