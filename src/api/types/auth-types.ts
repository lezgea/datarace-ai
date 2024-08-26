export interface ILoginRequest {
    username: string;
    password: string;
    rememberMe?: boolean;
}

export type LoginResponse = string

export interface IUser {
    id: string;
    name: string;
    email: string;
}

