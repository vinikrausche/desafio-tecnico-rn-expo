import { z } from 'zod';

export const createStoreDtoSchema = z
  .object({
    address: z.string().trim().min(1, 'O endereço da loja é obrigatório.'),
    name: z.string().trim().min(1, 'O nome da loja é obrigatório.'),
  })
  .strict();

export const updateStoreDtoSchema = createStoreDtoSchema;

export type CreateStorePayload = z.infer<typeof createStoreDtoSchema>;
export type UpdateStorePayload = z.infer<typeof updateStoreDtoSchema>;
