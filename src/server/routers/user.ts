import { router } from "../trpc"

import create from "../procedures/user/create"
import follow from "../procedures/user/follow"
import unfollow from "../procedures/user/unfollow"
import list from "../procedures/user/list"

const userRouter = router({
  create,
  follow,
  unfollow,
  list,
})

export default userRouter
