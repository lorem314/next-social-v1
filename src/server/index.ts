import { publicProcedure, router } from "./trpc"
import userRouter from "./routers/user"
import authRouter from "./routers/auth"

const testRouter = router({
  greeting: publicProcedure.query(async () => {
    return "Hello World"
  }),
})

export const appRouter = router({
  test: testRouter,
  auth: authRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
