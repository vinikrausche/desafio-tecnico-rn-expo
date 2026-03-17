import { z } from 'zod';

const baseProductDtoSchema = z
  .object({
    category: z.string().trim().min(1, 'A categoria do produto é obrigatória.'),
    name: z.string().trim().min(1, 'O nome do produto é obrigatório.'),
    price: z
      .number()
      .finite('O preço do produto precisa ser um número válido.')
      .nonnegative('O preço do produto não pode ser negativo.'),
  })
  .strict();

export const createProductDtoSchema = baseProductDtoSchema
  .extend({
    storeId: z.string().trim().min(1, 'A loja do produto é obrigatória.'),
  })
  .strict();

export const updateProductDtoSchema = baseProductDtoSchema;

export type CreateProductPayload = z.infer<typeof createProductDtoSchema>;
export type UpdateProductPayload = z.infer<typeof updateProductDtoSchema>;
