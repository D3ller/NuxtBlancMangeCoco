import { defineMongooseModel } from '#nuxt/mongoose'

export const UserSchema = defineMongooseModel({
  name: 'User',
  schema: {
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    roles: {
      type: "array",
      required: true,
      default: "[\"USER\"]"
    }
  },
})

export function getUsers() {
  return UserSchema.find()
}

export function getUserByEmail(email :string) {
  return UserSchema.findOne({
    email
  }).lean()
}

export function getUserById(id :any) {
  return UserSchema.findOne({
    _id: id
  }).lean()
}

export function isAdmin() {
  return false
}