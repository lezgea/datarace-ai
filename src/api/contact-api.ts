import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { IContactDetailsSendRequest } from './types/contact-types';
import { IMessageResponse } from './types/competition-types';


export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: axiosBaseQuery,
    tagTypes: ['Contacts'],
    endpoints: (builder) => ({
        sendContactDetails: builder.mutation<IMessageResponse, IContactDetailsSendRequest>({
            query: (credentials) => ({
                url: '/contacts',
                method: 'POST',
                data: credentials,
            }),
        }),
    }),
});

export const {
    useSendContactDetailsMutation,
} = contactsApi;
