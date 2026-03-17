import {
  Button,
  ButtonText,
  Card,
  Input,
  InputField,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { ScreenShell } from '../../src/components/layout/screen-shell';
import { newStoreScreenStyles as styles } from '../../src/features/stores/new-store-screen.styles';
import { storesService } from '../../src/features/stores/services/stores.service';
import type { CreateStoreInput } from '../../src/features/stores/store.types';
import { useNavigationStore } from '../../src/store/navigation.store';

type StoreFormErrors = {
  address?: string;
  form?: string;
  name?: string;
};

// ! Client-side validation keeps the form responsive before the request hits Mirage.
function validateStoreForm(values: CreateStoreInput): StoreFormErrors {
  const nextErrors: StoreFormErrors = {};

  if (!values.name.trim()) {
    nextErrors.name = 'Informe o nome da loja.';
  }

  if (!values.address.trim()) {
    nextErrors.address = 'Informe o endereço da loja.';
  }

  return nextErrors;
}

export default function NewStoreScreen() {
  const router = useRouter();
  const setLastVisitedModule = useNavigationStore(
    (state) => state.setLastVisitedModule,
  );
  const [errors, setErrors] = useState<StoreFormErrors>({});
  const [formValues, setFormValues] = useState<CreateStoreInput>({
    address: '',
    name: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLastVisitedModule('stores');
  }, [setLastVisitedModule]);

  function updateField(field: keyof CreateStoreInput, value: string) {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
      form: undefined,
    }));
  }

  async function handleSubmit() {
    const payload: CreateStoreInput = {
      address: formValues.address.trim(),
      name: formValues.name.trim(),
    };

    const validationErrors = validateStoreForm(payload);

    if (validationErrors.name || validationErrors.address) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});

      await storesService.create(payload);
      router.replace('/stores');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Não foi possível salvar a loja.';

      setErrors({
        form: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScreenShell eyebrow="Lojas" title="Nova Loja">
      <Card style={styles.card}>
        <VStack style={styles.content}>
          {errors.form ? <Text style={styles.formError}>{errors.form}</Text> : null}

          <VStack style={styles.field}>
            <Text style={styles.label}>Nome</Text>
            <Input style={styles.input}>
              <InputField
                autoCapitalize="words"
                onChangeText={(value) => updateField('name', value)}
                placeholder="Nome da loja"
                style={styles.inputField}
                value={formValues.name}
              />
            </Input>
            {errors.name ? <Text style={styles.fieldError}>{errors.name}</Text> : null}
          </VStack>

          <VStack style={styles.field}>
            <Text style={styles.label}>Endereço</Text>
            <Input style={styles.input}>
              <InputField
                autoCapitalize="words"
                onChangeText={(value) => updateField('address', value)}
                placeholder="Endereço da loja"
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
              onPress={() => void handleSubmit()}
              style={styles.primaryButton}
            >
              <ButtonText style={styles.primaryButtonText}>
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </ButtonText>
            </Button>

            <Button
              isDisabled={isSubmitting}
              onPress={() => router.back()}
              style={styles.secondaryButton}
            >
              <ButtonText style={styles.secondaryButtonText}>Cancelar</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </Card>
    </ScreenShell>
  );
}
