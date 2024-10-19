import { z } from 'zod';
import { serviceSchema } from '@/schemas/service.schema';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from '@/server/api/trpc';

export const serviceRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.service.findMany({
      where: { companyId: ctx.session!.user.company.id },
      orderBy: { createdAt: 'desc' }
    });
  }),

  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.service.findMany({
      orderBy: { createdAt: 'desc' },
      where: { companyId: ctx.session!.user.company.id }
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.service.findFirst({
        where: {
          id: input.id,
          companyId: ctx.session.user.company.id
        }
      });
    }),

  create: protectedProcedure
    .input(serviceSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.service.create({
        data: {
          name: input.name,
          price: input.price,
          description: input.description || '',
          company: { connect: { id: ctx.session!.user.company.id } }
        }
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.service.delete({
        where: {
          id: input.id,
          companyId: ctx.session!.user.company.id
        }
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        price: z.coerce.number(),
        description: z.string().optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.service.update({
        where: {
          id: input.id,
          companyId: ctx.session!.user.company.id
        },
        data: {
          name: input.name,
          price: input.price,
          description: input.description || ''
        }
      });
    })
});
