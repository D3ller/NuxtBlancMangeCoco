export default defineEventHandler(async (event) => {
  try {
    const user = await UserSchema.findOne({ _id: event.context.params?._id }).lean();
    if (user) {
      delete user.password;
    }
    return user;
  }
  catch (error) {
    return error
  }
})