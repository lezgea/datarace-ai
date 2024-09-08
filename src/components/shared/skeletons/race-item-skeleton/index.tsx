import React from 'react';
import Skeleton from '../skeleton';


const RaceItemSkeleton: React.FC = () => {
    return (
        <div>
            <Skeleton width="100%" height="200px" className="rounded-md" />
            <div className="p-8 space-y-4">
                <Skeleton width="75%" height="24px" className="rounded-md" />
                <Skeleton width="100%" height="16px" className="rounded-md" />
                <Skeleton width="90%" height="16px" className="rounded-md" />
            </div>
        </div>
    );
};

export default RaceItemSkeleton;
