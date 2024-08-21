import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../api/user-api';
import { LoginResponse, User } from '@api/types/auth-types';
import Cookies from 'js-cookie';


interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            Cookies.remove('dtr-token')
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle pending state when the loginUser mutation is initiated
            .addMatcher(
                userApi.endpoints.loginUser.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            // Handle fulfilled state when the loginUser mutation succeeds
            .addMatcher(
                userApi.endpoints.loginUser.matchFulfilled,
                (state, action: PayloadAction<LoginResponse>) => {
                    state.loading = false;
                    state.isAuthenticated = true;
                    Cookies.set('dtr-token', action.payload, {
                        secure: process.env.NODE_ENV === 'production',
                        expires: 7,
                    });
                }
            )
            // Handle rejected state when the loginUser mutation fails
            .addMatcher(
                userApi.endpoints.loginUser.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Login failed';
                }
            );
    },
});

// Export the logout action so you can use it in components
export const { logout } = authSlice.actions;

export default authSlice.reducer;
