export interface IRegisterRequest {
    email: string;
    password: string;
}

export type RegisterResponse = string

export interface ILoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}


export type LoginResponse = string


export interface IUser {
    id: string;
    fullName: string;
    profileImage: string;
    username: string;
}

export interface IActivateUserResponse {
    error?: string;
    message?: string;
}

