import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { categoryApi } from '../api/category-api';
import { CategoriesResponse, ICategory } from '@api/types/category-types';
import { competitionApi } from '@api/competition-api';
import { ICompetitionsResponse } from '@api/types/competition-types';

interface ICompetitionState {
    competitions: ICompetitionsResponse | null;
    selectedCompetition: number,
    loading: boolean;
    error: string | null;
}

const initialState: ICompetitionState = {
    competitions: null,
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
    },
});

export const { } = competitionSlice.actions;

export default competitionSlice.reducer;
