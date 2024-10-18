import {verify} from "~/server/utils/password";
import {serialize, sign} from "~/server/utils/cookie";
import {getUserByEmail} from "~/server/models/user";

export default defineEventHandler(async (event) => {

    const {email, password} = await readBody(event);
    const config = useRuntimeConfig();

    if (!email || !password) {
        throw createError({
            message: "Email and password are required",
            status: 400
        })
    }

    const user = await getUserByEmail(email);
    if (!user) {
        throw createError({
            message: "User not found",
            status: 404
        })
    }

    const passwordMath = await verify(user.password, password);
    if (!passwordMath) {
        throw createError({
            message: "Password is incorrect",
            status: 400
        })
    }

    const token = serialize({userId: user.id});
    const tokenSession = sign(token, config.cookieSecret);

    setCookie(event, config.cookieName, tokenSession, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: rememberMe
            ? new Date(Date.now() + parseInt(config.cookieRememberMeExpires))
            : new Date(Date.now() + parseInt(config.cookieExpires)),
    });

    const {password: _password, ...userWithoutPassword} = userWithPassword;

    return {
        user: userWithoutPassword
    }

})