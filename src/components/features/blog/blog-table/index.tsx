"use client";

import { useLazyGetAllBlogsQuery } from '@api/blogs-api';
import { useLazyGetCompetitionsQuery } from '@api/competition-api';
import { AuthModal, TablePagination } from '@components/shared';
import BlogItem from '@components/shared/blog-item';
import RaceItem from '@components/shared/race-item';
import CompetitionsSkeleton from '@components/shared/skeletons/competitions-skeleton';
import { RootState } from '@store/store';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';


const TEST_BLOGS = [
    {
        id: 1,
        image: '/png/pic1.png',
        title: 'Test Blog 1',
        date: '06.11.2024',
    },
    {
        id: 2,
        image: '/png/pic2.png',
        title: 'Test Blog 2',
        date: '06.11.2024',
    },
    {
        id: 3,
        image: null,
        title: 'Test Blog 3',
        date: '06.11.2024',
    },
    {
        id: 4,
        image: '/png/pic4.png',
        title: 'Test Blog 4',
        date: '06.11.2024',
    },
    {
        id: 5,
        image: '/png/pic5.png',
        title: 'Test Blog 5',
        date: '06.11.2024',
    },
    {
        id: 6,
        image: '/png/pic6.png',
        title: 'Test Blog 6',
        date: '06.11.2024',
    },
]

interface IBlogTable {
    lng?: string,
    hidePagination?: boolean,
    t?: (val: string) => string,
}

export const BlogTable: React.FC<IBlogTable> = (props) => {
    let { hidePagination } = props;
    const t = useTranslations();
    const lng = useLocale();
    const router = useRouter();

    const { isAuthenticated } = useSelector((state: RootState) => state.user);

    const [showAuthModal, setShowAuthModal] = React.useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElems, setTotalElems] = React.useState(1);
    const [triggerGetBlogs, { data: blogsData, error, isLoading }] = useLazyGetAllBlogsQuery();

    const itemsPerPage = 6;

    const onPageChange = (page: number) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    React.useEffect(() => {
        triggerGetBlogs({
            data: {
                page: currentPage,
                count: itemsPerPage,
                blogCriteria: {
                    "content": "string",
                    "isMyBlog": true
                }
            },
        }).then((response) => {
            if (response?.data?.totalElements) {
                setTotalPages(Math.ceil(response.data.totalElements / itemsPerPage));
                setTotalElems(response?.data?.totalElements);
            } else {
                setTotalPages(1)
            }
        });
    }, [currentPage, triggerGetBlogs]);


    if (isLoading) {
        return <CompetitionsSkeleton />;
    }


    return (
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3  mb-10">
                {blogsData?.userDatasets?.map((item) => (
                    <BlogItem key={item.id} {...item} />
                ))}
            </div>
            {/* Pagination Controls */
                !hidePagination && !!blogsData?.totalElements && blogsData?.totalElements > itemsPerPage &&
                <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            }
            <AuthModal
                visible={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    );
};
