
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { LoginRequest, LoginResponse } from './types/auth-types';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery({
        baseUrl: 'https://api.example.com/users',
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                data: credentials,
            }),
        }),
        // getUser: builder.query<User, string>({
        //     query: (userId) => ({
        //         url: `/${userId}`,
        //         method: 'GET',
        //     }),
        // }),
    }),
});

export const {
    useLoginUserMutation,
    // useGetUserQuery
} = userApi;
