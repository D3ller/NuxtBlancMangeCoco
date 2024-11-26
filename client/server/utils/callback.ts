
export function getGoogleUserInfo(token: string) {
    return $fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        return res;
    })
}

export function getDiscordUserInfo(token: string) {
    return $fetch(`https://discord.com/api/users/@me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        console.log(res);
        return res;
    })
}