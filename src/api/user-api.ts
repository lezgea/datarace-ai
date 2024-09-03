import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { IActivateUserResponse, ILoginRequest, IRegisterRequest, IUser, LoginResponse, RegisterResponse } from './types/user-types';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        registerUser: builder.mutation<RegisterResponse, IRegisterRequest>({
            query: (credentials) => ({
                url: '/users',
                method: 'POST',
                data: credentials,
            }),
        }),
        loginUser: builder.mutation<LoginResponse, ILoginRequest>({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                data: credentials,
            }),
        }),
        logoutUser: builder.mutation<string, void>({
            query: () => ({
                url: '/users/logout',
                method: 'GET',
            }),
        }),
        activateUser: builder.query<IActivateUserResponse, { token: string }>({
            query: ({ token }) => ({
                url: `/users/active?token=${encodeURIComponent(token)}`,
                method: 'GET',
            }),
        }),
        getUser: builder.query<IUser, void>({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useActivateUserQuery,
    useGetUserQuery,
} = userApi;
