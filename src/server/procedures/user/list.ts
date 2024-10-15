import { publicProcedure } from "@/server/trpc"
import prisma from "@/server/prisma"

const list = publicProcedure.query(async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      about: true,
      followedByIDs: true,
      followingIDs: true,
    },
  })
  return users
})

export default list
