import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Edit() {
  const session = await getServerSession()

  if (!session) {
    return redirect("/")
  }

  return (
    <div className="page max-w-[36rem] px-8 py-6">
      <h2 className="text-2xl mb-4">修改个人资料</h2>
      <form action="">
        <div>
          <label htmlFor="">用户名</label>
          <input type="text" name="" id="" />
        </div>
      </form>
    </div>
  )
}
