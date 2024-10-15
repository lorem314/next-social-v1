"use client"
// import prisma from "@/server/prisma"
import { trpc } from "../_trpc/client"

import UserList from "@/app/_components/UserList"

export default function Users() {
  // const users = await prisma.user.findMany({})
  const listQuery = trpc.user.list.useQuery()

  return (
    <div className="page max-w-[36rem] px-8 py-6">
      <h2 className="text-xl">用户列表</h2>
      <UserList users={listQuery.data || []} />
    </div>
  )
}
