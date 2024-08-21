import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';

interface LoginResponse {
    user: string;
    token: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({
        baseUrl: 'https://beta.datarace.ai/v1',
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                data: credentials,
            }),
        }),
    }),
});

export const { useLoginUserMutation } = apiSlice;
