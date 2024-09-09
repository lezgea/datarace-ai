import dynamic from 'next/dynamic';
import React from 'react';

const RaceItem = dynamic(() => import('@components/shared/race-item').then(mod => mod.default), { ssr: false });


interface IRaceItemType {
    title: string;
    description: string;
    img: string;
    price: string;
    expiry_date: string;
}

const RACE_ITEMS: IRaceItemType[] = [
    {
        title: 'Euismod lacus eu leo arcu leo ultrices morbi nisl.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        img: '/png/pic1.png',
        price: '6000₼',
        expiry_date: 'Ends in 2 days',
    },
    {
        title: 'Auctor ut luctus euismod euismod quam ut sapien.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        img: '/png/pic2.png',
        price: '6000₼',
        expiry_date: 'Ends in 2 days',
    },
    {
        title: 'Euismod lacus eu leo arcu leo ultrices morbi nisl.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        img: '/png/pic3.png',
        price: '6000₼',
        expiry_date: 'Ends in 2 days',
    },
]

export const AttendedRaces: React.FC = () => {
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* {
                RACE_ITEMS.map((item, i) =>
                    <RaceItem key={i} {...item} />
                )
            } */}
        </div>
    )
}