import { z } from "zod"
import { publicProcedure } from "@/server/trpc"

const login = publicProcedure
  .input(
    z.object({
      email: z.string(),
      password: z.string(),
      hasExpiration: z.boolean().optional(),
      expiresIn: z.string().optional(),
    })
  )
  .mutation(async (req) => {
    const { email, password, hasExpiration, expiresIn } = req.input
    console.log("\n---- login ----")
    console.log("email", email)
    console.log("password", password)
    console.log("hasExpiration", hasExpiration)
    console.log("expiresIn", expiresIn)
  })

export default login
