"use client";

import React, { useState } from 'react';
import { useLazyGetAllDatasetsQuery, useLazyGetMyDatasetsQuery } from '@api/datasets-api';
import { RootState } from '@store/store';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import CompetitionsSkeleton from '@components/shared/skeletons/competitions-skeleton';
import DatasetItem from '@components/shared/dataset-item';
import { NoData } from '@components/shared';



interface ICompetitionsTable {
    lng?: string,
    t?: (val: string) => string,
}

export const MyDatasetsTable: React.FC<ICompetitionsTable> = () => {
    const t = useTranslations();

    const { loading: datasetsLoading } = useSelector((state: RootState) => state.datasets);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [triggerGetDatasets, { data: datasetsData, error, isLoading }] = useLazyGetMyDatasetsQuery();

    const itemsPerPage = 6;

    React.useEffect(() => {
        triggerGetDatasets({
            data: { page: currentPage, count: itemsPerPage },
        }).then((response) => {
            if (response?.data?.totalCount) {
                setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
            } else {
                setTotalPages(1)
            }
        });
    }, [currentPage, triggerGetDatasets]);


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

    console.log('$$$$$$', datasetsData)

    if (datasetsLoading || isLoading) {
        return <CompetitionsSkeleton />;
    }

    if (!datasetsLoading && !isLoading && !datasetsData?.userDatasets?.length) {
        return <NoData />
    }

    return (
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {datasetsData?.userDatasets?.map((item, i) => (
                    <DatasetItem key={i} {...item} />
                ))}
            </div>

            {/* Pagination Controls */
                !!datasetsData?.totalCount &&
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
        </>
    );
};
