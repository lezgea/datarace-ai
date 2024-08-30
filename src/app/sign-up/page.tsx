import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import SignUpForm from '@components/features/sign-up/sign-up-form';
import Link from 'next/link';


export const metadata: Metadata = {
    title: "Sign Up | DataRace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
};


const SignUp: React.FC = () => {
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
                    <p className="text-lg text-gray-500">DataRace is an innovative platform designed to bring data scientists and Al enthusiasts together to compete in data-driven challenges.</p>
                </div>
            </div>

            {/* Right side with form */}
            <div className="w-full lg:w-1/2 bg-white content-center px-8 py-[30px] lg:p-20 overflow-y-scroll">
                <SignUpForm />
            </div>
        </div>
    );
};

export default SignUp;
