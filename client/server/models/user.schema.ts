import { defineMongooseModel } from '#nuxt/mongoose'

export const UserSchema = defineMongooseModel({
  name: 'User',
  schema: {
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    picture: {
      type: 'string',
      required: false,
      unique: false
    },
    loginMethod: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: function () {
        return this.loginMethod === 'default';
      }
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

export function getUserByEmail(email: string) {
  return UserSchema.findOne({
    email
  }).lean()
}

export function getUserById(id: any) {
  return UserSchema.findOne({
    _id: id
  }).lean()
}

export function isAdmin() {
  return false
}

export async function setUser(user: string, loginMethod: string) {

  let userAccount = {};

  // verify if the login method is not by default and don't
  // need password for register

  if (loginMethod != 'default') {
    userAccount = {
      loginMethod,
      email: user.email,
      role: ['USER']
    }
  }

  const newUser = new UserSchema(userAccount)
  
  try {
    newUser.save()
    return newUser
  } catch (error) {
    return error
  }
}