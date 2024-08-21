import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { Product } from './types/product-types';


export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: axiosBaseQuery({
        baseUrl: 'https://api.example.com/products',
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
