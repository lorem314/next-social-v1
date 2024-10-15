import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    userId?: string
    user?: {
      id: string
    } & DefaultSession["user"]
  }
}
