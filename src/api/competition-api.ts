import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { IAttendedCompetitionsRequest, IAttendedCompetitionsResponse, ICompetition, ICompetitionCreateCommentRequest, ICompetitionInfoRequest, ICompetitionsRequest, ICompetitionsResponse, ICompetitionUpdateCommentRequest, IDeleteCompetitionCommentRequest, IGetCompetitionCommentsRequest, IGetCompetitionCommentsResponse, IMessageResponse, IScoreboardRequest, IScoreboardResponse } from './types/competition-types';


export const competitionApi = createApi({
    reducerPath: 'competitionApi',
    baseQuery: axiosBaseQuery,
    tagTypes: ['Competition', 'CompetitionComments'],
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
                url: `/competitions/score/page`,
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
        createCompetitionComment: builder.mutation<IMessageResponse, ICompetitionCreateCommentRequest>({
            query: ({ id, data }) => ({
                url: `/competitions/${id}/comment`,
                method: 'POST',
                data: data,
            }),
            invalidatesTags: ['CompetitionComments'],
        }),
        getCompetitionComments: builder.query<IGetCompetitionCommentsResponse, IGetCompetitionCommentsRequest>({
            query: ({ id }) => ({
                url: `/competitions/${id}/comment`,
                method: 'GET',
                params: {},
            }),
            providesTags: ['CompetitionComments'],
        }),
        deleteCompetitionComment: builder.mutation<void, IDeleteCompetitionCommentRequest>({
            query: ({ commentId }) => ({
                url: `/competitions/comment/${commentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CompetitionComments'],
        }),
        updateCompetitionComment: builder.mutation<IMessageResponse, ICompetitionUpdateCommentRequest>({
            query: ({ commentId, data }) => ({
                url: `/competitions/comment/${commentId}`,
                method: 'PUT',
                data: data,
            }),
            invalidatesTags: ['CompetitionComments'],
        }),
    }),
});

export const {
    useGetCompetitionInfoQuery,
    useLazyGetCompetitionsQuery,
    useJoinCompetitionMutation,
    useLazyGetAttendedCompetitionsQuery,
    useLazyGetScoreBoardQuery,
    useCreateCompetitionCommentMutation,
    useLazyGetCompetitionCommentsQuery,
    useDeleteCompetitionCommentMutation,
    useUpdateCompetitionCommentMutation,
} = competitionApi;
