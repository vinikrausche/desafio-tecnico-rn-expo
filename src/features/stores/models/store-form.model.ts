import type { CreateStoreInput, UpdateStoreInput } from '../store.types';

export type StoreFormField = keyof StoreFormValues;

export type StoreFormValues = {
  address: string;
  name: string;
};

export type StoreFormErrors = {
  address?: string;
  form?: string;
  name?: string;
};

type BuildStoreInputResult =
  | {
      data: CreateStoreInput;
      success: true;
    }
  | {
      errors: StoreFormErrors;
      success: false;
    };

export function createInitialStoreFormValues(
  values: Partial<StoreFormValues> = {},
): StoreFormValues {
  return {
    address: values.address ?? '',
    name: values.name ?? '',
  };
}

// ! A validacao fica pura aqui para ser compartilhada por cadastro e edicao.
export function validateStoreForm(values: StoreFormValues): StoreFormErrors {
  const nextErrors: StoreFormErrors = {};

  if (!values.name.trim()) {
    nextErrors.name = 'Informe o nome da loja.';
  }

  if (!values.address.trim()) {
    nextErrors.address = 'Informe o endereco da loja.';
  }

  return nextErrors;
}

function hasValidationErrors(errors: StoreFormErrors): boolean {
  return Boolean(errors.name || errors.address);
}

export function buildStoreInput(
  values: StoreFormValues,
): BuildStoreInputResult {
  const errors = validateStoreForm(values);

  if (hasValidationErrors(errors)) {
    return {
      errors,
      success: false,
    };
  }

  return {
    data: {
      address: values.address.trim(),
      name: values.name.trim(),
    },
    success: true,
  };
}

export function buildUpdateStoreInput(values: StoreFormValues): BuildStoreInputResult {
  return buildStoreInput(values) as
    | {
        data: UpdateStoreInput;
        success: true;
      }
    | {
        errors: StoreFormErrors;
        success: false;
      };
}
