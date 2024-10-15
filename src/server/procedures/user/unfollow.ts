import { z } from "zod"
import { TRPCError } from "@trpc/server"

import { publicProcedure } from "@/server/trpc"
import prisma from "@/server/prisma"

const unfollow = publicProcedure
  .input(
    z.object({
      userId: z.string(),
      followId: z.string(),
    })
  )
  .mutation(async (req) => {
    const { userId, followId } = req.input
    console.log("procedures user follow")

    const user = await prisma.user.findUnique({ where: { id: userId } })
    const removeFollowing = await prisma.user.update({
      where: { id: userId },
      data: {
        followingIDs: user?.followingIDs.filter(
          (followingId) => followingId !== followId
        ),
      },
    })
    const follow = await prisma.user.findUnique({ where: { id: followId } })
    const removeFollower = await prisma.user.update({
      where: { id: followId },
      data: {
        followedByIDs: follow?.followedByIDs.filter(
          (follower) => follower !== userId
        ),
      },
    })

    // console.log("unfollow")
    // console.log({ removeFollowing, removeFollower })

    return { isFollowed: removeFollower.followedByIDs.includes(userId) }
  })

export default unfollow
