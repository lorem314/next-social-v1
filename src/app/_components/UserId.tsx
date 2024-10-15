"use client"

import { getSession, useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function UserId() {
  const [userId, setUserId] = useState("")

  useEffect(() => {
    getSession().then((session) => {
      console.log("<UserId /> session", session)
      setUserId(session?.userId || "")
    })
  }, [])

  return <span>{userId}</span>
}
