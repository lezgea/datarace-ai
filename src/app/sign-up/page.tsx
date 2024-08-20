"use client";
import React, { useState } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';


const SignUp: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);


    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side with image */}
            <div className="w-full lg:w-1/2 relative hidden lg:block">
                <Image
                    src="/png/login.png"
                    alt="Team Photo"
                    layout="fill"
                    objectFit="cover"
                    className="h-full"
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
            <div className="w-full lg:w-1/2 bg-white content-center px-8 py-[30px] lg:p-20">
                <div className="w-full mx-auto lg:max-w-md space-y-10">
                    <a className="flex items-center lg:hidden justify-center cursor-pointer mb-[50px]" href="/">
                        <Image src="/svg/datarace-logo.svg" alt="Logo" width={250} height={70} />
                    </a>
                    <div>
                        <h2 className="text-2xl font-bold mb-4 lg:text-start text-center">Register with email</h2>
                        <p className="mb-4 text-sm text-gray-600 lg:text-start text-center">Enter your email and password to sign up</p>
                    </div>
                    <form className="space-y-5">
                        <div className="relative mb-4">
                            <label htmlFor="fullname" className="block text-gray-700 mb-2">Full Name*</label>
                            <input
                                type="fullname"
                                id="fullname"
                                placeholder="Enter your full name"
                                className="w-full h-[50px] bg-gray-50 px-5 py-2 pr-12 border rounded-xl hover:outline-none hover:ring-1 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out transform"
                            />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">E-mail*</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="example@company.com"
                                className="w-full h-[50px] bg-gray-50 px-5 py-2 pr-12 border rounded-xl hover:outline-none hover:ring-1 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out transform"
                            />
                            <div className="absolute h-[50px] right-5 bottom-0 flex items-center pointer-events-none">
                                {/* Email Icon */}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Icon">
                                        <path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M9.94358 3.25H14.0564C15.8942 3.24998 17.3498 3.24997 18.489 3.40314C19.6614 3.56076 20.6104 3.89288 21.3588 4.64124C22.1071 5.38961 22.4392 6.33856 22.5969 7.51098C22.75 8.65019 22.75 10.1058 22.75 11.9436V12.0564C22.75 13.8942 22.75 15.3498 22.5969 16.489C22.4392 17.6614 22.1071 18.6104 21.3588 19.3588C20.6104 20.1071 19.6614 20.4392 18.489 20.5969C17.3498 20.75 15.8942 20.75 14.0564 20.75H9.94359C8.10583 20.75 6.65019 20.75 5.51098 20.5969C4.33856 20.4392 3.38961 20.1071 2.64124 19.3588C1.89288 18.6104 1.56076 17.6614 1.40314 16.489C1.24997 15.3498 1.24998 13.8942 1.25 12.0564V11.9436C1.24998 10.1058 1.24997 8.65019 1.40314 7.51098C1.56076 6.33856 1.89288 5.38961 2.64124 4.64124C3.38961 3.89288 4.33856 3.56076 5.51098 3.40314C6.65019 3.24997 8.10582 3.24998 9.94358 3.25ZM5.71085 4.88976C4.70476 5.02502 4.12511 5.27869 3.7019 5.7019C3.27869 6.12511 3.02502 6.70476 2.88976 7.71085C2.75159 8.73851 2.75 10.0932 2.75 12C2.75 13.9068 2.75159 15.2615 2.88976 16.2892C3.02502 17.2952 3.27869 17.8749 3.7019 18.2981C4.12511 18.7213 4.70476 18.975 5.71085 19.1102C6.73851 19.2484 8.09318 19.25 10 19.25H14C15.9068 19.25 17.2615 19.2484 18.2892 19.1102C19.2952 18.975 19.8749 18.7213 20.2981 18.2981C20.7213 17.8749 20.975 17.2952 21.1102 16.2892C21.2484 15.2615 21.25 13.9068 21.25 12C21.25 10.0932 21.2484 8.73851 21.1102 7.71085C20.975 6.70476 20.7213 6.12511 20.2981 5.7019C19.8749 5.27869 19.2952 5.02502 18.2892 4.88976C17.2615 4.75159 15.9068 4.75 14 4.75H10C8.09318 4.75 6.73851 4.75159 5.71085 4.88976ZM5.42383 7.51986C5.68901 7.20165 6.16193 7.15866 6.48014 7.42383L8.63903 9.22291C9.57199 10.0004 10.2197 10.5384 10.7666 10.8901C11.2959 11.2306 11.6549 11.3449 12 11.3449C12.3451 11.3449 12.7041 11.2306 13.2334 10.8901C13.7803 10.5384 14.428 10.0004 15.361 9.22291L17.5199 7.42383C17.8381 7.15866 18.311 7.20165 18.5762 7.51986C18.8413 7.83807 18.7983 8.31099 18.4801 8.57617L16.2836 10.4066C15.3973 11.1452 14.6789 11.7439 14.0448 12.1517C13.3843 12.5765 12.7411 12.8449 12 12.8449C11.2589 12.8449 10.6157 12.5765 9.95518 12.1517C9.32112 11.7439 8.60272 11.1452 7.71636 10.4066L5.51986 8.57617C5.20165 8.31099 5.15866 7.83807 5.42383 7.51986Z" fill="#232323" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="block text-gray-700 mb-2">Password*</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter password"
                                className="w-full h-[50px] bg-gray-50 px-5 py-2 border rounded-xl hover:outline-none hover:ring-1 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out transform"
                            />
                            <div
                                className="absolute h-[50px] right-5 bottom-0 flex items-center cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    // Open Eye Icon
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5c-7.5 0-10 7.5-10 7.5s2.5 7.5 10 7.5 10-7.5 10-7.5-2.5-7.5-10-7.5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                    </svg>
                                ) : (
                                    // Closed Eye Icon
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Bold / Security / Eye Closed">
                                            <path id="Vector" fillRule="evenodd" clipRule="evenodd" d="M1.60603 6.08085C2.11366 5.8633 2.70154 6.09845 2.9191 6.60608L1.99995 7C2.9191 6.60608 2.91924 6.6064 2.9191 6.60608L2.91858 6.60488C2.9183 6.60423 2.91851 6.6047 2.91858 6.60488L2.9225 6.61374C2.92651 6.62276 2.93339 6.63807 2.94319 6.65928C2.96278 6.7017 2.99397 6.76758 3.03696 6.85356C3.12302 7.02569 3.25594 7.27745 3.43737 7.58226C3.80137 8.19378 4.35439 9.00824 5.10775 9.81955C5.28532 10.0108 5.47324 10.2011 5.67173 10.388C5.68003 10.3956 5.68823 10.4033 5.69633 10.4112C7.18102 11.8014 9.25227 13 12 13C13.2089 13 14.2783 12.7692 15.2209 12.3982C16.4469 11.9156 17.4745 11.1891 18.3156 10.3997C19.2652 9.50838 19.9627 8.55004 20.4232 7.81099C20.6526 7.44291 20.8207 7.13317 20.9299 6.91908C20.9844 6.81215 21.0241 6.72942 21.0491 6.6756C21.0617 6.64871 21.0706 6.62906 21.0758 6.61727L21.0808 6.60608C21.2985 6.09872 21.8864 5.86335 22.3939 6.08085C22.9015 6.29841 23.1367 6.88629 22.9191 7.39392L22 7C22.9191 7.39392 22.9192 7.39369 22.9191 7.39392L22.9169 7.39894L22.9134 7.40716L22.9019 7.433C22.8924 7.45433 22.879 7.48377 22.8618 7.52071C22.8274 7.59457 22.7774 7.69854 22.7115 7.82773C22.5799 8.08589 22.384 8.44607 22.1206 8.86867C21.718 9.51483 21.152 10.3162 20.4096 11.1243L21.2071 11.9217C21.5976 12.3123 21.5976 12.9454 21.2071 13.3359C20.8165 13.7265 20.1834 13.7265 19.7928 13.3359L18.9527 12.4958C18.3884 12.9515 17.757 13.3814 17.0558 13.7522L17.8381 14.9546C18.1393 15.4175 18.0083 16.037 17.5453 16.3382C17.0824 16.6394 16.463 16.5083 16.1618 16.0454L15.1763 14.5309C14.4973 14.739 13.772 14.8865 13 14.9557V16.5C13 17.0523 12.5522 17.5 12 17.5C11.4477 17.5 11 17.0523 11 16.5V14.9558C10.2253 14.8866 9.50014 14.7388 8.82334 14.5313L7.83814 16.0454C7.53693 16.5083 6.91748 16.6394 6.45457 16.3382C5.99165 16.037 5.86056 15.4175 6.16177 14.9546L6.94417 13.7522C6.24405 13.3816 5.61245 12.9518 5.04746 12.4955L4.20706 13.3359C3.81654 13.7265 3.18337 13.7265 2.79285 13.3359C2.40232 12.9454 2.40232 12.3123 2.79285 11.9217L3.59029 11.1243C2.74529 10.2045 2.12772 9.29223 1.71879 8.60523C1.5096 8.25379 1.35345 7.95868 1.2481 7.74799C1.19539 7.64257 1.15529 7.55806 1.12752 7.49794C1.11363 7.46788 1.10282 7.44389 1.09505 7.42641L1.08566 7.40513L1.08267 7.39824L1.0816 7.39576L1.08117 7.39476C1.08098 7.39432 1.08081 7.39392 1.99995 7L1.08117 7.39476C0.863613 6.88713 1.0984 6.29841 1.60603 6.08085Z" fill="#282732" />
                                        </g>
                                    </svg>
                                )}
                            </div>
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="block text-gray-700 mb-2">Confirm Password*</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter password"
                                className="w-full h-[50px] bg-gray-50 px-5 py-2 border rounded-xl hover:outline-none hover:ring-1 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out transform"
                            />
                            <div
                                className="absolute h-[50px] right-5 bottom-0 flex items-center cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    // Open Eye Icon
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5c-7.5 0-10 7.5-10 7.5s2.5 7.5 10 7.5 10-7.5 10-7.5-2.5-7.5-10-7.5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                    </svg>
                                ) : (
                                    // Closed Eye Icon
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Bold / Security / Eye Closed">
                                            <path id="Vector" fillRule="evenodd" clipRule="evenodd" d="M1.60603 6.08085C2.11366 5.8633 2.70154 6.09845 2.9191 6.60608L1.99995 7C2.9191 6.60608 2.91924 6.6064 2.9191 6.60608L2.91858 6.60488C2.9183 6.60423 2.91851 6.6047 2.91858 6.60488L2.9225 6.61374C2.92651 6.62276 2.93339 6.63807 2.94319 6.65928C2.96278 6.7017 2.99397 6.76758 3.03696 6.85356C3.12302 7.02569 3.25594 7.27745 3.43737 7.58226C3.80137 8.19378 4.35439 9.00824 5.10775 9.81955C5.28532 10.0108 5.47324 10.2011 5.67173 10.388C5.68003 10.3956 5.68823 10.4033 5.69633 10.4112C7.18102 11.8014 9.25227 13 12 13C13.2089 13 14.2783 12.7692 15.2209 12.3982C16.4469 11.9156 17.4745 11.1891 18.3156 10.3997C19.2652 9.50838 19.9627 8.55004 20.4232 7.81099C20.6526 7.44291 20.8207 7.13317 20.9299 6.91908C20.9844 6.81215 21.0241 6.72942 21.0491 6.6756C21.0617 6.64871 21.0706 6.62906 21.0758 6.61727L21.0808 6.60608C21.2985 6.09872 21.8864 5.86335 22.3939 6.08085C22.9015 6.29841 23.1367 6.88629 22.9191 7.39392L22 7C22.9191 7.39392 22.9192 7.39369 22.9191 7.39392L22.9169 7.39894L22.9134 7.40716L22.9019 7.433C22.8924 7.45433 22.879 7.48377 22.8618 7.52071C22.8274 7.59457 22.7774 7.69854 22.7115 7.82773C22.5799 8.08589 22.384 8.44607 22.1206 8.86867C21.718 9.51483 21.152 10.3162 20.4096 11.1243L21.2071 11.9217C21.5976 12.3123 21.5976 12.9454 21.2071 13.3359C20.8165 13.7265 20.1834 13.7265 19.7928 13.3359L18.9527 12.4958C18.3884 12.9515 17.757 13.3814 17.0558 13.7522L17.8381 14.9546C18.1393 15.4175 18.0083 16.037 17.5453 16.3382C17.0824 16.6394 16.463 16.5083 16.1618 16.0454L15.1763 14.5309C14.4973 14.739 13.772 14.8865 13 14.9557V16.5C13 17.0523 12.5522 17.5 12 17.5C11.4477 17.5 11 17.0523 11 16.5V14.9558C10.2253 14.8866 9.50014 14.7388 8.82334 14.5313L7.83814 16.0454C7.53693 16.5083 6.91748 16.6394 6.45457 16.3382C5.99165 16.037 5.86056 15.4175 6.16177 14.9546L6.94417 13.7522C6.24405 13.3816 5.61245 12.9518 5.04746 12.4955L4.20706 13.3359C3.81654 13.7265 3.18337 13.7265 2.79285 13.3359C2.40232 12.9454 2.40232 12.3123 2.79285 11.9217L3.59029 11.1243C2.74529 10.2045 2.12772 9.29223 1.71879 8.60523C1.5096 8.25379 1.35345 7.95868 1.2481 7.74799C1.19539 7.64257 1.15529 7.55806 1.12752 7.49794C1.11363 7.46788 1.10282 7.44389 1.09505 7.42641L1.08566 7.40513L1.08267 7.39824L1.0816 7.39576L1.08117 7.39476C1.08098 7.39432 1.08081 7.39392 1.99995 7L1.08117 7.39476C0.863613 6.88713 1.0984 6.29841 1.60603 6.08085Z" fill="#282732" />
                                        </g>
                                    </svg>
                                )}
                            </div>
                        </div>
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
                                <span className="ml-2 text-gray-700">I accept terms and conditions</span>
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full h-[50px] bg-primary text-white py-2 rounded-xl ring-2 ring-primary hover:bg-primaryDark hover:ring-primaryDark focus:outline-none focus:ring-2 focus:ring-primaryDark transition duration-200 ease-in-out transform"
                        >
                            Sign up
                        </button>
                        <div className="text-center my-4">Or</div>
                        <button
                            type="button"
                            className="w-full h-[50px] bg-none text-primary py-2 rounded-xl hover:bg-black ring-2 ring-primary hover:ring-black hover:text-white hover:shadow-lg hover:shadow-neutral-300 hover:outline-none hover:-tranneutral-y-px focus:shadow-none focus:outline-none focus:ring-2 focus:ring-black flex items-center justify-center space-x-2 transition duration-200 ease-in-out transform"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                            <span>Register with Google</span>
                        </button>
                    </form>
                    <p className="mt-6 text-center">
                        Have an account? <a href="/sign-in" className="!text-gray-700 font-medium hover:!text-blue-500 active:!text-blue-500 transition duration-200 ease-in-out transform">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
