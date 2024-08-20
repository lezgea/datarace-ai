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
                    layout="fill" // This makes the image cover the entire container
                    objectFit="cover" // Ensures the image covers the container without distortion
                    className="h-full"
                />
            </div>

            {/* Right side with form */}
            <div className="w-full lg:w-1/2 bg-white content-center">
                <div className="w-full mx-auto max-w-md">
                    <h2 className="text-2xl font-bold mb-6">Log in</h2>
                    <p className="mb-4">Enter your email and password to log in</p>

                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">E-mail*</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="example@company.com"
                                className="w-full h-[50px] bg-gray-50 px-5 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 mb-2">Password*</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter password"
                                className="w-full h-[50px] bg-gray-50 px-5 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox text-blue-600" />
                                <span className="ml-2 text-gray-700">Remember me</span>
                            </label>
                            <a href="#" className="text-blue-600 hover:underline">Forget password</a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            Login
                        </button>

                        <div className="text-center my-4">Or</div>

                        <button
                            type="button"
                            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                        >
                            Login with Google
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
