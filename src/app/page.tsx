import prisma from "@/server/prisma"
import { caller } from "./_trpc/serverClient"

export default async function Home() {
  const message = await caller.test.greeting()

  const users = await prisma.user.findMany({})

  return (
    <section className="page max-w-[48rem]">
      <h2>主页</h2>
      <p>{JSON.stringify(users, null, "  ")}</p>
    </section>
  )
}
