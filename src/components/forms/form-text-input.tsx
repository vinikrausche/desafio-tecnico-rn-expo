import { Input, InputField, Text, VStack } from '@gluestack-ui/themed';
import type { TextInputProps } from 'react-native';

import { formTextInputStyles as styles } from './form-text-input.styles';

type FormTextInputProps = {
  autoCapitalize?: TextInputProps['autoCapitalize'];
  errorMessage?: string;
  keyboardType?: TextInputProps['keyboardType'];
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
};

// ! Campo de texto reutilizavel para evitar repeticao de label, input e erro.
export function FormTextInput({
  autoCapitalize,
  errorMessage,
  keyboardType,
  label,
  onChangeText,
  placeholder,
  value,
}: FormTextInputProps) {
  return (
    <VStack style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      <Input style={styles.input}>
        <InputField
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.inputField}
          value={value}
        />
      </Input>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </VStack>
  );
}
