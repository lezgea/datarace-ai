import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({
        baseUrl: 'https://beta.datarace.ai/v1',
    }),
    endpoints: () => ({}),  // Start with an empty endpoints function
});
