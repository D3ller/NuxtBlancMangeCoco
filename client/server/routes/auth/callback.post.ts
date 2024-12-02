import { setUser } from "~/server/models/user.schema";
import { getDiscordUserInfo, getGoogleUserInfo } from "~/server/utils/callback";

async function createCookie(event, userInfo: string) {
    let userExist = await getUserByEmail(userInfo.email)

    console.log(userExist)

    if (userExist) {
        const session = serialize({ userId: userExist._id.toHexString() });
        const config = useRuntimeConfig();
        const signedSession = sign(session, config.cookieSecret);
        const rememberMe = true


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
    }
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { code, provider } = body
    let userInfo;

    switch (provider) {
        // if provider is Google ->
        case "google": {
            userInfo = await getGoogleUserInfo(code);
            let userExist = await getUserByEmail(userInfo.email)

            // if user don't exist register them with provider in option
            // for register syteme, because oAuth don't need password

            if (!userExist) {
                await setUser(userInfo, provider)
            } else {
                console.log('user already exist', userInfo)
            }
            break;
        }

        // if provider is Discord ->
        case "discord": {
            userInfo = await getDiscordUserInfo(code);
            let userExist = await getUserByEmail(userInfo.email)

            // if user don't exist register them with provider

            if (!userExist) {
                await setUser(userInfo, provider)
                await createCookie(event, userInfo)
            } else {
                await createCookie(event, userInfo)
                console.log('user already exist', userInfo)
            }
            break;
        }
        default: {
            throw createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "Invalid provider",
            });
        }
    }

    return {
        status: 200,
        body: {
            userInfo,
        }
    }

})