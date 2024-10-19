import { z } from 'zod';

export const serviceSchema = z.object({
  id: z.string().nullish(),
  name: z.string().min(3, { message: 'Nome é obrigatório' }),
  price: z.coerce.number().min(1, { message: 'Preço é obrigatório' }),
  description: z.string().optional()
});

export type ServiceRequest = z.infer<typeof serviceSchema>;
