"use client"

import { getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { trpc } from "../_trpc/client"

export default function FollowButton({
  followedByIDs,
  followId,
}: {
  followedByIDs: string[]
  followId: string
}) {
  const [state, setState] = useState({
    isLoading: true,
    userId: "",
    isFollowed: false,
  })

  useEffect(() => {
    getSession().then((session) => {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        userId: session?.userId || "",
        isFollowed: followedByIDs?.includes(session?.userId || "") || false,
      }))
    })
  }, [])

  const handleSuccess = (data: { isFollowed: boolean }) => {
    const { isFollowed } = data
    setState((prevState) => ({ ...prevState, isFollowed }))
  }

  const followMutation = trpc.user.follow.useMutation({
    onSuccess: handleSuccess,
  })
  const unfollowMutation = trpc.user.unfollow.useMutation({
    onSuccess: handleSuccess,
  })

  const handleFollow = () => {
    console.log("click follow")
    followMutation.mutate({ userId: state.userId, followId: followId })
  }
  const handleUnfollow = () => {
    console.log("click unfollow")
    unfollowMutation.mutate({ userId: state.userId, followId: followId })
  }

  const { isLoading, userId, isFollowed } = state

  return !isLoading ? (
    <button
      className="primary-button"
      onClick={isFollowed ? handleUnfollow : handleFollow}
    >
      {isFollowed ? "取消关注" : "关注"}
    </button>
  ) : null
}
