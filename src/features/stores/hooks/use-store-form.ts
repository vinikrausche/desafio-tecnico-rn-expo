import { useCallback, useState } from 'react';

import {
  buildStoreInput,
  buildUpdateStoreInput,
  createInitialStoreFormValues,
  type StoreFormErrors,
  type StoreFormField,
  type StoreFormValues,
} from '../models/store-form.model';

export function useStoreForm(defaultValues: Partial<StoreFormValues> = {}) {
  const [errors, setErrors] = useState<StoreFormErrors>({});
  const [formValues, setFormValues] = useState<StoreFormValues>(() =>
    createInitialStoreFormValues(defaultValues),
  );

  const clearFieldError = useCallback((field: StoreFormField) => {
    setErrors((current) => ({
      ...current,
      [field]: undefined,
      form: undefined,
    }));
  }, []);

  // ! Atualizacao de campos e feedback visual ficam centralizados para os fluxos de loja.
  const updateField = useCallback((field: StoreFormField, value: string) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));

    clearFieldError(field);
  }, [clearFieldError]);

  const replaceFormValues = useCallback((values: Partial<StoreFormValues>) => {
    setFormValues((current) => ({
      ...current,
      ...values,
    }));

    setErrors({});
  }, []);

  const setFormError = useCallback((message: string) => {
    setErrors((current) => ({
      ...current,
      form: message,
    }));
  }, []);

  const getCreatePayload = useCallback(() => {
    const result = buildStoreInput(formValues);

    if (!result.success) {
      setErrors(result.errors);
      return null;
    }

    return result.data;
  }, [formValues]);

  const getUpdatePayload = useCallback(() => {
    const result = buildUpdateStoreInput(formValues);

    if (!result.success) {
      setErrors(result.errors);
      return null;
    }

    return result.data;
  }, [formValues]);

  return {
    errors,
    formValues,
    getCreatePayload,
    getUpdatePayload,
    replaceFormValues,
    setFormError,
    updateField,
  };
}
