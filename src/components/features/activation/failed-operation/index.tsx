import React from 'react';
import { Failed } from '@assets/icons';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface IFailedProps {
    message: string,
}

export const FailedOperation: React.FC<IFailedProps> = (props) => {
    const { message } = props;
    const lng = useLocale();

    return (
        <div className="flex flex-col w-full items-center justify-center mx-auto max-w-sm space-y-7 animate-right-svg text-center">
            <Failed className="w-[10rem] h-[10rem]" />
            <h2 className="text-[2.3rem] font-regmed text-[#]">Activation Failed!</h2>
            <p className="text-sm text-gray-600">
                {message}
            </p>
            <Link
                href={`/${lng}/sign-up`}
                className="flex w-full text-center justify-center items-center px-6 py-3 text-white transition-all bg-primary rounded-xl hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                aria-label="Back to homepage"
            >
                Sign Up
            </Link>
        </div>
    );
}

