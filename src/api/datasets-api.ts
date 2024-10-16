import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { IDatasetsRequest, IDatasetsResponse } from './types/dataset-types';


export const datasetsApi = createApi({
    reducerPath: 'datasetsApi',
    baseQuery: axiosBaseQuery,
    tagTypes: ['AllDatasets', 'MyDatasets'],
    endpoints: (builder) => ({
        getAllDatasets: builder.query<IDatasetsResponse, IDatasetsRequest>({
            query: ({ data }) => ({
                url: `/datasets/users/page?isMyDataset=false`,
                method: 'GET',
                params: { page: data.page, count: data.count },
            }),
            providesTags: ['AllDatasets'],
        }),
        getMyDatasets: builder.query<IDatasetsResponse, IDatasetsRequest>({
            query: ({ data }) => ({
                url: `/datasets/users/page?isMyDataset=true`,
                method: 'GET',
                params: { page: data.page, count: data.count },
            }),
            providesTags: ['MyDatasets'],
        }),
        // getAttendedCompetitions: builder.query<IAttendedCompetitionsResponse, IAttendedCompetitionsRequest>({
        //     query: ({ data }) => ({
        //         url: `/competitions/user/page`,
        //         method: 'GET',
        //         params: { page: data.page, count: data.count, userHasSubmitted: data.userHasSubmitted, criteria: {}, },
        //     }),
        // }),
        // getScoreBoard: builder.query<IScoreboardResponse, IScoreboardRequest>({
        //     query: ({ data }) => ({
        //         url: `/competitions/score/page`,
        //         method: 'GET',
        //         params: { page: data.page, count: data.count, competitionId: data.competitionId },
        //     }),
        // }),
        // getCompetitionInfo: builder.query<ICompetition, ICompetitionInfoRequest>({
        //     query: ({ id }) => ({
        //         url: `/competitions/${id}`,
        //         method: 'GET',
        //     }),
        //     providesTags: ['Competition'],
        // }),
        // joinCompetition: builder.mutation<IMessageResponse, ICompetitionInfoRequest>({
        //     query: ({ id }) => ({
        //         url: `/competitions/${id}/join`,
        //         method: 'POST',
        //     }),
        //     invalidatesTags: ['Competition'],
        // }),
    }),
});

export const {
    useLazyGetAllDatasetsQuery,
    useLazyGetMyDatasetsQuery,
} = datasetsApi;
