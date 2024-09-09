"use client";

import React from 'react';
import { Loader, ProfileSectionSkeleton } from '@components/shared';
import Image from 'next/image';
import { BagIcon, LocationIcon } from '@assets/icons';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';
import getImgFromBase64 from '@utils/base64toImg';
import withProtectedRoute from '@utils/withProtectedRoute';
import TabSelects from '@components/shared/tab-selects';
import { AccountSettings, AttendedRaces } from '@components/features';


const TABS: { title: string, content: React.ReactNode }[] = [
    {
        title: "Settings",
        content: <AccountSettings />,
    },
    {
        title: "Attended races",
        content: <AttendedRaces />,
    },
    {
        title: "Bookmark",
        content: <div>Bookmark</div>,
    },
    {
        title: "Submitted projects",
        content: <div>Submitted projects</div>,
    },
]


const Profile: React.FC = () => {
    const selectAuthData = createSelector(
        (state: RootState) => state.user.user,
        (state: RootState) => state.user.isAuthenticated,
        (state: RootState) => state.user.loading,
        (user, isAuthenticated, loading) => ({ user, isAuthenticated, loading })
    );

    const { user, isAuthenticated, loading } = useSelector(selectAuthData);

    const userImage = React.useMemo(
        () => (user?.profileImage ? getImgFromBase64(user.profileImage) : '/svg/user.svg'),
        [user?.profileImage]
    );

    if (loading || !isAuthenticated)
        return <ProfileSectionSkeleton />;

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
                    <div className="w-full flex flex-col space-y-5 md:flex-row justify-start md:space-y-0">
                        <div className="w-full flex flex-col items-center md:items-start md:justify-end space-y-1">
                            <p className="text-[2rem] font-medium">{user?.fullName}</p>
                            <p className="text-md text-gray-500">{user?.email}</p>
                            <p className="text-md text-gray-500">@{user?.nickname}</p>
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
                <section className="container mx-auto py-10 space-y-5">
                    <TabSelects tabs={TABS} />
                </section>
            </main>
        </div >
    );
};


export default withProtectedRoute(Profile);
