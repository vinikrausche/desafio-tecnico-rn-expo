import { useRouter } from 'expo-router';
import { useState } from 'react';

import { useAppToast } from '../../src/components/feedback/use-app-toast';
import { ScreenShell } from '../../src/components/layout/screen-shell';
import { StoreForm } from '../../src/features/stores/components/store-form';
import { useStoreForm } from '../../src/features/stores/hooks/use-store-form';
import { useStoreZustand } from '../../src/features/stores/store/stores.store';

export default function NewStoreScreen() {
  const router = useRouter();
  const { showError, showSuccess } = useAppToast();
  const createStore = useStoreZustand((state) => state.createStore);
  const { errors, formValues, getCreatePayload, setFormError, updateField } =
    useStoreForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    const payload = getCreatePayload();

    if (!payload) {
      return;
    }

    try {
      setIsSubmitting(true);

      await createStore(payload);

      showSuccess({
        message: `A loja "${payload.name}" foi cadastrada com sucesso.`,
        title: 'Loja criada',
      });
      router.replace('/stores');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel salvar a loja.';

      showError({
        message,
        title: 'Erro ao salvar',
      });
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScreenShell eyebrow="Lojas" title="Nova Loja">
      <StoreForm
        errors={errors}
        formValues={formValues}
        isSubmitting={isSubmitting}
        onCancel={() => router.back()}
        onFieldChange={updateField}
        onSubmit={handleSubmit}
      />
    </ScreenShell>
  );
}
