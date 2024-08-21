
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { LoginRequest, LoginResponse } from './types/auth-types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL + '/v1',
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/users/login',
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
