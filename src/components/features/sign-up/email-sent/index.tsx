import React from 'react';
import { Teamwork } from '@assets/icons';
import Link from 'next/link';


const EmailSent: React.FC = () => {
    return (
        <div className="flex flex-col w-full items-center justify-center mx-auto lg:max-w-md space-y-7 animate-right-svg text-center">
            <Teamwork />
            <h2 className="text-[2.3rem] font-regmed">E-mail has been sent</h2>
            <p className="text-sm text-gray-600">
                Please confirm dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exer
            </p>
            <Link
                href="/"
                className="flex w-full text-center justify-center items-center px-6 py-3 text-white transition-all bg-primary rounded-xl hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                aria-label="Back to homepage"
            >
                Back to homepage
            </Link>
        </div>
    );
}

export default EmailSent;
