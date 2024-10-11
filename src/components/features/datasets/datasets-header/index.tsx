"use client";

import React from 'react';
import { CreateDatasetSidebar } from '../create-dataset-sidebar';
import { useTranslations } from 'next-intl';



export const DatasetsHeaderSection = () => {
    const t = useTranslations();
    const [isSidebarOpen, setSidebarOpen] = React.useState<boolean>(false);

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="text-start space-y-3">
                    <h2 className="text-[32px] md:text-[2.3rem]">{t('datasets')}</h2>
                    <p className="text-md text-gray-700">{t('competitionDescription')}</p>
                </div>
                <button
                    className="inline-flex w-auto text-center items-center px-6 py-3 text-white transition-all bg-primary rounded-xl sm:w-auto hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                    aria-label="Upload Dataset"
                    onClick={() => setSidebarOpen(true)}
                >
                    {t('createDataset')}
                </button>
            </div>
            <CreateDatasetSidebar
                visible={isSidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
        </>
    )
}