import { StyleSheet } from 'react-native';

import {
  centeredButtonStyle,
  centeredButtonTextStyle,
} from '../src/theme/button-presets';

export const notFoundScreenStyles = StyleSheet.create({
  button: {
    ...centeredButtonStyle,
    backgroundColor: '#163020',
    minHeight: 52,
  },
  buttonText: {
    ...centeredButtonTextStyle,
    color: '#f8f4ec',
    fontSize: 15,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#d9d4ca',
    borderWidth: 1,
    padding: 18,
  },
  content: {
    gap: 16,
  },
  text: {
    color: '#495057',
    fontSize: 15,
    lineHeight: 22,
  },
});
