import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@utils/axiosBaseQuery';
import { IBlogCreateRequest, IBlogCreateResponse, IBlogInfoRequest, IBlogInfoResponse, IBlogListRequest, IBlogListResponse, IBlogUpdateRequest, IRelatedBlogListRequest, IRelatedBlogListResponse } from './types/blog-types';


export const blogsApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: axiosBaseQuery,
    tagTypes: ['Blogs', 'BlogInfo', 'RelatedBlogs'],
    endpoints: (builder) => ({
        createBlog: builder.mutation<IBlogCreateResponse, IBlogCreateRequest>({
            query: (data) => ({
                url: `/blogs`,
                method: 'POST',
                data: data,
            }),
            invalidatesTags: ['Blogs'],
        }),
        getAllBlogs: builder.query<IBlogListResponse, IBlogListRequest>({
            query: ({ data }) => ({
                url: `/blogs/public/page`,
                method: 'GET',
                params: {
                    page: data.page,
                    count: data.count,
                },
            }),
            providesTags: ['Blogs'],
        }),
        getMyBlogs: builder.query<IBlogListResponse, IBlogListRequest>({
            query: ({ data }) => ({
                url: `/blogs/public/page`,
                method: 'GET',
                params: {
                    page: data.page,
                    count: data.count,
                    isMyBlog: true,
                },
            }),
            providesTags: ['Blogs'],
        }),
        getBlogInfo: builder.query<IBlogInfoResponse, IBlogInfoRequest>({
            query: ({ id }) => ({
                url: `/blogs/info/${id}`,
                method: 'GET',
            }),
            providesTags: ['BlogInfo'],
        }),
        updateBlog: builder.mutation<null, IBlogUpdateRequest>({
            query: (data) => ({
                url: `/blogs/${data.id}`,
                method: 'PUT',
                data: data,
            }),
            invalidatesTags: ['BlogInfo', 'RelatedBlogs'],
        }),
        getRelatedBlogs: builder.query<IRelatedBlogListResponse, IRelatedBlogListRequest>({
            query: ({ id }) => ({
                url: `/blogs/tags/${id}`,
                method: 'GET',
            }),
            providesTags: ['RelatedBlogs'],
        }),
        deleteBlog: builder.mutation<void, { id: number | string }>({
            query: ({ id }) => ({
                url: `/blogs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Blogs'],
        }),
    }),
});

export const {
    useCreateBlogMutation,
    useLazyGetAllBlogsQuery,
    useLazyGetMyBlogsQuery,
    useGetBlogInfoQuery,
    useUpdateBlogMutation,
    useGetRelatedBlogsQuery,
    useDeleteBlogMutation,
} = blogsApi;
