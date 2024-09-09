import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { IMessageResponse } from './types/competition-types';
import { IResultUploadRequest } from './types/upload-types';


export const uploadApi = createApi({
    reducerPath: 'uploadApi',
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        uploadResult: builder.mutation<IMessageResponse, IResultUploadRequest>({
            query: ({ competitionId, file }) => ({
                url: `/files/upload/result/${competitionId}`,
                method: 'POST',
                data: file, // FormData is passed here
            }),
        }),
    }),
});

export const {
    useUploadResultMutation,
} = uploadApi;
