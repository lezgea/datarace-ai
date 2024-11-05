"use client";

import React from 'react';
import { CreateDatasetSidebar } from '../create-dataset-sidebar';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';



export const DatasetsHeaderSection = () => {
    const t = useTranslations();
    const [isSidebarOpen, setSidebarOpen] = React.useState<boolean>(false);
    const { isAuthenticated } = useSelector((state: RootState) => state.user);

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="text-start space-y-3">
                    <h2 className="text-[32px] md:text-[2.3rem]">{t('datasets')}</h2>
                    <p className="text-md text-gray-700">{t('competitionDescription')}</p>
                </div>
                {
                    isAuthenticated &&
                    <button
                        className="inline-flex w-auto text-center items-center px-6 py-2.5 text-white transition-all bg-gray-700 rounded-lg sm:w-auto hover:bg-dark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                        aria-label="Upload Dataset"
                        onClick={() => setSidebarOpen(true)}
                    >
                        {t('createDataset')}
                    </button>
                }
            </div>
            <CreateDatasetSidebar
                visible={isSidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
        </>
    )
}