import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../api/user-api';
import { ILoginRequest, IUser, LoginResponse, RegisterResponse } from '@api/types/user-types';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

interface IAuthState {
    isAuthenticated: boolean;
    user: IUser | null;
    loading: boolean;
    error: string | null;
    description: string | null;
}

const initialState: IAuthState = {
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
    description: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<{ isAuthenticated: boolean, user: IUser | null }>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
            state.loading = false;  // Loading is done once this action is dispatched
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
            state.error = null;
            Cookies.remove('dtr-token');
        },
    },
    extraReducers: (builder) => {
        // REGISTER USER
        builder
            .addMatcher(
                userApi.endpoints.registerUser.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                userApi.endpoints.registerUser.matchFulfilled,
                (state, action: PayloadAction<RegisterResponse>) => {
                    state.loading = false;
                }
            )
            .addMatcher(
                userApi.endpoints.loginUser.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Login failed';
                }
            );

        // ACTIVATE USER
        builder
            .addMatcher(
                userApi.endpoints.activateUser.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                userApi.endpoints.activateUser.matchFulfilled,
                (state) => {
                    state.loading = false;
                    state.isAuthenticated = false;
                    state.user = null;
                    Cookies.remove('dtr-token'); // Removes old token (if exists) on successful activation
                }
            )
            .addMatcher(
                userApi.endpoints.activateUser.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Activation failed';
                }
            );

        // CHANGE PASSWORD
        builder
            .addMatcher(
                userApi.endpoints.changePassword.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                userApi.endpoints.changePassword.matchFulfilled,
                (state) => {
                    state.loading = false;
                    state.isAuthenticated = false;
                    state.user = null;
                    toast.success("Password has been changed successfully!")
                }
            )
            .addMatcher(
                userApi.endpoints.changePassword.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Operation failed';
                }
            );

        // LOGIN USER
        builder
            .addMatcher(
                userApi.endpoints.loginUser.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                    let token = Cookies.get('dtr-token')
                    if (!!token) {
                        Cookies.remove('dtr-token')
                    }
                }
            )
            .addMatcher(
                userApi.endpoints.loginUser.matchFulfilled,
                (state, action: PayloadAction<LoginResponse, string, { arg: { originalArgs: ILoginRequest } }>) => {
                    state.loading = false;
                    state.isAuthenticated = true;

                    const token = action.payload;
                    const { rememberMe } = action.meta.arg.originalArgs;

                    // Determine the expiration time based on rememberMe
                    const expirationTime = rememberMe ? 167 / 24 : 11 / 24; // 167 hours for rememberMe, 11 hours otherwise

                    // Store the token in the cookie with the appropriate expiration time
                    Cookies.set('dtr-token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        expires: expirationTime, // Expiration time in days
                        sameSite: 'Strict',
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

        // FORGOT PASSWORD
        builder
            .addMatcher(
                userApi.endpoints.forgotPassword.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                userApi.endpoints.forgotPassword.matchFulfilled,
                (state, action) => {
                    state.loading = false;
                    toast.success("Email has been sent!")
                }
            )
            .addMatcher(
                userApi.endpoints.forgotPassword.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Login failed';
                }
            );

        // LOGOUT USER
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

        // GET USER
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

        // UPDATE USER
        builder
            .addMatcher(
                userApi.endpoints.updateUser.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                userApi.endpoints.updateUser.matchFulfilled,
                (state, action: PayloadAction<IUser>) => {
                    state.loading = false;
                    state.user = action.payload;
                    toast.success(action.payload?.message || 'User data updated successfully');
                }
            )
            .addMatcher(
                userApi.endpoints.updateUser.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Failed to update user data';
                }
            );

        // DELETE USER
        builder
            .addMatcher(
                userApi.endpoints.deleteUser.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                userApi.endpoints.deleteUser.matchFulfilled,
                (state, action) => {
                    state.loading = false;
                    state.user = null;
                    let token = Cookies.get('dtr-token')
                    if (!!token) {
                        Cookies.remove('dtr-token')
                    }
                    toast.success('Your account has been deleted successfully');
                }
            )
            .addMatcher(
                userApi.endpoints.deleteUser.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Failed to delete user';
                    toast.error('Unable to delete your account');
                }
            );
    },
});

export const { setAuthState, logout } = userSlice.actions;

export default userSlice.reducer;
