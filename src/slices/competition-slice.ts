import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { competitionApi } from '@api/competition-api';
import { ICompetition, ICompetitionsResponse } from '@api/types/competition-types';


interface ICompetitionState {
    competitions: ICompetitionsResponse | [];
    competitionInfo: ICompetition | null,
    selectedCompetition: number,
    loading: boolean;
    error: string | null;
}

const initialState: ICompetitionState = {
    competitions: [],
    competitionInfo: null,
    selectedCompetition: 1,
    loading: false,
    error: null,
};

const competitionSlice = createSlice({
    name: 'competitions',
    initialState,
    reducers: {
        // setSelectedCategory: (state, action: PayloadAction<number>) => {
        //     state.selectedCategory = action.payload;
        // },
    },
    extraReducers: (builder) => {
        // GET COMPETITIONS QUERY
        builder
            .addMatcher(
                competitionApi.endpoints.getCompetitions.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                competitionApi.endpoints.getCompetitions.matchFulfilled,
                (state, action: PayloadAction<ICompetitionsResponse>) => {
                    state.loading = false;
                    state.competitions = action.payload;
                }
            )
            .addMatcher(
                competitionApi.endpoints.getCompetitions.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Failed to fetch competitions';
                }
            );

        // GET COMPETITION INFO QUERY
        builder
            .addMatcher(
                competitionApi.endpoints.getCompetitionInfo.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                competitionApi.endpoints.getCompetitionInfo.matchFulfilled,
                (state, action: PayloadAction<ICompetition>) => {
                    state.loading = false;
                    state.competitionInfo = action.payload;
                }
            )
            .addMatcher(
                competitionApi.endpoints.getCompetitionInfo.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Failed to fetch competition info';
                }
            );
    },
});

export const { } = competitionSlice.actions;

export default competitionSlice.reducer;
