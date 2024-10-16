import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { IDatasetCreateRequest, IDatasetsRequest, IDatasetsResponse } from './types/dataset-types';
import { IMessageResponse } from './types/competition-types';


export const datasetsApi = createApi({
    reducerPath: 'datasetsApi',
    baseQuery: axiosBaseQuery,
    tagTypes: ['AllDatasets', 'MyDatasets'],
    endpoints: (builder) => ({
        getAllDatasets: builder.query<IDatasetsResponse, IDatasetsRequest>({
            query: ({ data }) => ({
                url: `/datasets/users/page?isMyDataset=false`,
                method: 'GET',
                params: { page: data.page, count: data.count },
            }),
            providesTags: ['AllDatasets'],
        }),
        getMyDatasets: builder.query<IDatasetsResponse, IDatasetsRequest>({
            query: ({ data }) => ({
                url: `/datasets/users/page?isMyDataset=true`,
                method: 'GET',
                params: { page: data.page, count: data.count },
            }),
            providesTags: ['MyDatasets'],
        }),
        createDataset: builder.mutation<IMessageResponse, IDatasetCreateRequest>({
            query: (data) => ({
                url: `/datasets`,
                method: 'POST',
                data: data,
            }),
            invalidatesTags: ['AllDatasets', 'MyDatasets'],
        }),
    }),
});

export const {
    useLazyGetAllDatasetsQuery,
    useLazyGetMyDatasetsQuery,
    useCreateDatasetMutation,
} = datasetsApi;
