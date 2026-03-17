import type { CreateProductInput } from '../product.types';

export type CreateProductFormField = keyof CreateProductFormValues;

export type CreateProductFormValues = {
  category: string;
  name: string;
  price: string;
  storeId: string;
};

export type CreateProductFormErrors = {
  category?: string;
  form?: string;
  name?: string;
  price?: string;
  storeId?: string;
};

type BuildCreateProductInputResult =
  | {
      data: CreateProductInput;
      success: true;
    }
  | {
      errors: CreateProductFormErrors;
      success: false;
    };

export function createInitialProductFormValues(
  storeId = '',
): CreateProductFormValues {
  return {
    category: '',
    name: '',
    price: '',
    storeId,
  };
}

export function parseProductPriceInput(value: string): number | null {
  const normalizedValue = value.trim().replace(',', '.');

  if (!normalizedValue) {
    return null;
  }

  const parsedValue = Number(normalizedValue);

  if (!Number.isFinite(parsedValue)) {
    return null;
  }

  return parsedValue;
}

function hasValidationErrors(errors: CreateProductFormErrors): boolean {
  return Boolean(
    errors.category || errors.name || errors.price || errors.storeId,
  );
}

// ! Product form validation stays pure here so both routes share the same contract.
export function validateCreateProductForm(
  values: CreateProductFormValues,
): CreateProductFormErrors {
  const nextErrors: CreateProductFormErrors = {};

  if (!values.storeId.trim()) {
    nextErrors.storeId = 'Selecione a loja do produto.';
  }

  if (!values.name.trim()) {
    nextErrors.name = 'Informe o nome do produto.';
  }

  if (!values.category.trim()) {
    nextErrors.category = 'Informe a categoria.';
  }

  const parsedPrice = parseProductPriceInput(values.price);

  if (parsedPrice === null) {
    nextErrors.price = 'Informe um preco valido.';
  } else if (parsedPrice < 0) {
    nextErrors.price = 'O preco nao pode ser negativo.';
  }

  return nextErrors;
}

export function buildCreateProductInput(
  values: CreateProductFormValues,
): BuildCreateProductInputResult {
  const errors = validateCreateProductForm(values);

  if (hasValidationErrors(errors)) {
    return {
      errors,
      success: false,
    };
  }

  const parsedPrice = parseProductPriceInput(values.price);

  if (parsedPrice === null) {
    return {
      errors: {
        price: 'Informe um preco valido.',
      },
      success: false,
    };
  }

  return {
    data: {
      category: values.category.trim(),
      name: values.name.trim(),
      price: parsedPrice,
      storeId: values.storeId.trim(),
    },
    success: true,
  };
}
