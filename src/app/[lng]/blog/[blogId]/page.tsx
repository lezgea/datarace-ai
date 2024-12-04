"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import TabSelects from '@components/shared/tab-selects';
import { GeneralSection } from '@components/features/races/general-section';
import { DatasetsSection, RigthContent, ScoreBoardSection } from '@components/features';
import { useGetCompetitionInfoQuery } from '@api/competition-api';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { CompetitionComments } from '@components/features/races/competition-comments';


const RaceDetails: React.FC = () => {
    const t = useTranslations();
    const lng = useLocale();
    const params = useParams();
    const { raceId } = params;
    const competitionId = Array.isArray(raceId) ? raceId[0] : raceId;
    const { data: competitionInfo, error, isLoading, refetch } = useGetCompetitionInfoQuery({ id: competitionId as string }, { skip: !competitionId });


    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto py-[6rem] space-y-5">
                <div className="flex justify-between">
                    {/* Breadcrumb */}
                    <nav className="text-sm flex justify-start items-center text-gray-600 space-x-3">
                        <Link href="/" className="hover:text-primaryLight">{t('mainPage')}</Link>
                        <span className="text-lg">&gt;</span>
                        <Link href={`/${lng}/blog`} className="hover:text-primaryLight">{t('blog')}</Link>
                        <span className="text-lg">&gt;</span>
                        <span>{competitionInfo?.name}</span>
                    </nav>

                    {
                        // datasetInfo?.isEditable &&
                        <div className='flex gap-3'>
                            <button
                                aria-label="Delete Dataset"
                                className="inline-flex w-auto text-center items-center px-6 py-2.5 text-white transition-all bg-red rounded-lg sm:w-auto hover:bg-dark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                            // onClick={() => setSidebarOpen(true)}
                            >
                                Delete
                            </button>
                            <button
                                aria-label="Update Blog"
                                className="inline-flex w-auto text-center items-center px-6 py-2.5 text-white transition-all bg-gray-700 rounded-lg sm:w-auto hover:bg-dark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                                onClick={() => { }}
                            >
                                Edit Blog
                            </button>
                        </div>
                    }
                </div>

                <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>

                {/* Main Content */}
                <main id="#main-content" className="space-y-5">
                    <section className="relative border rounded-2xl">
                        <img src={competitionInfo?.imageUrl || "/svg/dr_banner.svg"} alt="Blog Image" className="w-full h-[30rem] rounded-2xl object-cover" />
                        <h1 className="absolute w-full bottom-0 left-0 text-2xl text-white font-regmed px-7 py-2 backdrop-blur-xl bg-dark/30">
                            {/* {competitionInfo?.name} */}
                            Blog Title
                        </h1>
                    </section>

                    <section className="p-8 gap-8 rounded-2xl border border-gray-30">
                        {/* Left Content */}
                        {/* <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: competitionInfo?.text || '' }} /> */}
                        <p className='text-gray-700'>
                            Arcu dictumst ac imperdiet egestas scelerisque dui vitae turpis purus. Dui dui vel ultricies augue consectetur dignissim lectus senectus at. Placerat nulla pretium commodo lobortis nunc. Aliquam etiam pretium dictum mi arcu et a bibendum magna. Nec ac sed donec egestas nunc. Nisl vel lectus velit eu ac. Vestibulum justo faucibus arcu sodales cras placerat sagittis. Eros ut justo ullamcorper risus. Lectus feugiat ipsum neque viverra eget bibendum. Nisl et ipsum aenean pellentesque. Nunc quam urna mauris scelerisque malesuada aenean.
                            Turpis sed pretium sit magna. Nulla feugiat est nisl purus eros. Sagittis tempor accumsan id vitae ut. Facilisis tortor sed lacus est gravida
                            Arcu dictumst ac imperdiet egestas scelerisque dui vitae turpis purus. Dui dui vel ultricies augue consectetur dignissim lectus senectus at. Placerat nulla pretium commodo lobortis nunc. Aliquam etiam pretium dictum mi arcu et a bibendum magna. Nec ac sed donec egestas nunc. Nisl vel lectus velit eu ac. Vestibulum justo faucibus arcu sodales cras placerat sagittis. Eros ut justo ullamcorper risus. Lectus feugiat ipsum neque viverra eget bibendum. Nisl et ipsum aenean pellentesque. Nunc quam urna mauris scelerisque malesuada aenean.
                            Turpis sed pretium sit magna. Nulla feugiat est nisl purus eros. Sagittis tempor accumsan id vitae ut. Facilisis tortor sed lacus est gravida
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default RaceDetails;
