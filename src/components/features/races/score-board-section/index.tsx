"use client";

import { ArchitectIcon, ExplorerIcon, InnovatorIcon } from '@assets/icons';
import { CompetitionInfoSectionSkeleton } from '@components/shared';
import { RootState } from '@store/store';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState, Suspense } from 'react';
import { useSelector } from 'react-redux';


const data = [
    {
        id: 1,
        branch: '1',
        user: { name: 'John Doe', img: '' },
        level: <ArchitectIcon className="h-10 w-10" />,
        membership: '3 month',
        role: 'role'
    },
    {
        id: 2,
        branch: '2',
        user: { name: 'Jane Smith', img: '' },
        level: <ExplorerIcon className="h-10 w-10" />,
        membership: '3 month',
        role: 'role'
    },
    {
        id: 3,
        branch: '3',
        user: { name: 'Bob Johnson', img: '' },
        level: <InnovatorIcon className="h-10 w-10" />,
        membership: '3 month',
        role: 'role'
    },
];

export const ScoreBoardSection: React.FC = () => {
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
            <div className='flex gap-5 mb-5'>
                <div className='flex inline-flex items-center border border-gray-300 rounded-2xl py-4 px-5 gap-3'>
                    <ExplorerIcon />
                    <div>
                        <h3 className='font-semibold text-lg'>Explorer</h3>
                        <p className='text-sm'>180 racer</p>
                    </div>
                </div>
                <div className='flex inline-flex items-center border border-gray-300 rounded-2xl py-4 px-5 gap-3'>
                    <InnovatorIcon />
                    <div>
                        <h3 className='font-semibold text-lg'>Innovator</h3>
                        <p className='text-sm'>180 racer</p>
                    </div>
                </div>
                <div className='flex inline-flex items-center border border-gray-300 rounded-2xl py-4 px-5 gap-3'>
                    <ArchitectIcon />
                    <div>
                        <h3 className='font-semibold text-lg'>Architect</h3>
                        <p className='text-sm'>180 racer</p>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-600 rounded-lg overflow-hidden">
                    {/* Table Header */}
                    <thead className="text-gray-600">
                        <tr>
                            <th className="py-3 px-6 text-left font-semibold">Branch</th>
                            <th className="py-3 px-6 text-left font-semibold">Name</th>
                            <th className="py-3 px-6 text-left font-semibold">Level</th>
                            {/* <th className="py-3 px-6 text-left font-semibold">Membership</th> */}
                            <th className="py-3 px-6 text-left font-semibold">Role</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={row.id}
                                className={`border-t border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    }`}
                            >
                                <td className="py-3 px-6">{row.branch}</td>
                                <td className="py-3 px-6">{row.user.name}</td>
                                <td className="py-3 px-6">{row.level}</td>
                                {/* <td className="py-3 px-6">{row.membership}</td> */}
                                <td className="py-3 px-6">{row.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Suspense>
    )
}
