import { randomUUID } from 'crypto';
import { z } from 'zod';
import { companySchema } from '@/schemas/company.schema';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { createSlug } from '@/utils/create-slug';

export const companyRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.company.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        user: {
          where: {
            id: ctx!.session.user.id
          }
        }
      }
    });
  }),

  findById: protectedProcedure.query(({ ctx }) => {
    return ctx.db.company.findFirst({
      where: {
        id: ctx!.session.user.company.id
      }
    });
  }),

  create: protectedProcedure
    .input(companySchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.company.create({
        data: {
          name: input.name,
          slug: createSlug(input.name),
          user: { connect: { id: ctx.session.user.id } },
          publicId: randomUUID(),
          description: input.description || ''
        }
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.company.delete({
        where: {
          id: input.id
        }
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().nullish()
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.company.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name,
          slug: createSlug(input.name),
          description: input.description || ''
        }
      });
    })
});
