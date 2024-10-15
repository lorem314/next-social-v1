import { router } from "../trpc"

import login from "../procedures/auth/login"

const authRouter = router({
  login,
})

export default authRouter
