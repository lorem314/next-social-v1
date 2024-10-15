import Link from "next/link"
import "./globals.css"
import TRPCProvider from "./_trpc/Provider"
import { getServerSession } from "next-auth"

import Logout from "./_components/Logout"
// import { authOptions } from "./api/auth/[...nextauth]"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()

  // console.log("[>>>>] root layout getServerSession", session)
  return (
    <html lang="en">
      <body>
        {/* <SessionProvider session={session}> */}
        <TRPCProvider>
          <header className="h-[50px] px-[10px] bg-purple-700 flex justify-between items-center">
            <h1 className="text-xl font-mono">
              <Link className="text-white" href="/">
                Next-Social-v1
              </Link>
            </h1>

            <nav>
              <ul className="flex items-center gap-[10px]">
                <li>
                  <Link className="text-white" href="/users">
                    用户列表
                  </Link>
                </li>
                <li className="min-h-[1em] w-0.5 self-stretch bg-neutral-100 opacity-75" />
                {!!session ? (
                  <>
                    <li>
                      <Link className="text-white" href={`/profile`}>
                        {session.user?.name}
                      </Link>
                    </li>
                    <li>
                      <Logout />
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="text-white" href="/signup">
                        注册
                      </Link>
                    </li>
                    <li>
                      <Link className="text-white" href="/login">
                        登录
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </header>

          <main>{children}</main>
        </TRPCProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  )
}
