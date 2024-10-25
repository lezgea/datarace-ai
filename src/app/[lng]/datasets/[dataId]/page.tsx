"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import TabSelects from '@components/shared/tab-selects';
import { GeneralSection } from '@components/features/races/general-section';
import { DatasetsSection, RigthContent, ScoreBoardSection } from '@components/features';
import { useGetCompetitionInfoQuery } from '@api/competition-api';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useGetDatasetInfoQuery } from '@api/datasets-api';
import { UpdateDatasetSidebar } from '@components/features/datasets/update-dataset-sidebar';
import { DatasetFiles } from '@components/features/datasets/dataset-files';


const DatasetDetails: React.FC = () => {
    const t = useTranslations();
    const lng = useLocale();
    const params = useParams();
    const { dataId } = params;
    const datasetId = Array.isArray(dataId) ? dataId[0] : dataId;

    const [isSidebarOpen, setSidebarOpen] = React.useState<boolean>(false);
    const { data: datasetInfo, error, isLoading, refetch } = useGetDatasetInfoQuery({ id: dataId as string }, { skip: !dataId });


    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto py-[6rem] space-y-5">
                {/* Breadcrumb */}
                <div className="flex justify-between">
                    <nav className="text-sm flex justify-start items-center text-gray-600 space-x-3">
                        <Link href="/" className="hover:text-primaryLight">{t('mainPage')}</Link>
                        <span className="text-lg">&gt;</span>
                        <Link href={`/${lng}/datasets`} className="hover:text-primaryLight">{t('datasets')}</Link>
                        <span className="text-lg">&gt;</span>
                        <span>{datasetInfo?.title}</span>
                    </nav>

                    {
                        datasetInfo?.isEditable &&
                        <button
                            aria-label="Upload Dataset"
                            className="inline-flex w-auto text-center items-center px-6 py-2.5 text-white transition-all bg-gray-700 rounded-xl sm:w-auto hover:bg-dark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                            onClick={() => setSidebarOpen(true)}
                        >
                            Edit Dataset
                        </button>
                    }
                </div>

                <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>

                {/* Main Content */}
                <main id="#main-content" className="overflow-hidden space-y-5">
                    <section className="relative border rounded-2xl">
                        <img src={datasetInfo?.imageUrl || "/svg/noimg_large.svg"} alt="Race Image" className="w-full h-[20rem] rounded-2xl object-cover" />
                        <h1 className="absolute bottom-5 left-5 text-2xl font-regmed bg-primary px-7 py-2 rounded-lg backdrop-blur-xl bg-white/60">
                            {datasetInfo?.title}
                        </h1>
                    </section>

                    <section className="p-8 gap-8 rounded-2xl border border-gray-30">
                        <p>{datasetInfo?.description}</p>
                    </section>

                    <section>
                        <DatasetFiles
                            datasetId={datasetId}
                            isEditable={datasetInfo?.isEditable}
                            files={datasetInfo?.datasetFileDownloadDto}
                            refetch={refetch}
                        />
                    </section>
                </main>
            </div>

            <UpdateDatasetSidebar
                visible={isSidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
        </div>
    );
};

export default DatasetDetails;
