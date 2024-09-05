"use client";

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FailedOperation, SuccessfullOperation } from '@components/features/activation';
import { useActivateUserQuery } from '@api/user-api';
import { Loader } from '@components/shared';
import { useSearchParams } from 'next/navigation';


enum ErrorType {
    EXCEED_REQUEST_COUNT = "EXCEED_REQUEST_COUNT",
    NOT_FOUND = "NOT_FOUND"
}

const errorMessages = {
    [ErrorType.EXCEED_REQUEST_COUNT]: "You have reached your request limit. Please wait for an hour before trying again.",
    [ErrorType.NOT_FOUND]: "Your token has expired. Please register your account again to obtain a new one."
};

interface ApiError {
    error: ErrorType;
    message: string;
}

const ActivationPageContent: React.FC = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const { data, error, isLoading } = useActivateUserQuery(
        { token: token || "" },
        { skip: !token }
    );

    const apiError = (error as { data?: ApiError } | undefined)?.data;
    const errorMessage = apiError && errorMessages[apiError.error];

    if (isLoading) return <Loader />;

    return (
        <div className="min-h-screen max-h-screen flex">
            {/* Left side with image */}
            <div className="w-full lg:w-1/2 relative hidden lg:block">
                <Image
                    src="/png/login.png"
                    alt="Team Photo"
                    layout="fill"
                    objectFit="cover"
                    className="h-full"
                    priority
                />
                <div className="absolute column w-full h-full content-end text-center px-20 py-[10%] space-y-7">
                    <Link className="flex cursor-pointer justify-center mb-10" href="/">
                        <Image src="/svg/datarace-logo.svg" alt="Logo" width={250} height={70} />
                    </Link>
                    <h1 className="text-4xl font-medium">Join the race to AI excellence</h1>
                    <p className="text-lg text-gray-500">DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.</p>
                </div>
            </div>

            {/* Right side with form */}
            <div className="w-full lg:w-1/2 bg-white content-center px-8 py-[30px] lg:p-20 overflow-y-scroll">
                {errorMessage && <FailedOperation message={errorMessage} />}
                {data && <SuccessfullOperation />}
            </div>
        </div>
    );
};

const Activation: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <ActivationPageContent />
        </Suspense>
    );
};

export default Activation;
