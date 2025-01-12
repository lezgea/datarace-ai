"use client";

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import Link from 'next/link';


export const BlogHeaderSection = () => {
    const t = useTranslations();
    const lng = useLocale();
    const [isSidebarOpen, setSidebarOpen] = React.useState<boolean>(false);
    const { isAuthenticated } = useSelector((state: RootState) => state.user);
    const { loading: datasetsLoading, datasetsCount } = useSelector((state: RootState) => state.datasets);


    return (
        <>
            <div className="flex items-end justify-between">
                <div className="text-start">
                    <nav className="text-sm flex justify-start items-center text-gray-600 space-x-3">
                        <Link href={`/${lng}`} className="hover:text-primaryLight">{t('mainPage')}</Link>
                        <span className="text-lg">&gt;</span>
                        <span>{t('blog')}</span>
                    </nav>
                    <h1 className="text-[32px] md:text-[2.3rem] font-medium">{t('blog')}</h1>
                    {/* <p className="text-md text-gray-700">{t('competitionDescription')}</p> */}
                </div>
                {
                    isAuthenticated &&
                    <Link href={`/${lng}/blog/create`}>
                        <button
                            className="inline-flex w-auto text-center items-center px-6 py-2.5 text-white transition-all bg-gray-700 rounded-lg sm:w-auto hover:bg-dark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                            aria-label="Create Blog"
                        >
                            {t('createBlog')}
                        </button>
                    </Link>
                }
            </div>
        </>
    )
}