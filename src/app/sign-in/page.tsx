import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: "Datarace.ai | Sign In",
    description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
};

const SignIn: React.FC = () => {
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
            </div>

            {/* Right side with form */}
            <div className="w-full lg:w-1/2 bg-white content-center p-10">
                <div className="w-full mx-auto lg:max-w-md space-y-10">
                    <a className="flex items-center lg:hidden justify-center cursor-pointer mb-[50px]" href="/">
                        <Image src="/svg/datarace-logo.svg" alt="Logo" width={250} height={70} />
                    </a>

                    <div>
                        <h2 className="text-2xl font-bold mb-4 lg:text-start text-center">Log in</h2>
                        <p className="mb-4 text-sm text-gray-600 lg:text-start text-center">Enter your email and password to log in</p>
                    </div>

                    <form className="space-y-5">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">E-mail*</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="example@company.com"
                                className="w-full h-[50px] bg-gray-50 px-5 py-2 border rounded-xl hover:outline-none hover:ring-2 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out transform"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 mb-2">Password*</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter password"
                                className="w-full h-[50px] bg-gray-50 px-5 py-2 border rounded-xl hover:outline-none hover:ring-2 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out transform"
                            />
                        </div>

                        <div className="flex justify-between items-center pb-4">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox text-blue-600" />
                                <span className="ml-2 text-gray-700">Remember me</span>
                            </label>
                            <a href="#" className="!text-gray-700 font-medium hover:!text-blue-500 active:!text-blue-500">Forget password</a>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-[50px] bg-primary text-white py-2 rounded-xl hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out transform"
                        >
                            Login
                        </button>

                        <div className="text-center my-4">Or</div>

                        <button
                            type="button"
                            className="w-full h-[50px] bg-none text-primary py-2 rounded-xl hover:bg-black ring-2 ring-primary hover:ring-black hover:text-white hover:shadow-lg hover:shadow-neutral-300 hover:outline-none hover:-tranneutral-y-px focus:shadow-none focus:outline-none focus:ring-2 focus:ring-black flex items-center justify-center space-x-2 transition duration-200 ease-in-out transform"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                            <span>Login with Google</span>
                        </button>
                    </form>

                    <p className="mt-6 text-center">
                        Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
