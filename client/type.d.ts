export interface account {
    id: string | number
    name: string
    email: string
    password: string
    profilPicture: string
}

export type accountwopassword = Omit<account, "password">

export interface word {
    id: string | number
    word: string
    theme: string
    user: account
}

export interface sentence {
    id: string | number
    sentence: string
    theme: string
    user: account
}

export interface User {
    id: string;
    email: string;
    password: string;
    roles: string[];
}

export type UserWithoutPassword = Omit<User, "password">;