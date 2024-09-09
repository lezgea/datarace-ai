import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { categoryApi } from '../api/category-api';
import { CategoriesResponse, ICategory } from '@api/types/category-types';

interface ICategoryState {
    categories: ICategory[] | null;
    selectedCategory: number,
    loading: boolean;
    error: string | null;
}

const initialState: ICategoryState = {
    categories: null,
    selectedCategory: 1,
    loading: true,
    error: null,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<number>) => {
            state.selectedCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        // GET CATEGORIES QUERY
        builder
            .addMatcher(
                categoryApi.endpoints.getCategories.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                categoryApi.endpoints.getCategories.matchFulfilled,
                (state, action: PayloadAction<CategoriesResponse>) => {
                    state.loading = false;
                    state.categories = action.payload;
                }
            )
            .addMatcher(
                categoryApi.endpoints.getCategories.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Failed to fetch categories';
                }
            );
    },
});

export const { setSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
