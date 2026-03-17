import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { ScreenShell } from '../../src/components/layout/screen-shell';
import { StoreForm } from '../../src/features/stores/components/store-form';
import { useStoreForm } from '../../src/features/stores/hooks/use-store-form';
import { useNavigationStore } from '../../src/store/navigation.store';
import { useStoreZustand } from '../../src/zustand/store';

export default function NewStoreScreen() {
  const router = useRouter();
  const createStore = useStoreZustand((state) => state.createStore);
  const setLastVisitedModule = useNavigationStore(
    (state) => state.setLastVisitedModule,
  );
  const { errors, formValues, getCreatePayload, setFormError, updateField } =
    useStoreForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLastVisitedModule('stores');
  }, [setLastVisitedModule]);

  async function handleSubmit() {
    const payload = getCreatePayload();

    if (!payload) {
      return;
    }

    try {
      setIsSubmitting(true);

      await createStore(payload);
      router.replace('/stores');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel salvar a loja.';

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
