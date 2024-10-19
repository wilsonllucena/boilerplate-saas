import { hash } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { userSchema } from '@/schemas/user.schema';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const userRouter = createTRPCRouter({
  create: publicProcedure.input(userSchema).mutation(async ({ ctx, input }) => {
    return ctx.db.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash: await hash(input.password, 10),
        company: {
          create: {
            publicId: randomUUID()
          }
        }
      }
    });
  })
});
