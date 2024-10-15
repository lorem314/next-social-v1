import prisma from "@/server/prisma"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { redirect } from "next/navigation"
import FollowButton from "@/app/_components/FollowButton"
import Link from "next/link"

export default async function UserProfile({
  params,
}: {
  params: { userId: string }
}) {
  const session = await getServerSession()
  const user = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
  })

  if (session?.user?.email === user?.email) {
    return redirect("/profile")
  }

  return (
    <div className="page max-w-[36rem] px-8 py-6">
      <h2 className="text-2xl">用户 {user?.name} 的个人信息</h2>
      <div className="mt-4 flex gap-4">
        <div>
          <Image
            className="rounded-full"
            src="/user-default-avatar.png"
            width={64}
            height={64}
            alt="User default avatar"
          />
        </div>
        <div className="grow flex flex-col justify-around">
          <div className="font-bold text-2xl">{user?.name}</div>
          <div className="text-lg text-gray-600">{user?.email}</div>
        </div>
        <div className="self-center">
          {session?.user ? (
            <FollowButton
              followId={user?.id || ""}
              followedByIDs={user?.followedByIDs || []}
            />
          ) : (
            <Link href="/login">登录后可关注</Link>
          )}
        </div>
      </div>
    </div>
  )
}
