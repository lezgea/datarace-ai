"use client";

import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Metadata } from 'next';
import TabSelects from '@components/shared/tab-selects';
import { GeneralSection } from '@components/features/races/general-section';
import { Loader, Modal } from '@components/shared';
import { RigthContent } from '@components/features';
import { CompetitionsSection } from '@components/features/home';
import { useGetCompetitionInfoQuery } from '@api/competition-api';
import { useParams, useRouter } from 'next/navigation';

// export const metadata: Metadata = {
//     title: "Race Details | DataRace.ai",
//     description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
// };


const TABS: { title: string, content: ReactNode }[] = [
    {
        title: "General overview",
        content: <GeneralSection />,
    },
    {
        title: "Data",
        content: <div>Data</div>,
    },
    {
        title: "Rules",
        content: <div>Rules</div>,
    }
]

const RaceDetails: React.FC = () => {
    const params = useParams();
    const { raceId } = params;
    const competitionId = Array.isArray(raceId) ? raceId[0] : raceId;
    const { data: competitionInfo, error, isLoading, refetch } = useGetCompetitionInfoQuery({ id: competitionId as string }, { skip: !competitionId });


    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto py-[6rem] space-y-5">
                {/* Breadcrumb */}
                <nav className="text-sm flex justify-start items-center text-gray-600 space-x-3">
                    <Link href="/" className="hover:text-primaryLight">Main page</Link>
                    <span className="text-lg">&gt;</span>
                    <Link href="/races" className="hover:text-primaryLight">Races</Link>
                    <span className="text-lg">&gt;</span>
                    <span>{competitionInfo?.name}</span>
                </nav>

                <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>

                {/* Main Content */}
                <main id="#main-content" className="overflow-hidden space-y-5">
                    <section className="relative border rounded-2xl">
                        <img src={competitionInfo?.imageUrl || "/svg/noimg_large.svg"} alt="Race Image" className="w-full h-[20rem] rounded-2xl object-cover" />
                        <h1 className="absolute bottom-5 left-5 text-2xl font-regmed bg-primary px-7 py-2 rounded-lg backdrop-blur-xl bg-white/60">
                            {competitionInfo?.name}
                        </h1>
                    </section>

                    <section className="p-8 grid grid-cols-1 lg:grid-cols-4 gap-8 rounded-2xl border border-gray-30">
                        {/* Left Content */}
                        <div className="lg:col-span-3">
                            <TabSelects tabs={TABS} />
                        </div>

                        {/* Right Sidebar */}
                        <RigthContent raceId={competitionId} />
                    </section>

                    {/* <section className="container pt-20 px-auto space-y-10">
                        <CompetitionsSection />
                    </section> */}
                </main>
            </div>
        </div>
    );
};

export default RaceDetails;
