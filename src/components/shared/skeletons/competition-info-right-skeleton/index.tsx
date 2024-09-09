"use lcient";

import React from 'react';
import Skeleton from '../skeleton';


export const CompetitionInfoRightSkeleton: React.FC = () => {
    return (
        <div className="space-y-7">
            {/* Prize Skeleton */}
            <div className="space-y-2">
                <div className="flex space-x-3 mb-5">
                    <div className="h-[30px] w-[2px] bg-primaryLight" />
                    <span className="text-xl font-medium">Prize</span>
                </div>
                <Skeleton width="60%" height="60px" className="rounded-xl" />
                <Skeleton width="100%" height="50px" className="rounded-xl" />
            </div>

            {/* Tags Skeleton */}
            <div className="space-y-2">
                <div className="flex space-x-3 mb-5">
                    <div className="h-[30px] w-[2px] bg-primaryLight" />
                    <span className="text-xl font-medium">Tags</span>
                </div>
                <div className="space-y-2 space-x-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            width="100px"
                            height="40px"
                            className="inline-block rounded-full"
                        />
                    ))}
                </div>
            </div>

            {/* Table of Content Skeleton */}
            <div className="flex flex-col space-y-3">
                <div className="flex space-x-3 mb-3">
                    <div className="h-[30px] w-[2px] bg-primaryLight" />
                    <span className="text-xl font-medium">Table of content</span>
                </div>
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-center space-x-3">
                        <Skeleton width="20px" height="20px" className="rounded-full" />
                        <Skeleton width="120px" height="20px" className="rounded-md" />
                    </div>
                ))}
            </div>

            {/* Join Button Skeleton */}
            <Skeleton width="100%" height="50px" className="rounded-lg" />
        </div>
    );
};
