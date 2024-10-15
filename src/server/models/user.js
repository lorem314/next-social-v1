import mongoose from "mongoose"
import crypto from "crypto"

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: "缺少用户名" },
    email: {
      type: String,
      trim: true,
      unique: "邮箱已被注册",
      index: { unique: true },
      match: [/.+\@.+\..+/, "邮箱格式不正确"],
      required: "缺少邮箱地址",
    },
    about: { type: String, trim: true },
    avatar: { data: Buffer, contentType: String },
    following: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    hashed_password: { type: String, required: "缺少密码" },
    salt: String,
  },
  {
    timestamps: true,
  }
)

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function (password) {
    if (!password) return ""

    try {
      return crypto.createHmac("sha1", this.salt).update(password).digest("hex")
    } catch (err) {
      console.error("[ERROR] user.model.js (encryptPassword) ")
      return ""
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + ""
  },
}

UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this.password.length < 6) {
    this.invalidate("password", "密码长度不能小于 6 位")
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "缺少密码")
  }
}, null)

export default mongoose.model("User", UserSchema)
