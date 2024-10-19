import { z } from 'zod';
import { clientSchema } from '@/schemas/client-schema';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const profileRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        company: true
      },
      where: { companyId: ctx.session!.user.company.id }
    });
  }),

  get: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findFirst({
      select: {
        id: true,
        email: true,
        name: true,
        company: true
      },
      where: {
        companyId: ctx!.session.user.company.id
      }
    });
  }),

  create: protectedProcedure
    .input(clientSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.client.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: {
            connect: { id: ctx!.session.user.company.id }
          }
        }
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.client.delete({
        where: {
          id: input.id,
          companyId: ctx!.session.user.company.id
        }
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        companyName: z.string().nullish()
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          name: input.name,
          company: {
            update: {
              name: input.companyName
            }
          }
        }
      });
    })
});
