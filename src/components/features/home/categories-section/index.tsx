"use client";

import dynamic from 'next/dynamic';
import React from 'react';
import { useGetCategoriesQuery } from '@api/category-api';

const RaceSelect = dynamic(() => import('@components/shared/race-select').then(mod => mod.default), { ssr: false });

interface IRaceType {
    id: number,
    name: string,
    competitionsCount: number,
    children: IRaceType[],
    type?: string,
}

type RaceSelectsType = IRaceType[];


export const CategoriesSection: React.FC = () => {
    const { data: categories, error, isLoading } = useGetCategoriesQuery();

    if (isLoading) return <p>Loading categories...</p>;
    if (error) return <p>Error loading categories</p>;

    return (
        <div className="container mx-auto flex flex-col justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            {categories && categories.map((item: IRaceType, i: number) => (
                <RaceSelect key={i} {...item} type={item.name} />
            ))}
        </div>
    );
};
