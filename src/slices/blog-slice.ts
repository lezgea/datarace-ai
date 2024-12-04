import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlog, IBlogCreateResponse } from '@api/types/blog-types';
import { blogsApi } from '@api/blogs-api';


interface IBlogState {
    blogs: IBlog | {},
    loading: boolean,
    error?: string | boolean,
    success?: string | boolean,
    message?: string,
}

const initialState: IBlogState = {
    blogs: {},
    loading: false,
    error: false,
    success: false,
    message: '',
};

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        // setSelectedCategory: (state, action: PayloadAction<number>) => {
        //     state.selectedCategory = action.payload;
        // },
    },
    extraReducers: (builder) => {
        // CREATE BLOG MUTATION
        builder
            .addMatcher(
                blogsApi.endpoints.createBlog.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = false;
                }
            )
            .addMatcher(
                blogsApi.endpoints.createBlog.matchFulfilled,
                (state, action: PayloadAction<IBlogCreateResponse>) => {
                    state.loading = false;
                    state.blogs = action.payload?.data;
                }
            )
            .addMatcher(
                blogsApi.endpoints.createBlog.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Failed to create blog';
                }
            );

        // // DELETE DATASET
        // builder
        //     .addMatcher(
        //         datasetsApi.endpoints.deleteDataset.matchPending,
        //         (state) => {
        //             state.loading = true;
        //         }
        //     )
        //     .addMatcher(
        //         datasetsApi.endpoints.deleteDataset.matchFulfilled,
        //         (state, action) => {
        //             state.loading = false;
        //             toast.success('Dataset has been deleted successfully');
        //         }
        //     )
        //     .addMatcher(
        //         datasetsApi.endpoints.deleteDataset.matchRejected,
        //         (state, action) => {
        //             state.loading = false;
        //             state.error = action.error?.message || 'Failed to delete dataset';
        //             toast.error('Unable to delete this dataset');
        //         }
        //     );

    },
});

export const { } = blogSlice.actions;

export default blogSlice.reducer;
