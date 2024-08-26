import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { Product } from './types/product-types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL + '/v1',
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => ({
                url: '/',
                method: 'GET',
            }),
        }),
        getProductById: builder.query<Product, string>({
            query: (productId) => ({
                url: `/${productId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
