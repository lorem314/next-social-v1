import prisma from "@/server/prisma"
import Image from "next/image"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function () {
  const session = await getServerSession()

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  })

  if (!session) {
    return redirect("/")
  }

  return (
    <div className="page max-w-md px-8 py-6">
      <h2 className="text-2xl mb-4">你的个人信息</h2>

      <div className="flex gap-4">
        <Image
          className="rounded-full"
          src="/user-default-avatar.png"
          width={64}
          height={64}
          alt="User default avatar"
        />
        <div className="grow flex flex-col justify-around">
          <div className="font-bold text-2xl">{user?.name}</div>
          <div className="text-lg text-gray-600">{user?.email}</div>
        </div>
        <div className="self-center">
          <Link href="/profile/edit">修改个人资料</Link>
        </div>
      </div>
    </div>
  )
}
