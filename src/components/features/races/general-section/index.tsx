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
            <div className='space-y-10'>
                {/* Description */}
                <div className="space-y-4" >
                    <h2 className="text-lg text-primary font-semibold">{t('descriptionLabel')}</h2>
                    <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: competitionInfo?.text || '' }} />
                </div>
                {
                    !!competitionInfo?.rules &&
                    <div className="space-y-4" >
                        <h3 className="text-lg text-primary font-semibold">{t('rules')}</h3>
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: competitionInfo?.rules }} />
                    </div>
                }
            </div>
        </Suspense>
    )
}
