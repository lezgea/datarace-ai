
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { ILoginRequest, LoginResponse } from './types/auth-types';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL + '/v1',
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, ILoginRequest>({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                data: credentials,
            }),
        }),
        logoutUser: builder.mutation<string, void>({
            query: () => {
                const token = Cookies.get('dtr-token'); // Retrieve the token from cookies
                return {
                    url: `/users/logout`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
                    },
                };
            },
        }),
    }),
});

export const {
    useLoginUserMutation,
    useLogoutUserMutation,
} = userApi;
