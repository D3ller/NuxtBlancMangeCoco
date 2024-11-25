export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    body.password = await hashPassword(body.password)
    // console.log(body.password)
  } catch (error) {
    console.log(error)
  }

  try {
    return await new UserSchema(body).save()
  }
  catch (error) {
    return error
  }
})
