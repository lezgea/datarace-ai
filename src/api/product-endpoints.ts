import { apiSlice } from './api-slice';
import { LoginResponse, LoginRequest } from './types';

export const injectCompetitionEndpoints = () => {
    return apiSlice.injectEndpoints({
        endpoints: (builder) => ({
            loginUser: builder.mutation<LoginResponse, LoginRequest>({
                query: (credentials) => ({
                    url: '/users/login',
                    method: 'POST',
                    data: credentials,
                }),
            }),
        }),
        overrideExisting: false,
    });
};

// You can return the hooks after injection
export const { useLoginUserMutation } = injectCompetitionEndpoints();
