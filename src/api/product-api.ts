import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { IProduct } from './types/product-types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL + '/v1',
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => ({
                url: '/',
                method: 'GET',
            }),
        }),
        getProductById: builder.query<IProduct, string>({
            query: (productId) => ({
                url: `/${productId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
