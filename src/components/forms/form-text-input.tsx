import {
  Input,
  InputField,
  Text,
  Textarea,
  TextareaInput,
  VStack,
} from '@gluestack-ui/themed';

import { corporateTheme } from '../../theme/corporate-theme';
import type { FormTextInputProps } from '../../types/components/forms/form-text-input.types';
import { formTextInputStyles as styles } from './form-text-input.styles';

// ! Campo de texto reutilizavel para evitar repeticao de label, input e erro.
export function FormTextInput({
  autoCapitalize,
  errorMessage,
  helperMessage,
  keyboardType,
  label,
  multiline = false,
  numberOfLines = 4,
  onChangeText,
  placeholder,
  value,
}: FormTextInputProps) {
  const hasError = Boolean(errorMessage);

  return (
    <VStack style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      {multiline ? (
        <Textarea
          style={[
            styles.input,
            styles.textarea,
            hasError ? styles.inputError : null,
          ]}
        >
          <TextareaInput
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            multiline
            numberOfLines={numberOfLines}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={corporateTheme.colors.textMuted}
            style={styles.textareaField}
            textAlignVertical="top"
            value={value}
          />
        </Textarea>
      ) : (
        <Input style={[styles.input, hasError ? styles.inputError : null]}>
          <InputField
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={corporateTheme.colors.textMuted}
            style={styles.inputField}
            value={value}
          />
        </Input>
      )}

      {!hasError && helperMessage ? (
        <Text style={styles.helperText}>{helperMessage}</Text>
      ) : null}

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </VStack>
  );
}
