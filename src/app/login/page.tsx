"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"
import { trpc } from "../_trpc/client"

type LoginInputs = {
  email: string
  password: string
  hasExpiration: boolean
  expiresIn: string
}

export default function Login() {
  const router = useRouter()
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "user001@gmail.com",
      password: "user001",
      hasExpiration: false,
      expiresIn: "1d",
    },
  })
  const hasExpiration = watch("hasExpiration")

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess(data) {
      console.log("onSuccess")
    },
    onError(error) {
      console.log("onError")
    },
  })

  const submit: SubmitHandler<LoginInputs> = async (data) => {
    // loginMutation.mutate(data)
    const { email, password } = data
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    console.log("login page", { res })

    if (!res?.error) {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <section className="page max-w-sm p-6 space-y-4">
      <h2 className="text-xl mb-2">登录</h2>
      <form className="space-y-4" onSubmit={handleSubmit(submit)}>
        <div>
          <div className="mb-2">
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="email"
            >
              邮箱
            </label>
            {errors.email ? (
              <small className="text-red-500">{errors.email.message}</small>
            ) : null}
          </div>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: { value: /.+\@.+\..+/, message: "邮箱格式不正确" },
              required: "邮箱不能为空",
            })}
            pattern=".+@.+..+"
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="password"
          >
            密码
          </label>
          <input type="password" id="password" {...register("password")} />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 py-2.5">
            <input
              type="checkbox"
              id="expires-in"
              {...register("hasExpiration")}
            />
            <label htmlFor="expires-in">记住我</label>
          </div>
          {hasExpiration ? (
            <select {...register("expiresIn")}>
              <option value="15s">15 秒</option>
              <option value="1d">1 天</option>
              <option value="7d">1 周</option>
              <option value="99y">永久(不推荐)</option>
            </select>
          ) : null}
        </div>
        <button className="primary-button">登录</button>
      </form>
      <p className="flex justify-between text-sm font-light text-gray-500">
        <span>
          没有帐号?去<Link href="/signup">注册</Link>
        </span>
        {/* <span>忘记密码</span> */}
      </p>
    </section>
  )
}
