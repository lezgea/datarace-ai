"use client";

import React from 'react';
import Skeleton from '../skeleton';


export const ProfileSectionSkeleton: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col p-5">
            <main className="flex-grow py-20">
                <section className="container flex flex-col items-center justify-between space-y-7 mx-auto p-10 border border-gray-300 rounded-3xl lg:flex-row lg:space-x-10 lg:space-y-0">
                    <div className="relative w-[150px] h-[150px] min-w-[150px] min-h-[150px] rounded-full overflow-hidden border border-bg-gray-200">
                        {/* Circular skeleton for the avatar */}
                        <Skeleton circle={true} height={150} width={150} />
                    </div>
                    <div className="w-full flex flex-col space-y-5 md:flex-row justify-start md:space-y-0">
                        <div className="w-full flex flex-col items-center md:items-start md:justify-end space-y-4">
                            {/* Skeletons for the text elements */}
                            <Skeleton width={250} height={30} />
                            <Skeleton width={200} height={15} />
                            <Skeleton width={100} height={15} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}