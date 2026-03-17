import {
  Button,
  ButtonText,
  Card,
  Input,
  InputField,
  Text,
  VStack,
} from '@gluestack-ui/themed';

import type {
  StoreFormErrors,
  StoreFormField,
  StoreFormValues,
} from '../models/store-form.model';
import { newStoreScreenStyles as styles } from '../new-store-screen.styles';

type StoreFormProps = {
  errors: StoreFormErrors;
  formValues: StoreFormValues;
  isSubmitting: boolean;
  onCancel: () => void;
  onFieldChange: (field: StoreFormField, value: string) => void;
  onSubmit: () => void;
  submitLabel?: string;
};

// ! O formulario compartilhado garante o mesmo padrao visual para cadastro e edicao de loja.
export function StoreForm({
  errors,
  formValues,
  isSubmitting,
  onCancel,
  onFieldChange,
  onSubmit,
  submitLabel = 'Salvar loja',
}: StoreFormProps) {
  return (
    <Card style={styles.card}>
      <VStack style={styles.content}>
        {errors.form ? <Text style={styles.formError}>{errors.form}</Text> : null}

        <VStack style={styles.field}>
          <Text style={styles.label}>Nome</Text>
          <Input style={styles.input}>
            <InputField
              autoCapitalize="words"
              onChangeText={(value) => onFieldChange('name', value)}
              placeholder="Nome da loja"
              style={styles.inputField}
              value={formValues.name}
            />
          </Input>
          {errors.name ? <Text style={styles.fieldError}>{errors.name}</Text> : null}
        </VStack>

        <VStack style={styles.field}>
          <Text style={styles.label}>Endereco</Text>
          <Input style={styles.input}>
            <InputField
              autoCapitalize="words"
              onChangeText={(value) => onFieldChange('address', value)}
              placeholder="Endereco da loja"
              style={styles.inputField}
              value={formValues.address}
            />
          </Input>
          {errors.address ? (
            <Text style={styles.fieldError}>{errors.address}</Text>
          ) : null}
        </VStack>

        <VStack style={styles.buttonGroup}>
          <Button
            isDisabled={isSubmitting}
            onPress={() => void onSubmit()}
            style={styles.primaryButton}
          >
            <ButtonText style={styles.primaryButtonText}>
              {isSubmitting ? 'Salvando...' : submitLabel}
            </ButtonText>
          </Button>

          <Button
            isDisabled={isSubmitting}
            onPress={onCancel}
            style={styles.secondaryButton}
          >
            <ButtonText style={styles.secondaryButtonText}>Cancelar</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </Card>
  );
}
