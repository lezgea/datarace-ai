import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { IMessageResponse } from './types/competition-types';
import { IProfileImageUploadRequest, IResultUploadRequest } from './types/upload-types';


export const uploadApi = createApi({
    reducerPath: 'uploadApi',
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        uploadResult: builder.mutation<IMessageResponse, IResultUploadRequest>({
            query: ({ competitionId, file }) => ({
                url: `/files/upload/result/${competitionId}`,
                method: 'POST',
                data: file,
            }),
        }),
        uploadAvatar: builder.mutation<IMessageResponse, IProfileImageUploadRequest>({
            query: ({ file }) => ({
                url: '/files/upload/profile-image',
                method: 'POST',
                data: file,
            }),
        }),
    }),
});

export const {
    useUploadResultMutation,
    useUploadAvatarMutation,
} = uploadApi;
