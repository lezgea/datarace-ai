"use client";

import { CompetitionInfoSectionSkeleton } from '@components/shared';
import { RootState } from '@store/store';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState, Suspense } from 'react';
import { useSelector } from 'react-redux';


export const GeneralSection: React.FC = () => {
    const t = useTranslations();
    const { loading: competitionLoading, competitionInfo } = useSelector((state: RootState) => state.competitions);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);  // This ensures the code runs only on the client side
    }, []);

    if (!isClient) return null; // Avoid rendering on the server to prevent mismatch

    if (competitionLoading) return <CompetitionInfoSectionSkeleton />

    return (
        <Suspense fallback={<CompetitionInfoSectionSkeleton />}>
            {/* Description */}
            <div className="space-y-4" >
                <h2 className="text-lg font-semibold">Description</h2>
                <p className="text-gray-700 font-light">{competitionInfo?.text}</p>
            </div>

            {/* Accordion (Evaluation, FAQ, Citation) */}
            <div className="mt-8 space-y-4" >
                <div>
                    <button className="w-full flex justify-between items-center text-lg text-left font-semibold">
                        {t('evaluation')} <span>+</span>
                    </button>
                </div>
                <div>
                    <button className="w-full flex justify-between items-center text-lg text-left font-semibold">
                        {t('faq')} <span>+</span>
                    </button>
                </div>
                <div>
                    <button className="w-full flex justify-between items-center text-lg text-left font-semibold">
                        {t('citation')} <span>+</span>
                    </button>
                </div>
            </div>
        </Suspense>
    )
}
