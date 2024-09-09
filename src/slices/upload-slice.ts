import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uploadApi } from '@api/upload-api';
import { toast } from 'react-toastify';

interface IUploadState {
    loading: boolean;
    progress: number;
    error?: string | boolean;
    success?: string | boolean;
    message?: string;
}

const initialState: IUploadState = {
    loading: false,
    progress: 0,
    error: false,
    success: false,
    message: '',
};

const uploadSlice = createSlice({
    name: 'uploads',
    initialState,
    reducers: {
        // This can be used to manually reset or update progress if needed
        setUploadProgress: (state, action: PayloadAction<number>) => {
            state.progress = action.payload;
        },
    },
    extraReducers: (builder) => {
        // UPLOAD RESULT MUTATION
        builder
            .addMatcher(
                uploadApi.endpoints.uploadResult.matchPending,
                (state) => {
                    state.loading = true;
                    state.progress = 0;
                    state.error = false;
                    state.success = false;
                }
            )
            .addMatcher(
                uploadApi.endpoints.uploadResult.matchFulfilled,
                (state, action) => {
                    state.loading = false;
                    state.progress = 100;
                    state.success = true;
                    state.message = "Solution uploaded successfully!";
                }
            )
            .addMatcher(
                uploadApi.endpoints.uploadResult.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.progress = 0;
                    state.error = action.error?.message || 'Failed to upload solution';
                    toast.error(state.error, { position: "bottom-left" });
                }
            );
    },
});

export const { setUploadProgress } = uploadSlice.actions;

export default uploadSlice.reducer;
