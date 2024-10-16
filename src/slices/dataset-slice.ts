import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { datasetsApi } from '@api/datasets-api';
import { IDatasetsResponse } from '@api/types/dataset-types';


interface IDatasetState {
    datasets: IDatasetsResponse | [],
    loading: boolean,
    error?: string | boolean,
    success?: string | boolean,
    message?: string,
}

const initialState: IDatasetState = {
    datasets: [],
    loading: false,
    error: false,
    success: false,
    message: '',
};

const datasetSlice = createSlice({
    name: 'datasets',
    initialState,
    reducers: {
        // setSelectedCategory: (state, action: PayloadAction<number>) => {
        //     state.selectedCategory = action.payload;
        // },
    },
    extraReducers: (builder) => {
        // GET ALL DATASETS QUERY
        builder
            .addMatcher(
                datasetsApi.endpoints.getAllDatasets.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = false;
                }
            )
            .addMatcher(
                datasetsApi.endpoints.getAllDatasets.matchFulfilled,
                (state, action: PayloadAction<IDatasetsResponse>) => {
                    state.loading = false;
                    state.datasets = action.payload;
                }
            )
            .addMatcher(
                datasetsApi.endpoints.getAllDatasets.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Failed to fetch datasets';
                }
            );

        // GET MY DATASETS QUERY
        builder
            .addMatcher(
                datasetsApi.endpoints.getMyDatasets.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = false;
                }
            )
            .addMatcher(
                datasetsApi.endpoints.getMyDatasets.matchFulfilled,
                (state, action: PayloadAction<IDatasetsResponse>) => {
                    state.loading = false;
                    state.datasets = action.payload;
                }
            )
            .addMatcher(
                datasetsApi.endpoints.getMyDatasets.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Failed to fetch datasets';
                }
            );


    },
});

export const { } = datasetSlice.actions;

export default datasetSlice.reducer;
