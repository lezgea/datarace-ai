import React from 'react';

export const RaceSelectSkeleton: React.FC = () => {
    return (
        <div className={`md:min-w-[250px] md:w-[250px] h-md px-6 py-5 flex rounded-2xl border border-gray-200 cursor-pointer shadow-sm transition-all duration-300 ease-in-out transform`}>
            <div className="flex-shrink-0 animate-pulse">
                {/* Skeleton for the Icon */}
                <div className="w-[40px] h-[40px] bg-gray-300 rounded-full"></div>
            </div>
            <div className="w-full flex flex-col px-4 justify-center">
                {/* Skeleton for the title */}
                <div className="w-full h-[16px] bg-gray-300 rounded mb-3 animate-pulse" />
                {/* Skeleton for the subtitle (competitionsCount) */}
                <div className="w-[60%] h-[12px] bg-gray-300 rounded animate-pulse" />
            </div>
        </div>
    );
}
