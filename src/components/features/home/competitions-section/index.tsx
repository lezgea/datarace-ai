"use client";

import { useLazyGetCompetitionsQuery } from '@api/competition-api';
import RaceItem from '@components/shared/race-item';
import CompetitionsSkeleton from '@components/shared/skeletons/competitions-skeleton';
import { RootState } from '@store/store';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';


const CATEGORY_LABELS: Record<number, string> = {
    1: "All",
    2: "Environment",
    3: "Education",
    4: "Oil & Industry",
    5: "Technology",
};

export const CompetitionsSection: React.FC = () => {
    const { selectedCategory, loading: categoryLoading } = useSelector((state: RootState) => state.categories);
    const { loading: competitionLoading } = useSelector((state: RootState) => state.competitions);
    const [triggerGetCompetitions, { data: competitionsData, error, isLoading }] = useLazyGetCompetitionsQuery();


    React.useEffect(() => {
        triggerGetCompetitions({
            categoryId: selectedCategory,
            data: { page: 0, count: 6 },
        });
    }, [selectedCategory, triggerGetCompetitions]);

    if (categoryLoading || competitionLoading)
        return <CompetitionsSkeleton />


    return (
        <>
            <div className="flex justify-between">
                <div className="w-full space-y-3">
                    <h2 className="text-[32px] md:text-[2.3rem]">{CATEGORY_LABELS[selectedCategory]} <span className="font-medium">Competitions</span></h2>
                    <p className="text-md text-gray-700">Get ready for an exciting race</p>
                </div>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {competitionsData?.competitions?.map((item, i) => (
                    <RaceItem key={i} {...item} />
                ))}
            </div>
            <div className="flex justify-center">
                <Link href="/races" className="inline-flex w-auto text-center font-medium items-center px-6 py-3 text-gray-900 transition-all dark:bg-white dark:text-gray-800 rounded-xl sm:w-auto hover:bg-primaryDark hover:text-white hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 dark:shadow-neutral-700 focus:shadow-none">
                    All races
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </>
    )
}