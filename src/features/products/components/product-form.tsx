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

// ! The shared form keeps product creation consistent across the general and store-scoped flows.
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
    <Card style={styles.card}>
      <VStack style={styles.content}>
        {errors.form ? (
          <Text style={styles.formError}>{errors.form}</Text>
        ) : null}

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
                            isSelected
                              ? styles.storeOptionAddressSelected
                              : null,
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
              <Text style={styles.storeEmptyText}>
                Nenhuma loja disponivel.
              </Text>
            )}

            {errors.storeId ? (
              <Text style={styles.fieldError}>{errors.storeId}</Text>
            ) : null}
          </VStack>
        ) : null}

        <VStack style={styles.field}>
          <Text style={styles.label}>Nome</Text>
          <Input style={styles.input}>
            <InputField
              autoCapitalize="words"
              onChangeText={(value) => onFieldChange('name', value)}
              placeholder="Nome do produto"
              style={styles.inputField}
              value={formValues.name}
            />
          </Input>
          {errors.name ? (
            <Text style={styles.fieldError}>{errors.name}</Text>
          ) : null}
        </VStack>

        <VStack style={styles.field}>
          <Text style={styles.label}>Categoria</Text>
          <Input style={styles.input}>
            <InputField
              autoCapitalize="words"
              onChangeText={(value) => onFieldChange('category', value)}
              placeholder="Categoria"
              style={styles.inputField}
              value={formValues.category}
            />
          </Input>
          {errors.category ? (
            <Text style={styles.fieldError}>{errors.category}</Text>
          ) : null}
        </VStack>

        <VStack style={styles.field}>
          <Text style={styles.label}>Preco</Text>
          <Input style={styles.input}>
            <InputField
              keyboardType="decimal-pad"
              onChangeText={(value) => onFieldChange('price', value)}
              placeholder="0,00"
              style={styles.inputField}
              value={formValues.price}
            />
          </Input>
          {errors.price ? (
            <Text style={styles.fieldError}>{errors.price}</Text>
          ) : null}
        </VStack>

        <VStack style={styles.buttonGroup}>
          <Button
            isDisabled={isSubmitting || isSubmitDisabled}
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
