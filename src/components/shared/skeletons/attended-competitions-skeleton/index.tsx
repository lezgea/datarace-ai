import React from 'react';
import Skeleton from '../skeleton';
import RaceItemSkeleton from '../race-item-skeleton';

const AttendedCompetitionsSkeleton: React.FC = () => {
    return (
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {Array.from({ length: 6 }).map((_, i) => <RaceItemSkeleton key={i} />)}
            </div>
            <div className="flex justify-center mt-5">
                <Skeleton width="150px" height="40px" className="rounded-xl" />
            </div>
        </>
    );
};

export default AttendedCompetitionsSkeleton;
