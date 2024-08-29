"use client";

import React from 'react';
import { Loader } from '@components/shared';
import Image from 'next/image';
import { BagIcon, LocationIcon } from '@assets/icons';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';
import getImgFromBase64 from '@utils/base64toImg';
import dynamic from 'next/dynamic';
import withProtectedRoute from '@utils/withProtectedRoute';


const RaceItem = dynamic(() => import('@components/shared/race-item').then(mod => mod.default), { ssr: false });


interface IRaceItemType {
    title: string,
    description: string,
    img: string,
    price: string,
    expiry_date: string | number,
}


const RACE_ITEMS: IRaceItemType[] = [
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
    const selectAuthData = createSelector(
        (state: RootState) => state.user.user,
        (state: RootState) => state.user.isAuthenticated,
        (state: RootState) => state.user.loading,
        (user, isAuthenticated, loading) => ({ user, isAuthenticated, loading })
    );

    const { user, isAuthenticated, loading } = useSelector(selectAuthData);

    const userImage = React.useMemo(
        () => (user?.profileImage ? getImgFromBase64(user.profileImage) : '/png/user.png'),
        [user?.profileImage]
    );

    // const [testLoading, setTestLoading] = React.useState<boolean>(true);

    // React.useEffect(() => {
    //     setTimeout(() => setTestLoading(false), 1000);
    // }, []);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen flex flex-col p-5">
            <main className="flex-grow py-20">
                <section className="container flex flex-col items-center justify-between space-y-7 mx-auto p-10 border border-gray-300 rounded-3xl lg:flex-row lg:space-x-10 lg:space-y-0">
                    <div className="relative w-[150px] h-[150px] min-w-[150px] min-h-[150px] rounded-full overflow-hidden border border-bg-gray-200">
                        <Image
                            src={userImage}
                            alt="Avatar"
                            layout="fill"
                            objectFit="cover"
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="w-full flex flex-col space-y-7 md:flex-row justify-start md:space-y-0">
                        <div className="w-full flex flex-col items-center md:items-start md:justify-end space-y-2">
                            <p className="text-[2rem] font-medium">{user?.fullName}</p>
                            <p className="text-md text-gray-500">@{user?.username}</p>
                            <p className="text-md text-gray-500">{user?.username}</p>
                        </div>
                        {/* <div className="w-full flex justify-center items-end md:justify-end">
                            <div className="flex flex-col items-center justify-end space-y-2 md:items-start">
                                <div className="flex space-x-3">
                                    <LocationIcon />
                                    <p className="text-md text-gray-500">Santa Clara, CA, USA</p>
                                </div>
                                <div className="flex space-x-3">
                                    <BagIcon />
                                    <p className="text-md text-gray-500">Project Manager at AILAB</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>
                <section className="container mx-auto pt-20 space-y-10">
                    <div className="flex justify-between content-center">

                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {
                            RACE_ITEMS.map((item, i) =>
                                <RaceItem key={i} {...item} />
                            )
                        }
                    </div>
                </section>
            </main>
        </div >
    );
};


export default withProtectedRoute(Profile);
