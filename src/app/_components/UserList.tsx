import Link from "next/link"
import Image from "next/image"

type User = {
  id: string
  email: string
  name: string
  followedByIDs: string[]
  followingIDs: string[]
}

const UserList = ({ users = [] }: { users: User[] }) => {
  return (
    <ul className="mt-4 flex flex-col gap-4">
      {users.map((user) => {
        return (
          <li key={user.id} className="flex gap-[10px]">
            <div>
              <Image
                className="rounded-full"
                src="/user-default-avatar.png"
                width={64}
                height={64}
                alt="User default avatar"
              />
            </div>
            <div className="grow flex flex-col justify-evenly">
              <h3 className="font-bold text-xl">
                <Link className="" href={`/profile/${user.id}`}>
                  {user.name}
                </Link>
              </h3>
              <div className="text-gray-600">{user.email}</div>
            </div>
            <div className="self-center flex gap-4 text-lg text-gray-700">
              <div>关注: {user.followingIDs.length}</div>
              <div>粉丝: {user.followedByIDs.length}</div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default UserList
