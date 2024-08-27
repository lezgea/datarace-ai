import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { ILoginRequest, LoginResponse } from './types/auth-types';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
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
    }),
});

export const { useLoginUserMutation, useLogoutUserMutation } = userApi;
