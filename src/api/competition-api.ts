import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { IAttendedCompetitionsRequest, IAttendedCompetitionsResponse, ICompetition, ICompetitionInfoRequest, ICompetitionsRequest, ICompetitionsResponse, IMessageResponse, IScoreboardRequest, IScoreboardResponse } from './types/competition-types';


export const competitionApi = createApi({
    reducerPath: 'competitionApi',
    baseQuery: axiosBaseQuery,
    tagTypes: ['Competition'],
    endpoints: (builder) => ({
        getCompetitions: builder.query<ICompetitionsResponse, ICompetitionsRequest>({
            query: ({ categoryId, data }) => ({
                url: `/competitions/${categoryId}/page`,
                method: 'GET',
                params: { page: data.page, count: data.count },
            }),
        }),
        getAttendedCompetitions: builder.query<IAttendedCompetitionsResponse, IAttendedCompetitionsRequest>({
            query: ({ data }) => ({
                url: `/competitions/user/page`,
                method: 'GET',
                params: { page: data.page, count: data.count, userHasSubmitted: data.userHasSubmitted, criteria: {}, },
            }),
        }),
        getScoreBoard: builder.query<IScoreboardResponse, IScoreboardRequest>({
            query: ({ data }) => ({
                url: `/competitions/page`,
                method: 'GET',
                params: { page: data.page, count: data.count, competitionId: data.competitionId },
            }),
        }),
        getCompetitionInfo: builder.query<ICompetition, ICompetitionInfoRequest>({
            query: ({ id }) => ({
                url: `/competitions/${id}`,
                method: 'GET',
            }),
            providesTags: ['Competition'],
        }),
        joinCompetition: builder.mutation<IMessageResponse, ICompetitionInfoRequest>({
            query: ({ id }) => ({
                url: `/competitions/${id}/join`,
                method: 'POST',
            }),
            invalidatesTags: ['Competition'],
        }),
    }),
});

export const {
    useGetCompetitionInfoQuery,
    useLazyGetCompetitionsQuery,
    useJoinCompetitionMutation,
    useLazyGetAttendedCompetitionsQuery,
    useLazyGetScoreBoardQuery,
} = competitionApi;
