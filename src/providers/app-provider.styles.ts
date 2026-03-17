import { StyleSheet } from 'react-native';

export const appProviderStyles = StyleSheet.create({
  fallbackContainer: {
    alignItems: 'center',
    backgroundColor: '#f5efe6',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  fallbackContent: {
    alignItems: 'center',
    gap: 12,
    maxWidth: 320,
  },
  fallbackText: {
    color: '#495057',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  fallbackTitle: {
    color: '#1f2933',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  root: {
    flex: 1,
  },
});
