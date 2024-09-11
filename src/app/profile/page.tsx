"use client";

import React, { useState } from 'react';
import { Loader, ProfileSectionSkeleton } from '@components/shared';
import Image from 'next/image';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';
import getImgFromBase64 from '@utils/base64toImg';
import withProtectedRoute from '@utils/withProtectedRoute';
import TabSelects from '@components/shared/tab-selects';
import { AccountSettings, AttendedRaces } from '@components/features';
import { useUploadAvatarMutation } from '@api/upload-api';
import { useUpdateUserMutation } from '@api/user-api';


const TABS: { title: string, content: React.ReactNode }[] = [
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
    {
        title: "Settings",
        content: <AccountSettings />,
    },
];


const Profile: React.FC = () => {
    const [hovering, setHovering] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

    const selectAuthData = createSelector(
        (state: RootState) => state.user.user,
        (state: RootState) => state.user.isAuthenticated,
        (state: RootState) => state.user.loading,
        (user, isAuthenticated, loading) => ({ user, isAuthenticated, loading })
    );
    const [updateUser, { isLoading: updateLoading, isError: updateError, data }] = useUpdateUserMutation();

    const { user, isAuthenticated, loading } = useSelector(selectAuthData);

    const userImage = React.useMemo(
        () => (user?.profileImage ? getImgFromBase64(user.profileImage) : '/svg/user.svg'),
        [user?.profileImage]
    );

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (!uploadedFile) {
            setErrorMessage("Please select a file to upload.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", uploadedFile);

            let response = await uploadAvatar({ file: formData }).unwrap();
            await updateUser({
                id: user?.id || '',
                data: {
                    profileFileId: response?.id,
                    fullName: user?.fullName,
                    email: user?.email,
                    nickname: user?.nickname,
                    phoneNumber: user?.phoneNumber,
                }
            }).unwrap();

            setErrorMessage(null);
        } catch (error) {
            setErrorMessage("Profile image upload failed.");
        }
    };

    if (loading || !isAuthenticated) {
        return <ProfileSectionSkeleton />;
    }

    return (
        <div className="min-h-screen flex flex-col p-5">
            <main className="flex-grow py-20">
                <section className="container flex flex-col items-center justify-between space-y-7 mx-auto p-10 border border-gray-300 rounded-3xl lg:flex-row lg:space-x-10 lg:space-y-0">
                    <div
                        className="relative w-[150px] h-[150px] min-w-[150px] min-h-[150px] rounded-full overflow-hidden border border-bg-gray-200"
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                    >
                        <Image
                            src={userImage}
                            alt="Avatar"
                            layout="fill"
                            objectFit="cover"
                            className="object-cover"
                            priority
                        />

                        {hovering && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                {/* Label makes the hover area clickable */}
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer bg-none text-white text-xs px-4 py-2 border border-1 border-white rounded-full"
                                >
                                    {isLoading ? 'Uploading...' : 'Upload Image'}
                                </label>
                            </div>
                        )}

                        {/* Invisible input */}
                        <input
                            id="image-upload"
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/png, image/jpeg"
                            onChange={handleImageChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="w-full flex flex-col space-y-5 md:flex-row justify-start md:space-y-0">
                        <div className="w-full flex flex-col items-center md:items-start md:justify-end space-y-1">
                            <p className="text-[2rem] font-medium">{user?.fullName}</p>
                            <p className="text-md text-gray-500">{user?.email}</p>
                            <p className="text-md text-gray-500">@{user?.nickname}</p>
                        </div>
                    </div>
                </section>

                {/* Show error message if invalid file */}
                {errorMessage && (
                    <div className="text-red-500 text-center mt-4">
                        {errorMessage}
                    </div>
                )}

                <section className="container mx-auto py-10 space-y-5">
                    <TabSelects tabs={TABS} />
                </section>
            </main>
        </div>
    );
};

export default withProtectedRoute(Profile);
