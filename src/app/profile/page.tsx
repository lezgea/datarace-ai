"use client";

import React, { useState, useEffect } from 'react';
import { Loader, RaceItem } from '@components/shared';
import Image from 'next/image';
import { BagIcon, LocationIcon } from '@assets/icons';


interface RaceItemType {
    title: string,
    description: string,
    img: string,
    price: string,
    expiry_date: string | number,
}


const RACE_ITEMS: RaceItemType[] = [
    {
        title: 'Elektrik kəsintiləri',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor adipiscing elit, sed do eiusmod tempor ',
        img: '/png/pic2.png',
        price: '6000 ₼',
        expiry_date: 'Ends in 2 days',
    },
    {
        title: 'Kitablardan ekranlara keçid',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
        img: '/png/pic3.png',
        price: '6000 ₼',
        expiry_date: 'Ends in 2 days',
    },
    {
        title: 'Qlobal istiləşmə',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
        img: '/png/pic4.png',
        price: '6000 ₼',
        expiry_date: 'Ends in 2 days',
    },
];


const Profile: React.FC = () => {
    const [testLoading, setTestLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setTestLoading(false), 1000);
    }, []);

    if (testLoading) return <Loader />;

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow py-20">
                <section className="container flex items-center justify-between mx-auto p-10 border border-gray-300 rounded-3xl space-x-10">
                    <div className="relative w-[150px] h-[150px] min-w-[150px] min-h-[150px] rounded-full overflow-hidden border border-bg-gray-200">
                        <Image
                            src="/png/pic1.png"
                            alt="Avatar"
                            layout="fill"
                            objectFit="cover"
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="w-full flex">
                        <div className="w-full flex flex-col justify-end space-y-2">
                            <p className="text-[2rem] font-medium">Mike Wiseman</p>
                            <p className="text-md text-gray-500">@username45</p>
                            <p className="text-md text-gray-500">mike.wiseman@gmail.com</p>
                        </div>
                        <div className="w-[40%] flex flex-col justify-end space-y-2">
                            <div className="flex space-x-3">
                                <LocationIcon />
                                <p className="text-md text-gray-500">Santa Clara, CA, USA</p>
                            </div>
                            <div className="flex space-x-3">
                                <BagIcon />
                                <p className="text-md text-gray-500">Project Manager at AILAB</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container mx-auto pt-20 space-y-10">
                    <div className="flex justify-between content-center">

                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
                        {
                            RACE_ITEMS.map((item, i) =>
                                <RaceItem key={i} {...item} />
                            )
                        }
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Profile;
