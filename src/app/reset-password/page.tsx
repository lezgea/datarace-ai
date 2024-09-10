"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useChangePasswordMutation, useLoginUserMutation } from '@api/user-api';
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


interface IFormInput {
    password: string;
    confirmation: string;
}

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password is required')
        .min(3, 'Password must be at least 3 characters'),
    confirmation: Yup.string()
        .required('Password confirmation is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
});


const ResetPassword: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const selectAuthData = createSelector(
        (state: RootState) => state.user.isAuthenticated,
        (isAuthenticated) => ({ isAuthenticated })
    );

    const { isAuthenticated } = useSelector(selectAuthData);

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // RTK Query mutation hook
    const [changePassword, { isLoading, error }] = useChangePasswordMutation();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            if (token) {
                const payload = {
                    ...data,
                    token: token,
                };

                await changePassword(payload).unwrap();
                router.push('/');
            }
        } catch (err: any) {
            if (err?.data?.code === "UNEXPECTED_EXCEPTION = USER_NOT_FOUND") {
                toast.error("Something went wrong");
            } else {
                toast.error(err.data?.message || 'An unexpected error occurred');
            }
        }
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };


    if (isLoading) return <Loader />

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
                    <a className="flex cursor-pointer justify-center mb-10" href="/">
                        <Image src="/svg/datarace-logo.svg" alt="Logo" width={250} height={70} />
                    </a>
                    <h1 className="text-4xl font-medium">Join the race to AI excellence</h1>
                    <p className="text-lg text-gray-500">DataRace is an innovative platform designed to bring data scientists and Al enthusiasts together to compete in data-driven challenges.</p>
                </div>
            </div>

            {/* Right side with form */}
            <div className="w-full lg:w-1/2 bg-white content-center px-8 py-[30px] lg:p-20 overflow-y-scroll">
                <div className="w-full mx-auto lg:max-w-md space-y-10 animate-right-svg">
                    <Link className="flex items-center lg:hidden justify-center cursor-pointer mb-[50px]" href="/">
                        <Image src="/svg/datarace-logo.svg" alt="Logo" width={250} height={70} priority />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-semi mb-4 lg:text-start text-center">Change Password</h2>
                        <p className="mb-4 text-sm text-gray-600 lg:text-start text-center">Enter your new password</p>
                    </div>
                    <form className="space-y-5 select-none" onSubmit={handleSubmit(onSubmit)}>
                        <FormInput
                            label='Password*'
                            type={showPassword ? "text" : "password"}
                            name='password'
                            placeholder="Enter password"
                            register={register}
                            errors={errors}
                            onClickIcon={togglePasswordVisibility}
                            icon={showPassword ? <EyeIcon /> : <EyeClosedIcon />}
                        />
                        <FormInput
                            label='Confirm Password*'
                            type={showPassword ? "text" : "password"}
                            name='confirmation'
                            placeholder="Enter password"
                            register={register}
                            errors={errors}
                            onClickIcon={togglePasswordVisibility}
                            icon={showPassword ? <EyeIcon /> : <EyeClosedIcon />}
                        />
                        <button
                            type="submit"
                            className="w-full h-[50px] font-regmed bg-primary text-white mt-4 py-2 rounded-xl ring-2 ring-primary hover:bg-primaryDark hover:ring-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:outline-none focus:ring-2 focus:ring-primaryDark focus:shadow-none transition duration-200 ease-in-out transform"
                        >
                            Change Password
                        </button>
                    </form>
                    <p className="mt-6 text-center font-light">
                        Don't have an account? <a href="/sign-up" className="!text-gray-700 font-semi hover:!text-primaryLight transition duration-200 ease-in-out transform">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
