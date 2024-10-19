import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().nullish(),
  name: z.string().min(3, { message: 'Nome é obrigatório' }),
  email: z.string().email({ message: 'Endereço de email inválido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
});

export type UserRequest = z.infer<typeof userSchema>;
