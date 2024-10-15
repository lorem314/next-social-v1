import NextAuth, { NextAuthOptions, type Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import crypto from "node:crypto"

import prisma from "@/server/prisma"

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // console.log("\n[api/auth/...nextauth] route.ts")
        // console.log({ credentials })

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        })

        // console.log({ user })
        // console.log("\n")

        if (!user) return null

        const password = credentials?.password || ""
        const hashed_password = crypto
          .createHmac("sha1", user.salt)
          .update(password)
          .digest("hex")

        if (hashed_password !== user.hashed_password) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // console.log("\n[>>>>] session callback")
      // console.log({ session, token, user })
      // console.log("\n")

      if (token) {
        // session.user.id = token.sub || ""
        session.userId = token.sub || ""
      }
      return Promise.resolve(session)
    },
    async jwt({ token, user, account, profile }) {
      // console.log("\n[>>>>] jwt callback")
      // console.log({ token, user, account, profile })
      // console.log("\n")
      if (user) {
        // console.log("[>>>>] has user, add ID to token")
        token.uid = user.id
      }
      return token
    },
  },
}

const nextAuth = NextAuth(authOptions)

export { nextAuth, nextAuth as GET, nextAuth as POST }
