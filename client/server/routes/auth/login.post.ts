import { verifyPassword } from "~/server/utils/password";
import { getUserByEmail } from "~/server/models/user.schema";

export default defineEventHandler(async (event) => {
    const body = await readBody<{ email: string; password: string; rememberMe: boolean }>(event);

    const { email, password, rememberMe } = body;
    if (!email || !password) {
        throw createError({
            statusCode: 400,
            message: "Email address and password are required",
        });
    }

    const userWithPassword = await getUserByEmail(email);
    if (!userWithPassword) {
        throw createError({
            statusCode: 401,
            message: "Bad credentials",
        });
    }

    const verified = await verifyPassword(userWithPassword.password, password);
    if (!verified) {
        throw createError({
            statusCode: 401,
            message: "Bad credentials",
        });
    }

    const config = useRuntimeConfig();

    const session = serialize({ userId: userWithPassword._id.toHexString() });
    // console.log(session)
    const signedSession = sign(session, config.cookieSecret);

    setCookie(event, config.cookieName, signedSession, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        // secure: process.env.NODE_ENV === "production",
        secure: false,
        expires: rememberMe
            ? new Date(Date.now() + parseInt(config.cookieRememberMeExpires))
            : new Date(Date.now() + parseInt(config.cookieExpires)),
    });

    const { password: _password, ...userWithoutPassword } = userWithPassword;

    console.log(userWithoutPassword)

    return {
        user: userWithoutPassword,
    };
});