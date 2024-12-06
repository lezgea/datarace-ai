"use client";

import { useGetRelatedBlogsQuery, useLazyGetAllBlogsQuery } from '@api/blogs-api';
import { useLazyGetCompetitionsQuery } from '@api/competition-api';
import { AuthModal } from '@components/shared';
import BlogItem from '@components/shared/blog-item';
import RaceItem from '@components/shared/race-item';
import CompetitionsSkeleton from '@components/shared/skeletons/competitions-skeleton';
import { RootState } from '@store/store';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';



interface IRelatedBlogProps {
    lng?: string,
    t?: (val: string) => string,
}

export const RelatedBlog: React.FC<IRelatedBlogProps> = () => {
    const t = useTranslations();
    const lng = useLocale();
    const router = useRouter();

    const { isAuthenticated } = useSelector((state: RootState) => state.user);
    // const { loading: competitionLoading } = useSelector((state: RootState) => state.competitions);

    const [showAuthModal, setShowAuthModal] = React.useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const { data: blogsData, error, isLoading } = useGetRelatedBlogsQuery({ id: 6 });

    const itemsPerPage = 6;


    // React.useEffect(() => {
    //     triggerGetBlogs({
    //         // categoryId: selectedCategory,
    //         data: {
    //             page: currentPage,
    //             count: itemsPerPage,
    //             blogCriteria: {
    //                 "content": "string",
    //                 "isMyBlog": true
    //             }
    //         },
    //     }).then((response) => {
    //         console.log("@@@@@", response)
    //         // if (response?.totalElements) {
    //         //     setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
    //         // } else {
    //         //     setTotalPages(1)
    //         // }
    //     });
    // }, [currentPage, triggerGetBlogs]);


    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    if (isLoading) {
        return <CompetitionsSkeleton />;
    }


    return (
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {blogsData?.map((item) => (
                    <BlogItem key={item.id} {...item} />
                ))}
            </div>

            {/* Pagination Controls */
                // !!competitionsData?.totalCount &&
                // <div className="flex justify-between items-center mt-6">
                //     <button
                //         onClick={handlePreviousPage}
                //         disabled={currentPage === 0}
                //         className={`px-4 py-2 rounded-md ${currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white hover:bg-primaryDark'}`}
                //     >
                //         {t('previous')}
                //     </button>
                //     <span>{t('page')} {currentPage + 1} of {totalPages}</span>
                //     <button
                //         onClick={handleNextPage}
                //         disabled={currentPage >= totalPages - 1}
                //         className={`px-4 py-2 rounded-md ${currentPage >= totalPages - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white hover:bg-primaryDark'}`}
                //     >
                //         {t('next')}
                //     </button>
                // </div>
            }
            <AuthModal
                visible={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    );
};
