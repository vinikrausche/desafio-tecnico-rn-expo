import { FormActions } from '../../../components/forms/form-actions';
import { FormCard } from '../../../components/forms/form-card';
import { FormTextInput } from '../../../components/forms/form-text-input';
import type {
  StoreFormErrors,
  StoreFormField,
  StoreFormValues,
} from '../models/store-form.model';

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
    <FormCard errorMessage={errors.form}>
      <FormTextInput
        autoCapitalize="words"
        errorMessage={errors.name}
        label="Nome"
        onChangeText={(value) => onFieldChange('name', value)}
        placeholder="Nome da loja"
        value={formValues.name}
      />

      <FormTextInput
        autoCapitalize="words"
        errorMessage={errors.address}
        label="Endereco"
        onChangeText={(value) => onFieldChange('address', value)}
        placeholder="Endereco da loja"
        value={formValues.address}
      />

      <FormActions
        isPrimaryDisabled={isSubmitting}
        isSecondaryDisabled={isSubmitting}
        onPrimaryPress={() => void onSubmit()}
        onSecondaryPress={onCancel}
        primaryLabel={isSubmitting ? 'Salvando...' : submitLabel}
      />
    </FormCard>
  );
}
