"use client";

import { useLazyGetCompetitionsQuery } from '@api/competition-api';
import { AuthModal } from '@components/shared';
import RaceItem from '@components/shared/race-item';
import CompetitionsSkeleton from '@components/shared/skeletons/competitions-skeleton';
import { RootState } from '@store/store';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';



interface ICompetitionsTable {
    lng?: string,
    t?: (val: string) => string,
}

export const CompetitionsTable: React.FC<ICompetitionsTable> = () => {
    const t = useTranslations();
    const lng = useLocale();
    const router = useRouter();

    const { isAuthenticated } = useSelector((state: RootState) => state.user);
    const { selectedCategory, loading: categoryLoading } = useSelector((state: RootState) => state.categories);
    const { loading: competitionLoading } = useSelector((state: RootState) => state.competitions);

    const [showAuthModal, setShowAuthModal] = React.useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [triggerGetCompetitions, { data: competitionsData, error, isLoading }] = useLazyGetCompetitionsQuery();

    const itemsPerPage = 6;

    const CATEGORY_LABELS: Record<number, string> = {
        1: t('all'),
        2: "Environment",
        3: "Education",
        4: "Oil & Industry",
        5: "Technology",
    };


    const onClickCompetition = (id: string | number) => {
        if (isAuthenticated) {
            router.push(`/${lng}/races/${id}`)
        } else {
            setShowAuthModal(true)
        }
    }


    React.useEffect(() => {
        triggerGetCompetitions({
            categoryId: selectedCategory,
            data: { page: currentPage, count: itemsPerPage },
        }).then((response) => {
            if (response?.data?.totalCount) {
                setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
            } else {
                setTotalPages(1)
            }
        });
    }, [currentPage, selectedCategory, triggerGetCompetitions]);


    React.useEffect(() => {
        setCurrentPage(0);
    }, [selectedCategory]);

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

    if (categoryLoading || competitionLoading || isLoading) {
        return <CompetitionsSkeleton />;
    }


    return (
        <>
            <div className="flex justify-between mb-10">
                <div className="w-full space-y-3">
                    <h2 className="text-[32px] md:text-[2.3rem]">{CATEGORY_LABELS[selectedCategory]} <span className="font-medium">{t('competitions')}</span></h2>
                    <p className="text-md text-gray-700">{t('competitionDescription')}</p>
                </div>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {competitionsData?.competitions?.map((item, i) => (
                    <RaceItem
                        key={i}
                        {...item}
                        onClick={() => onClickCompetition(item.id)}
                    />
                ))}
            </div>

            {/* Pagination Controls */
                !!competitionsData?.totalCount &&
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 0}
                        className={`px-4 py-2 rounded-md ${currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white hover:bg-primaryDark'}`}
                    >
                        {t('previous')}
                    </button>
                    <span>{t('page')} {currentPage + 1} of {totalPages}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage >= totalPages - 1}
                        className={`px-4 py-2 rounded-md ${currentPage >= totalPages - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white hover:bg-primaryDark'}`}
                    >
                        {t('next')}
                    </button>
                </div>
            }
            <AuthModal
                visible={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </>
    );
};
