export interface LoginRequest {
    username: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    user: User; // Ensure this is a User object, not a string
    token: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

