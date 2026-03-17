import { useCallback, useState } from 'react';

import {
  buildCreateProductInput,
  buildUpdateProductInput,
  createInitialProductFormValues,
  type CreateProductFormErrors,
  type CreateProductFormField,
  type CreateProductFormValues,
} from '../models/create-product-form.model';

export function useCreateProductForm(defaultStoreId = '') {
  const [errors, setErrors] = useState<CreateProductFormErrors>({});
  const [formValues, setFormValues] = useState<CreateProductFormValues>(() =>
    createInitialProductFormValues(defaultStoreId),
  );

  const clearFieldError = useCallback((field: CreateProductFormField) => {
    setErrors((current) => ({
      ...current,
      [field]: undefined,
      form: undefined,
    }));
  }, []);

  // ! Field updates and validation feedback stay centralized to keep both screens identical.
  const updateField = useCallback(
    (field: CreateProductFormField, value: string) => {
      setFormValues((current) => ({
        ...current,
        [field]: value,
      }));

      clearFieldError(field);
    },
    [clearFieldError],
  );

  const setFormError = useCallback((message: string) => {
    setErrors((current) => ({
      ...current,
      form: message,
    }));
  }, []);

  const syncStoreId = useCallback(
    (storeId: string) => {
      setFormValues((current) =>
        current.storeId === storeId ? current : { ...current, storeId },
      );

      clearFieldError('storeId');
    },
    [clearFieldError],
  );

  const replaceFormValues = useCallback(
    (values: Partial<CreateProductFormValues>) => {
      setFormValues((current) => ({
        ...current,
        ...values,
      }));

      setErrors({});
    },
    [],
  );

  const getPayload = useCallback(() => {
    const result = buildCreateProductInput(formValues);

    if (!result.success) {
      setErrors(result.errors);
      return null;
    }

    return result.data;
  }, [formValues]);

  const getUpdatePayload = useCallback(() => {
    const result = buildUpdateProductInput(formValues);

    if (!result.success) {
      setErrors(result.errors);
      return null;
    }

    return result.data;
  }, [formValues]);

  return {
    errors,
    formValues,
    getPayload,
    getUpdatePayload,
    replaceFormValues,
    setFormError,
    syncStoreId,
    updateField,
  };
}
