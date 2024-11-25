import {getDiscordUserInfo, getGoogleUserInfo} from "~/server/utils/callback";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { code, provider } = body
    let userInfo;

    switch (provider) {
        case "google": {
            userInfo = await getGoogleUserInfo(code);
            break;
        }
        case "discord": {
            userInfo = await getDiscordUserInfo(code);
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