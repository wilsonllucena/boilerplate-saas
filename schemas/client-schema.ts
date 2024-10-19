import { z } from 'zod';

export const clientSchema = z.object({
  id: z.string().nullish(),
  name: z.string().min(3, { message: 'Nome é obrigatório' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(6, { message: 'Telefone é obrigatório' })
});

export type ClientRequest = z.infer<typeof clientSchema>;
