import React from 'react';
import { Metadata } from 'next';
import { CategoriesSection, CompetitionsSection } from '@components/features/home';
import { CompetitionsTable } from '@components/features';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { BlogTable } from '@components/features/blog';

export const metadata: Metadata = {
    title: "Races | DataRace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
};


const Blog: React.FC = () => {
    const t = useTranslations();

    return (
        <div className="min-h-screen flex flex-col">
            <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
            <main id="main-content" className="container mx-auto flex-grow px-5 py-10 md:px-0 md:py-[6rem]">
                <nav className="text-sm flex justify-start items-center text-gray-600 space-x-3">
                    <Link href="/" className="hover:text-primaryLight">{t('mainPage')}</Link>
                    <span className="text-lg">&gt;</span>
                    <span>{t('blog')}</span>
                </nav>
                <h1 className="text-[32px] md:text-[2.3rem] font-medium">{t('blog')}</h1>

                <section className="container mx-auto text-center mt-5">
                    <BlogTable />
                </section>
            </main>
        </div>
    );
};

export default Blog;
