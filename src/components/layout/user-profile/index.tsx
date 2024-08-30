"use client";

import { useGetUserQuery, useLogoutUserMutation } from '@api/user-api';
import { UserProfileSkeleton } from '@components/shared';
import Divider from '@components/shared/divider';
import { Dropdown } from '@components/shared/dropdown';
import { createSelector } from '@reduxjs/toolkit';
import { logout } from '@slices/user-slice';
import { RootState } from '@store/store';
import getImgFromBase64 from '@utils/base64toImg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


const DROPDOWN_MENU: { route: string; label: string }[] = [
    { route: '/profile', label: 'Profile' },
    { route: '/races', label: 'Races' },
];


export const UserProfile: React.FC = () => {
    const [logoutUser, { isLoading, isError, error }] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const router = useRouter();

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


    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            router.push('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const DropdownContent = (
        <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu" className="w-40">
            {DROPDOWN_MENU.map((item, index) => (
                <Link
                    key={index}
                    href={item.route}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md transition-all duration-200 ease-in-out"
                    role="menuitem"
                >
                    {item.label}
                </Link>
            ))}
            <Divider />
            <button onClick={handleLogout} disabled={isLoading} className="flex w-full text-sm text-medium text-center justify-center px-5 py-2 text-gray-500 transition-all bg-gray-100 rounded-lg hover:bg-primaryDark hover:text-white shadow-neutral-300 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                Sign Out
            </button>
        </div>
    );

    if (loading) {
        return <UserProfileSkeleton />;
    }

    if (!isAuthenticated) {
        return (
            <Link href="/sign-in">
                <button type="button" className="inline-flex w-auto text-center items-center px-5 py-2 text-white transition-all bg-primary rounded-lg sm:w-auto hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                    Sign In
                </button>
            </Link>
        );
    }

    return (
        <Dropdown content={DropdownContent}>
            <div className="flex items-center cursor-pointer group select-none">
                <div className="hidden md:flex text-gray-600 font-regmed mr-3 group-hover:text-primary transition-all duration-200 ease-in-out">{user?.fullName}</div>
                <div className="relative w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-full overflow-hidden">
                    <Image
                        src={userImage}
                        alt="Avatar"
                        fill
                        sizes="(max-width: 768px) 10vw, (max-width: 1200px) 10vw, 10vw"
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
            </div>
        </Dropdown>
    );
};
