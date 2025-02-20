"use client";

import { useLazyGetAllBlogsQuery, useLazyGetMyBlogsQuery } from '@api/blogs-api';
import { AuthModal, TablePagination } from '@components/shared';
import BlogItem from '@components/shared/blog-item';
import CompetitionsSkeleton from '@components/shared/skeletons/competitions-skeleton';
import { RootState } from '@store/store';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';


interface IMyBlogTable {
    lng?: string,
    t?: (val: string) => string,
}

export const MyBlogTable: React.FC<IMyBlogTable> = () => {
    const t = useTranslations();
    const lng = useLocale();
    const router = useRouter();

    const [showAuthModal, setShowAuthModal] = React.useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElems, setTotalElems] = React.useState(1);
    const [triggerGetBlogs, { data: blogsData, error, isLoading }] = useLazyGetMyBlogsQuery();

    const itemsPerPage = 6;

    const onPageChange = (page: number) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    React.useEffect(() => {
        triggerGetBlogs({
            data: {
                page: currentPage,
                count: itemsPerPage,
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
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {blogsData?.userDatasets?.map((item) => (
                    <BlogItem key={item.id} {...item} />
                ))}
            </div>
            {/* Pagination Controls */
                !!blogsData?.totalElements && blogsData?.totalElements > itemsPerPage &&
                <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            }
            <AuthModal
                visible={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    );
};
