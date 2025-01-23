import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { IActivateUserResponse, IChangeRequest, IForgetRequest, ILoginRequest, IRegisterRequest, IUser, LoginResponse, RegisterResponse } from './types/user-types';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        registerUser: builder.mutation<RegisterResponse, IRegisterRequest>({
            query: (credentials) => ({
                url: '/users',
                method: 'POST',
                data: credentials,
                headers: { "Accept-language": credentials.lang }
            }),
        }),
        loginUser: builder.mutation<LoginResponse, ILoginRequest>({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                data: credentials,
            }),
        }),
        forgotPassword: builder.mutation<null, IForgetRequest>({
            query: (credentials) => ({
                url: '/users/forget-password',
                method: 'POST',
                data: credentials,
            }),
        }),
        changePassword: builder.mutation<null, IChangeRequest>({
            query: (credentials) => ({
                url: `/users/change-password?token=${encodeURIComponent(credentials.token)}`,
                method: 'POST',
                data: { password: credentials.password },
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
            providesTags: ['User'],
        }),
        getUserById: builder.query<IUser, { id: number | string }>({
            query: ({ id }) => ({
                url: `/users/info/${id}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        updateUser: builder.mutation<IUser, { id: number | string; data: Partial<IUser>; lang: string }>({
            query: ({ id, data, lang }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                data,
                headers: { "Accept-language": lang }
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation<void, { id: number | string }>({
            query: ({ id }) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useActivateUserQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useForgotPasswordMutation,
    useChangePasswordMutation,
    useLazyGetUserByIdQuery,
} = userApi;
