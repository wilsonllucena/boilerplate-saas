import { z } from 'zod';

export const companySchema = z.object({
  id: z.string().nullish(),
  name: z.string().min(3, { message: 'Nome é obrigatório' }),
  description: z.string().optional()
});

export type CompanyRequest = z.infer<typeof companySchema>;
