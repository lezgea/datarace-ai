import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { CategoriesResponse } from './types/category-types';


export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        getCategories: builder.query<CategoriesResponse, void>({
            query: () => ({
                url: '/categories/all',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetCategoriesQuery,
} = categoryApi;
