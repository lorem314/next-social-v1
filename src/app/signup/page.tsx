"use client"

import Link from "next/link"
import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { trpc } from "../_trpc/client"

type Inputs = {
  name: string
  email: string
  password: string
}

export default function Signup() {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    trigger,
    setError,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: { name: "", email: "", password: "" },
  })

  const signupMutation = trpc.user.create.useMutation({
    onSuccess(data) {
      console.log("[signup] create.useMutation.onSuccess")
      console.log(data)
      reset({ name: "", email: "", password: "" })
    },
    onError(error) {
      console.log("[signup] create.useMutation.onError")
      console.log("error.data", error.data)
      console.log("error.message", error.message.split("|"))
      const [message, field] = error.message.split("|")
    },
  })

  const handleIsShowPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsShowPassword(event.target.checked)
  }

  const submit: SubmitHandler<Inputs> = (data) => {
    signupMutation.mutate(data)
  }

  return (
    <section className="page max-w-sm p-6  space-y-4">
      <h2 className="text-xl mb-2">注册</h2>
      <form className="space-y-4" onSubmit={handleSubmit(submit)}>
        <div>
          <div className="mb-2 flex justify-between items-center">
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="name"
            >
              用户名
            </label>
            {errors.name ? (
              <small className="text-red-500">{errors.name.message}</small>
            ) : null}
          </div>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "用户名不能为空",
              minLength: { value: 5, message: "用户名不能少于 5 个字符" },
              maxLength: { value: 20, message: "用户名不能多于 20 个字符" },
            })}
            pattern=".{5,20}"
          />
        </div>
        <div>
          <div className="mb-2 flex justify-between items-center">
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
          <div className="mb-2 flex justify-between items-center">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="password"
            >
              密码
            </label>
            {errors.password ? (
              <small className="text-red-500">{errors.password.message}</small>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <input
              type={isShowPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                minLength: { value: 6, message: "密码不能少于 6 个字符" },
              })}
              pattern="[a-zA-Z0-9]{6,}"
            />
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                id="show-password"
                checked={isShowPassword}
                onChange={handleIsShowPassword}
              />
              <label htmlFor="show-password">显示密码</label>
            </div>
          </div>
        </div>
        <button className="primary-button">注册</button>
      </form>
      <p className="text-sm font-light text-gray-500">
        已有帐号?去<Link href="/login">登录</Link>
      </p>
    </section>
  )
}
