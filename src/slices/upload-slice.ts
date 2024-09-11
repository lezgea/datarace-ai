import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uploadApi } from '@api/upload-api';
import { toast } from 'react-toastify';

interface IUploadState {
    loading: boolean;
    progress: number;
    id: number,
    error?: string | boolean;
    success?: string | boolean;
    message?: string;
}

const initialState: IUploadState = {
    loading: false,
    progress: 0,
    id: 0,
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
        // SAVE RESULT MUTATION
        builder
            .addMatcher(
                uploadApi.endpoints.saveResult.matchPending,
                (state) => {
                    state.loading = true;
                    state.progress = 0;
                    state.error = false;
                    state.success = false;
                }
            )
            .addMatcher(
                uploadApi.endpoints.saveResult.matchFulfilled,
                (state, action) => {
                    state.loading = false;
                    state.progress = 100;
                    state.success = true;
                    state.message = "Solution has been saved successfully!";
                }
            )
            .addMatcher(
                uploadApi.endpoints.saveResult.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.progress = 0;
                    state.error = action.error?.message || 'Failed to save the solution';
                    toast.error(state.error, { position: "bottom-left" });
                }
            );

        // GET RESULT QUERY
        builder
            .addMatcher(
                uploadApi.endpoints.getResult.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = false;
                    state.success = false;
                }
            )
            .addMatcher(
                uploadApi.endpoints.getResult.matchFulfilled,
                (state, action) => {
                    state.loading = false;
                    state.success = true;
                }
            )
            .addMatcher(
                uploadApi.endpoints.getResult.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Failed to fetch solution';
                }
            );

        // DOWNLOAD RESULT QUERY
        builder
            .addMatcher(
                uploadApi.endpoints.downloadResult.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = false;
                    state.success = false;
                }
            )
            .addMatcher(
                uploadApi.endpoints.downloadResult.matchFulfilled,
                (state, action) => {
                    state.loading = false;
                    state.success = true;
                    state.message = "Solution has been downloaded successfully!";
                    toast.success(state.message, { position: "bottom-left" })
                }
            )
            .addMatcher(
                uploadApi.endpoints.downloadResult.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Failed to download the solution';
                    toast.error(state.error, { position: "bottom-left" });
                }
            );

        // SUBMIT RESULT QUERY
        builder
            .addMatcher(
                uploadApi.endpoints.submitResult.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = false;
                    state.success = false;
                }
            )
            .addMatcher(
                uploadApi.endpoints.submitResult.matchFulfilled,
                (state, action) => {
                    state.loading = false;
                    state.success = true;
                    state.message = "Solution has been submitted successfully!";
                    toast.success(state.message, { position: "bottom-left" })
                }
            )
            .addMatcher(
                uploadApi.endpoints.submitResult.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Failed to submit the solution';
                    toast.error(state.error, { position: "bottom-left" });
                }
            );

        // UPLOAD AVATAR MUTATION
        builder
            .addMatcher(
                uploadApi.endpoints.uploadAvatar.matchPending,
                (state) => {
                    state.loading = true;
                    state.progress = 0;
                    state.error = false;
                    state.success = false;
                }
            )
            .addMatcher(
                uploadApi.endpoints.uploadAvatar.matchFulfilled,
                (state, action) => {
                    state.loading = false;
                    state.progress = 100;
                    state.success = true;
                    state.message = "Profile Image has been uploaded!";
                    toast.success("Profile Image has been uploaded!")
                }
            )
            .addMatcher(
                uploadApi.endpoints.uploadAvatar.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.progress = 0;
                    state.error = action.error?.message || 'Failed to upload solution';
                    toast.error(state.error);
                }
            );
    },
});

export const { setUploadProgress } = uploadSlice.actions;

export default uploadSlice.reducer;
