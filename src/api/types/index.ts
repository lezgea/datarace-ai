export interface LoginRequest {
    username: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    user: string;
    token: string;
}