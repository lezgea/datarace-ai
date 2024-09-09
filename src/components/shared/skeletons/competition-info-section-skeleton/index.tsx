import React from 'react';
import Skeleton from '../skeleton';

export const CompetitionInfoSectionSkeleton: React.FC = () => {
    return (
        <>
            {/* Description Skeleton */}
            <div className="space-y-4">
                <Skeleton width="150px" height="24px" className="rounded-md" />
                <Skeleton width="100%" height="16px" className="rounded-md" />
                <Skeleton width="100%" height="16px" className="rounded-md" />
                <Skeleton width="80%" height="16px" className="rounded-md" />
            </div>

            {/* Accordion Skeleton (Evaluation, FAQ, Citation) */}
            <div className="mt-8 space-y-4">
                <Skeleton width="100%" height="40px" className="rounded-md" />
                <Skeleton width="100%" height="40px" className="rounded-md" />
                <Skeleton width="100%" height="40px" className="rounded-md" />
            </div>
        </>
    );
};

export default CompetitionInfoSectionSkeleton;
