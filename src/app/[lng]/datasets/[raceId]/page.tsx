"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import TabSelects from '@components/shared/tab-selects';
import { GeneralSection } from '@components/features/races/general-section';
import { DatasetsSection, RigthContent, ScoreBoardSection } from '@components/features';
import { useGetCompetitionInfoQuery } from '@api/competition-api';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';


const DatasetDetails: React.FC = () => {
    const t = useTranslations();
    const lng = useLocale();
    const params = useParams();
    const { raceId } = params;
    const competitionId = Array.isArray(raceId) ? raceId[0] : raceId;
    const { data: competitionInfo, error, isLoading, refetch } = useGetCompetitionInfoQuery({ id: competitionId as string }, { skip: !competitionId });



    const TABS: { title: string, content: ReactNode }[] = [
        {
            title: t('data'),
            content: <DatasetsSection />,
        },
        {
            title: t('generalOverview'),
            content: <GeneralSection />,
        },
        {
            title: t('rules'),
            content: <div>Rules</div>,
        },
        {
            title: t('scoreBoard'),
            content: <ScoreBoardSection />,
        },
    ]


    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto py-[6rem] space-y-5">
                {/* Breadcrumb */}
                <nav className="text-sm flex justify-start items-center text-gray-600 space-x-3">
                    <Link href="/" className="hover:text-primaryLight">{t('mainPage')}</Link>
                    <span className="text-lg">&gt;</span>
                    <Link href={`/${lng}/datasets`} className="hover:text-primaryLight">{t('datasets')}</Link>
                    <span className="text-lg">&gt;</span>
                    <span>Test Dataset</span>
                </nav>

                <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>

                {/* Main Content */}
                <main id="#main-content" className="overflow-hidden space-y-5">
                    <section className="relative border rounded-2xl">
                        <img src={competitionInfo?.imageUrl || "/svg/noimg_large.svg"} alt="Race Image" className="w-full h-[20rem] rounded-2xl object-cover" />
                        <h1 className="absolute bottom-5 left-5 text-2xl font-regmed bg-primary px-7 py-2 rounded-lg backdrop-blur-xl bg-white/60">
                            Test Dataset
                        </h1>
                    </section>

                    <section className="p-8 gap-8 rounded-2xl border border-gray-30">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </section>
                    <button
                        className="inline-flex w-auto text-center items-center px-6 py-3 text-white transition-all bg-primary rounded-xl sm:w-auto hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                        aria-label="Upload Dataset"
                    >
                        {t('downloadDataset')}
                    </button>
                </main>
            </div>
        </div>
    );
};

export default DatasetDetails;
