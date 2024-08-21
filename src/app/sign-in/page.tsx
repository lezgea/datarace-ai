"use client";
import React, { useState } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { useLoginUserMutation } from '@store/slices';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormInput } from '@components/shared';
import { toast } from 'react-toastify';
import { DataraceLogo, EmailIcon, EyeClosedIcon, EyeIcon, GoogleIcon, } from '@assets/icons';


interface IFormInput {
    email: string;
    password: string;
}


const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(3, 'Password must be at least 3 characters')
        .required('Password is required'),
});


const SignIn: React.FC = () => {
    // React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    // RTK Query mutation hook
    const [loginUser, { isLoading, error }] = useLoginUserMutation();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            await loginUser(data).unwrap();
            // Handle successful login here (e.g., navigate to another page)
        } catch (err) {
            toast.error(`${err}`)
        }
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

    // if (isLoading) return <div>mdmdmdmdm</div>


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
                <div className="w-full mx-auto lg:max-w-md space-y-10">
                    <a className="flex items-center lg:hidden justify-center cursor-pointer mb-[50px]" href="/">
                        <Image src="/svg/datarace-logo.svg" alt="Logo" width={250} height={70} />
                    </a>
                    <div>
                        <h2 className="text-2xl font-bold mb-4 lg:text-start text-center">Log in</h2>
                        <p className="mb-4 text-sm text-gray-600 lg:text-start text-center">Enter your email and password to log in</p>
                    </div>
                    <form className="space-y-5 select-none" onSubmit={handleSubmit(onSubmit)}>
                        <FormInput
                            label='E-mail*'
                            type='email'
                            name='email'
                            placeholder="example@company.com"
                            register={register}
                            errors={errors}
                            icon={<EmailIcon />}
                        />
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
                        <div className="flex justify-between items-center pb-4 pt-1 select-none">
                            <label className="inline-flex items-center cursor-pointer">
                                {/* Hidden native checkbox */}
                                <input
                                    type="checkbox"
                                    className="hidden peer"
                                />
                                {/* Custom checkbox */}
                                <span className="w-6 h-6 rounded-lg border-2 border-gray-300 flex items-center justify-center bg-white peer-checked:bg-blue-400 peer-checked:border-transparent transition-colors duration-200">
                                    {/* Checkmark Icon */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-4 h-4 text-white hidden peer-checked:block"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <span className="ml-2 text-gray-700">Remember me</span>
                            </label>
                            <a href="#" className="!text-gray-700 font-medium hover:!text-blue-500 active:!text-blue-500 transition duration-200 ease-in-out transform">Forget password</a>
                        </div>
                        <button
                            type="submit"
                            className="w-full h-[50px] bg-primary text-white py-2 rounded-xl ring-2 ring-primary hover:bg-primaryDark hover:ring-primaryDark focus:outline-none focus:ring-2 focus:ring-primaryDark transition duration-200 ease-in-out transform"
                        >
                            Login
                        </button>
                        <div className="text-center my-4">Or</div>
                        <button
                            type="button"
                            className="w-full h-[50px] bg-none text-primary py-2 rounded-xl hover:bg-black ring-2 ring-primary hover:ring-black hover:text-white hover:shadow-lg hover:shadow-neutral-300 hover:outline-none hover:-tranneutral-y-px focus:shadow-none focus:outline-none focus:ring-2 focus:ring-black flex items-center justify-center space-x-2 transition duration-200 ease-in-out transform"
                        >
                            <GoogleIcon />
                            <span>Login with Google</span>
                        </button>
                    </form>
                    <p className="mt-6 text-center font-light">
                        Don't have an account? <a href="/sign-up" className="!text-gray-700 font-medium hover:!text-blue-500 active:!text-blue-500 transition duration-200 ease-in-out transform">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
