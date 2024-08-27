import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../api/user-api';
import { IUser, LoginResponse } from '@api/types/user-types';
import Cookies from 'js-cookie';


interface IAuthState {
    isAuthenticated: boolean;
    user: IUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: IAuthState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
            state.error = null;
            Cookies.remove('dtr-token')
        },
    },
    extraReducers: (builder) => {
        // handling loginUser mutation
        builder
            .addMatcher(
                userApi.endpoints.loginUser.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
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
            .addMatcher(
                userApi.endpoints.loginUser.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Login failed';
                }
            );

        // handling logoutUser mutation
        builder
            .addMatcher(
                userApi.endpoints.logoutUser.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                userApi.endpoints.logoutUser.matchFulfilled,
                (state) => {
                    state.loading = false;
                    state.isAuthenticated = false;
                    state.user = null;
                    Cookies.remove('dtr-token'); // Remove token on successful logout
                }
            )
            .addMatcher(
                userApi.endpoints.logoutUser.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Logout failed';
                }
            );

        // handling getUser query
        builder
            .addMatcher(
                userApi.endpoints.getUser.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                userApi.endpoints.getUser.matchFulfilled,
                (state, action: PayloadAction<IUser>) => {
                    state.loading = false;
                    state.isAuthenticated = true;
                    state.user = action.payload;
                }
            )
            .addMatcher(
                userApi.endpoints.getUser.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Failed to fetch user data';
                    state.isAuthenticated = false;
                    state.user = null;
                }
            );


    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
