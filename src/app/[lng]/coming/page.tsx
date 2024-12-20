"use client";

import React, { Suspense, useState } from 'react';
import Image from 'next/image';
import { useLoginUserMutation } from '@api/user-api';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormInput, Loader } from '@components/shared';
import { toast } from 'react-toastify';
import { EmailIcon, EyeClosedIcon, EyeIcon, GoogleIcon, } from '@assets/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useLocale, useTranslations } from 'next-intl';


interface IFormInput {
    emailOrNickname: string;
    password: string;
    rememberMe?: boolean;
}


const ComingSoonContent: React.FC = () => {
    const t = useTranslations();
    const lng = useLocale();
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const selectAuthData = createSelector(
        (state: RootState) => state.user.isAuthenticated,
        (isAuthenticated) => ({ isAuthenticated })
    );

    const { isAuthenticated } = useSelector(selectAuthData);


    const validationSchema = Yup.object().shape({
        emailOrNickname: Yup.string().required(t('emailNicknameIsRequired')),
        password: Yup.string()
            .required(t('passwordIsRequired'))
            .min(3, t('atLeast3Characters')),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // RTK Query mutation hook
    const [loginUser, { isLoading, error }] = useLoginUserMutation();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            // Passing rememberMe along with the login data
            const payload = {
                ...data,
                rememberMe: data.rememberMe || false,
            };

            await loginUser(payload).unwrap();
            router.push('/');
        } catch (err: any) {
            if (err?.data?.code === "UNEXPECTED_EXCEPTION = USER_NOT_FOUND") {
                toast.error("User is not found");
            } else {
                toast.error(err.data?.message || 'An unexpected error occurred');
            }
        }
    };


    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };


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
                    <Link className="flex cursor-pointer justify-center mb-10" href={`/${lng}`}>
                        <Image src="/svg/datarace-logo.svg" alt="Logo" width={250} height={70} />
                    </Link>
                    <h1 className="text-4xl font-medium">{t('title')}</h1>
                    <p className="text-lg text-gray-500">{t('description')}</p>
                </div>
            </div>

            {/* Right side with form */}
            <div className="w-full lg:w-1/2 bg-white content-center py-[30px] lg:p-20 overflow-y-scroll">
                <div className="w-full mx-auto lg:max-w-md space-y-10 animate-right-svg">
                    <div>
                        <h2 className="text-[4rem] font-semi mb-4 text-center">{t('comingSoon')}</h2>
                    </div>
                    {
                        !isAuthenticated &&
                        <p className="mt-6 text-center font-light">
                            {t('dontHaveAnAccount')} <a href={`/${lng}/sign-up`} className="!text-primary font-semi hover:!text-primaryLight transition duration-200 ease-in-out transform">{t('signUp')}</a>
                        </p>
                    }
                </div>
            </div>
        </div>
    );
};

const ComingSoon: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <ComingSoonContent />
        </Suspense>
    )
}

export default ComingSoon;
