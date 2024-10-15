"use client"
import { signOut } from "next-auth/react"

export default function Logout() {
  return (
    <button
      className="text-white"
      onClick={() => {
        signOut()
      }}
    >
      登出
    </button>
  )
}
