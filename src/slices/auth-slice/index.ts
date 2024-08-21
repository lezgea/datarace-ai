import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../api-slice';

interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
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
        },
    },
    extraReducers: (builder) => {
        // Handle loginUser mutation
        builder
            .addMatcher(
                apiSlice.endpoints.loginUser.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                apiSlice.endpoints.loginUser.matchFulfilled,
                (state, action: PayloadAction<{ user: string }>) => {
                    state.loading = false;
                    state.isAuthenticated = true;
                    state.user = action.payload.user;
                }
            )
            .addMatcher(
                apiSlice.endpoints.loginUser.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message || 'Login failed';
                }
            );
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
