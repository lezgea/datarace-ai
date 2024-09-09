import { CompetitionInfoSectionSkeleton } from '@components/shared';
import { RootState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';


export const GeneralSection: React.FC = () => {
    const { loading: competitionLoading, competitionInfo } = useSelector((state: RootState) => state.competitions);

    if (competitionLoading) return <CompetitionInfoSectionSkeleton />

    return (
        <>
            {/* Description */}
            <div className="space-y-4" >
                <h2 className="text-lg font-semibold">Description</h2>
                <p className="text-gray-700 font-light">{competitionInfo?.text}</p>
            </div >

            {/* Accordion (Evaluation, FAQ, Citation) */}
            <div className="mt-8 space-y-4" >
                <div>
                    <button className="w-full flex justify-between items-center text-lg text-left font-semibold">
                        Evaluation <span>+</span>
                    </button>
                </div>
                <div>
                    <button className="w-full flex justify-between items-center text-lg text-left font-semibold">
                        FAQ <span>+</span>
                    </button>
                </div>
                <div>
                    <button className="w-full flex justify-between items-center text-lg text-left font-semibold">
                        Citation <span>+</span>
                    </button>
                </div>
            </div>
        </>
    )
}