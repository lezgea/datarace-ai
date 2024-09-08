"use client";

import dynamic from 'next/dynamic';
import React from 'react';
import { useGetCategoriesQuery } from '@api/category-api';
import { RaceSelectSkeleton } from '@components/shared';
import RaceSelect from '@components/shared/race-select';

// const RaceSelect = dynamic(() => import('@components/shared/race-select').then(mod => mod.default), { ssr: false });

interface IRaceType {
    id: number,
    name: string,
    competitionsCount: number,
    children: IRaceType[],
    type?: string,
}

export const CategoriesSection: React.FC = () => {
    const { data: categories, error, isLoading } = useGetCategoriesQuery();


    if (isLoading) {
        return (
            <div className="container mx-auto flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                {[...Array(5)].map((index) => (
                    <RaceSelectSkeleton key={index} />
                ))}
            </div>
        );
    }

    return (
        <div className="container mx-auto flex flex-col justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            {categories && categories.map((item: IRaceType, i: number) => (
                <RaceSelect key={i} {...item} type={item.name} />
            ))}
        </div>
    );
};
