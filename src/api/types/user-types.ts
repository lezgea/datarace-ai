export interface IRegisterRequest {
    email: string;
    password: string;
}

export type RegisterResponse = string

export interface ILoginRequest {
    emailOrNickname: string,
    password: string,
    rememberMe?: boolean,
}

export interface IForgetRequest {
    email: string,
}

export interface IChangeRequest {
    password: string,
    token: string,
}


export type LoginResponse = string


export interface IUser {
    id: number | string,
    fullName: string,
    profileImageUrl?: string,
    profileImage?: string,
    profileFileId?: number | string,
    nickname?: string,
    email?: string,
    phoneNumber?: string,
    acceptNotification?: boolean,
    message?: string,
}

export interface IActivateUserResponse {
    success?: string;
    error?: string;
    message?: string;
}

