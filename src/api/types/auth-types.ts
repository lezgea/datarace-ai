export interface LoginRequest {
    username: string;
    password: string;
    rememberMe?: boolean;
}

export type LoginResponse = string

export interface User {
    id: string;
    name: string;
    email: string;
}

