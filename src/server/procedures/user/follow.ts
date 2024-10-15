import { z } from "zod"
import { TRPCError } from "@trpc/server"

import { publicProcedure } from "@/server/trpc"
import prisma from "@/server/prisma"

const follow = publicProcedure
  .input(
    z.object({
      userId: z.string(),
      followId: z.string(),
    })
  )
  .mutation(async (req) => {
    const { userId, followId } = req.input
    console.log("procedures user follow")

    const addFollowing = await prisma.user.update({
      where: { id: userId },
      data: { followingIDs: { push: followId } },
    })
    const addFollower = await prisma.user.update({
      where: { id: followId },
      data: { followedByIDs: { push: userId } },
    })

    // console.log("follow")
    // console.log({ userId, followId })
    // console.log({ addFollowing, addFollower })

    return { isFollowed: addFollower.followedByIDs.includes(userId) }
  })

export default follow
