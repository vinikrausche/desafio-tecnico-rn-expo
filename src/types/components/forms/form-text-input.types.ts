import type { TextInputProps } from 'react-native';

export type FormTextInputProps = {
  autoCapitalize?: TextInputProps['autoCapitalize'];
  errorMessage?: string;
  helperMessage?: string;
  keyboardType?: TextInputProps['keyboardType'];
  label: string;
  multiline?: boolean;
  numberOfLines?: number;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
};
