import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { IDataset, IDatasetCreateRequest, IDatasetInfoRequest, IDatasetsRequest, IDatasetsResponse, IDatasetUpdateRequest } from './types/dataset-types';
import { IMessageResponse } from './types/competition-types';


export const datasetsApi = createApi({
    reducerPath: 'datasetsApi',
    baseQuery: axiosBaseQuery,
    tagTypes: ['AllDatasets', 'MyDatasets', 'DatasetInfo'],
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
        getDatasetInfo: builder.query<IDataset, IDatasetInfoRequest>({
            query: ({ id }) => ({
                url: `/datasets/${id}`,
                method: 'GET',
            }),
            providesTags: ['DatasetInfo'],
        }),
        updateDataset: builder.mutation<IMessageResponse, IDatasetUpdateRequest>({
            query: (data) => ({
                url: `/datasets/${data.dataId}`,
                method: 'PUT',
                data: data,
            }),
            invalidatesTags: ['DatasetInfo'],
        }),
        deleteDataset: builder.mutation<void, { id: number | string }>({
            query: ({ id }) => ({
                url: `/files/dataset/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['DatasetInfo'],
        }),
    }),
});

export const {
    useLazyGetAllDatasetsQuery,
    useLazyGetMyDatasetsQuery,
    useCreateDatasetMutation,
    useGetDatasetInfoQuery,
    useUpdateDatasetMutation,
    useDeleteDatasetMutation,
} = datasetsApi;