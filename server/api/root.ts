import { serviceRouter } from './routers/service';
import { companyRouter } from './routers/company';
import { appointmentRouter } from './routers/appointment';
import { profileRouter } from './routers/profile';
import { userRouter } from './routers/user';
import { clientRouter } from './routers/client';
import { createCallerFactory, createTRPCRouter } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  client: clientRouter,
  service: serviceRouter,
  company: companyRouter,
  appointment: appointmentRouter,
  profile: profileRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
