import { z } from "zod"
import { TRPCError } from "@trpc/server"
import crypto from "node:crypto"

import { publicProcedure } from "@/server/trpc"
import prisma from "@/server/prisma"

const create = publicProcedure
  .input(
    z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })
  )
  .mutation(async (req) => {
    const { name, email, password } = req.input
    const salt = Math.round(new Date().valueOf() * Math.random()) + ""
    const hashed_password = crypto
      .createHmac("sha1", salt)
      .update(password)
      .digest("hex")

    console.log("user", { name, email, password, salt, hashed_password })

    await prisma.user
      .create({
        data: { name, email, hashed_password, salt },
      })
      .catch((error) => {
        const { code, meta } = error
        const { target } = meta
        console.log("error target", target)
        if (code === "P2002") {
          const field = target.split("_")[1]
          if (field === "email") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "邮箱已被注册|email",
            })
          }
        }
      })

    return true
  })

export default create
