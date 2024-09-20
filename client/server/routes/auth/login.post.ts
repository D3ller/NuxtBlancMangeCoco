import {getUserByEmail} from "~/server/routes/models/user";
import {verify} from "~/server/routes/utils/password";

export default defineEventHandler(async (event) => {
    const {email, password} = await readBody(event);

    if(!email || !password) {
        throw createError({
            message: "Email and password are required",
            status: 400
        })
    }

    const user = await getUserByEmail(email);
    if(!user) {
        throw createError({
            message: "User not found",
            status: 404
        })
    }

    const passwordMath = await verify(user.password, password);
    if(!passwordMath) {
        throw createError({
            message: "Password is incorrect",
            status: 400
        })
    }

})