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
]

const Profile: React.FC = () => {
    const [hovering, setHovering] = useState(false);  // State to manage hover effect
    const [selectedFile, setSelectedFile] = useState<File | null>(null);  // State for selected image file
    const [errorMessage, setErrorMessage] = useState<string | null>(null);  // State for error messages

    const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();  // Use the mutation hook

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

    // Function to handle file selection and upload
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];

            // Validate file type
            if (!validTypes.includes(file.type)) {
                setErrorMessage('Only PNG and JPG files are allowed.');
                setSelectedFile(null);
                return;
            }

            setSelectedFile(file);
            setErrorMessage(null); // Reset error message if file is valid

            // Upload the image
            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await uploadAvatar({ file: formData }).unwrap();
                console.log('Image uploaded successfully:', response);
                setErrorMessage(null);
            } catch (error) {
                setErrorMessage('Failed to upload the image. Please try again.');
                console.error('Error during upload:', error);
            }
        }
    };

    if (loading || !isAuthenticated)
        return <ProfileSectionSkeleton />;

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
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg"
                                >
                                    {isLoading ? 'Uploading...' : 'Upload Image'}
                                </label>
                                <input
                                    id="image-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/png, image/jpeg"
                                    onChange={handleImageChange}
                                    disabled={isLoading}
                                />
                            </div>
                        )}
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
        </div >
    );
};

export default withProtectedRoute(Profile);
