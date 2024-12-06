import React, { ReactNode } from 'react';
import { Metadata } from 'next';
import { CategoriesSection, CompetitionsSection } from '@components/features/home';
import { CompetitionsTable } from '@components/features';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { BlogHeaderSection, BlogTable, MyBlogTable } from '@components/features/blog';
import TabSelects from '@components/shared/tab-selects';

export const metadata: Metadata = {
    title: "Blog | DataRace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
};


const Blog: React.FC = () => {
    const t = useTranslations();

    const TABS: { title: string, content: ReactNode }[] = [
        {
            title: t('allBlogs'),
            content: <BlogTable />,
        },
        {
            title: t('myBlogs'),
            content: <MyBlogTable />,
        },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
            <main id="main-content" className="container mx-auto flex-grow px-5 py-10 md:px-0 md:py-[6rem] space-y-5">
                <section className="container mx-auto text-center">
                    <BlogHeaderSection />
                </section>

                <section className="container mx-auto text-center">
                    <TabSelects tabs={TABS} />
                </section>
            </main>
        </div>
    );
};

export default Blog;
