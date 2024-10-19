import { z } from 'zod';
import { clientSchema } from '@/schemas/client-schema';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const clientRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.client.findMany({
      where: { companyId: ctx.session.user.company.id },
      orderBy: { createdAt: 'desc' }
    });
  }),

  findById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.client.findFirst({
        where: {
          id: input.id,
          companyId: ctx!.session.user.company.id
        }
      });
    }),

  create: protectedProcedure
    .input(clientSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.client.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: { connect: { id: ctx!.session.user.company.id } }
        }
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
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
        id: z.string(),
        name: z.string(),
        email: z.string(),
        phone: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.client.update({
        where: {
          id: input.id,
          companyId: ctx!.session.user.company.id
        },
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone
        }
      });
    })
});
