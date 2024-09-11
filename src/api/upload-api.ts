import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { IMessageResponse } from './types/competition-types';
import { DownloadResultResponse, IDownloadResultRequest, IGetResultRequest, IGetResultResponse, IProfileImageUploadRequest, IResultSaveRequest, ISubmitResultRequest } from './types/upload-types';


export const uploadApi = createApi({
    reducerPath: 'uploadApi',
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        saveResult: builder.mutation<IMessageResponse, IResultSaveRequest>({
            query: ({ competitionId, file }) => ({
                url: `/files/upload/result/${competitionId}`,
                method: 'POST',
                data: file,
            }),
        }),
        getResult: builder.query<IGetResultResponse, IGetResultRequest>({
            query: ({ competitionId, userId }) => ({
                url: `/files/result/${competitionId}/${userId}`,
                method: 'GET',
            }),
        }),
        downloadResult: builder.query<DownloadResultResponse, IDownloadResultRequest>({
            query: ({ resultFieldId }) => ({
                url: `/files/download/result/${resultFieldId}`,
                method: 'GET',
                responseHandler: (response: any) => response.blob(),
            }),
        }),
        submitResult: builder.query<IMessageResponse, ISubmitResultRequest>({
            query: ({ competitionId }) => ({
                url: `/files/submit/${competitionId}`,
                method: 'GET',
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
    useSaveResultMutation,
    useUploadAvatarMutation,
    useGetResultQuery,
    useLazyDownloadResultQuery,
    useLazySubmitResultQuery,
} = uploadApi;
