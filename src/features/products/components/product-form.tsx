import { Button, Text, VStack } from '@gluestack-ui/themed';

import { FormActions } from '../../../components/forms/form-actions';
import { FormCard } from '../../../components/forms/form-card';
import { FormTextInput } from '../../../components/forms/form-text-input';
import type {
  CreateProductFormErrors,
  CreateProductFormField,
  CreateProductFormValues,
} from '../models/create-product-form.model';
import { newProductScreenStyles as styles } from '../new-product-screen.styles';

type ProductStoreOption = {
  address: string;
  id: string;
  name: string;
};

type ProductFormProps = {
  errors: CreateProductFormErrors;
  formValues: CreateProductFormValues;
  isStoreEditable?: boolean;
  isSubmitDisabled?: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onFieldChange: (field: CreateProductFormField, value: string) => void;
  onStoreSelect: (storeId: string) => void;
  onSubmit: () => void;
  storeOptions?: ProductStoreOption[];
  submitLabel?: string;
};

// ! O formulario compartilhado mantém o cadastro consistente nos fluxos geral e por loja.
export function ProductForm({
  errors,
  formValues,
  isStoreEditable = true,
  isSubmitDisabled = false,
  isSubmitting,
  onCancel,
  onFieldChange,
  onStoreSelect,
  onSubmit,
  storeOptions = [],
  submitLabel = 'Salvar produto',
}: ProductFormProps) {
  const shouldShowStoreField = isStoreEditable;

  return (
    <FormCard errorMessage={errors.form}>
      {shouldShowStoreField ? (
        <VStack style={styles.field}>
          <Text style={styles.label}>Loja</Text>

          {storeOptions.length > 0 ? (
            <VStack style={styles.storeOptionList}>
              {storeOptions.map((store) => {
                const isSelected = formValues.storeId === store.id;

                return (
                  <Button
                    key={store.id}
                    onPress={() => onStoreSelect(store.id)}
                    style={[
                      styles.storeOptionButton,
                      isSelected ? styles.storeOptionButtonSelected : null,
                    ]}
                  >
                    <VStack style={styles.storeOptionContent}>
                      <Text
                        style={[
                          styles.storeOptionName,
                          isSelected ? styles.storeOptionNameSelected : null,
                        ]}
                      >
                        {store.name}
                      </Text>
                      <Text
                        style={[
                          styles.storeOptionAddress,
                          isSelected ? styles.storeOptionAddressSelected : null,
                        ]}
                      >
                        {store.address}
                      </Text>
                    </VStack>
                  </Button>
                );
              })}
            </VStack>
          ) : (
            <Text style={styles.storeEmptyText}>Nenhuma loja disponivel.</Text>
          )}

          {errors.storeId ? (
            <Text style={styles.fieldError}>{errors.storeId}</Text>
          ) : null}
        </VStack>
      ) : null}

      <FormTextInput
        autoCapitalize="words"
        errorMessage={errors.name}
        label="Nome"
        onChangeText={(value) => onFieldChange('name', value)}
        placeholder="Nome do produto"
        value={formValues.name}
      />

      <FormTextInput
        autoCapitalize="words"
        errorMessage={errors.category}
        label="Categoria"
        onChangeText={(value) => onFieldChange('category', value)}
        placeholder="Categoria"
        value={formValues.category}
      />

      <FormTextInput
        errorMessage={errors.price}
        keyboardType="decimal-pad"
        label="Preco"
        onChangeText={(value) => onFieldChange('price', value)}
        placeholder="0,00"
        value={formValues.price}
      />

      <FormActions
        isPrimaryDisabled={isSubmitting || isSubmitDisabled}
        isSecondaryDisabled={isSubmitting}
        onPrimaryPress={() => void onSubmit()}
        onSecondaryPress={onCancel}
        primaryLabel={isSubmitting ? 'Salvando...' : submitLabel}
      />
    </FormCard>
  );
}
