"use client";

import { useGetRelatedBlogsQuery, useLazyGetAllBlogsQuery } from '@api/blogs-api';
import { useLazyGetCompetitionsQuery } from '@api/competition-api';
import { AuthModal } from '@components/shared';
import BlogItem from '@components/shared/blog-item';
import RaceItem from '@components/shared/race-item';
import CompetitionsSkeleton from '@components/shared/skeletons/competitions-skeleton';
import { RootState } from '@store/store';
import { useLocale, useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';



interface IRelatedBlogProps {
    lng?: string,
    t?: (val: string) => string,
}

export const RelatedBlog: React.FC<IRelatedBlogProps> = () => {

    const params = useParams();
    let { blogId } = params;

    const { isAuthenticated } = useSelector((state: RootState) => state.user);
    // const { loading: competitionLoading } = useSelector((state: RootState) => state.competitions);

    const [showAuthModal, setShowAuthModal] = React.useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const { data: blogsData, error, isLoading } = useGetRelatedBlogsQuery({
        data: { page: 0, count: 3 },
        id: blogId as string
    });

    const itemsPerPage = 3;


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


    if (!blogsData?.length) return null;

    return (
        <>
            <h2 className="text-[1.7rem] leading-[2.5rem] md:text-[2.5rem] font-semibold mb-4">
                Related Blogs
            </h2>
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
