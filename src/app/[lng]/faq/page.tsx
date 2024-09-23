import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { ExpandableInfoSection, Loader } from '@components/shared';
import Link from 'next/link';
import { PlusIcon } from '@assets/icons';
import { HelpSection } from '@components/features';
import { IParamsLanguage } from 'types/lang-types';
import { useTranslation } from 'app/i18n';


export const metadata: Metadata = {
    title: "FAQ | Datarace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and Al enthusiasts together to compete in data-driven challenges.",
};


const FAQ: React.FC<IParamsLanguage> = async ({ params: { lng } }) => {
    const { t } = await useTranslation(lng);

    return (
        <Suspense fallback={<Loader />}>
            <div className="min-h-screen flex flex-col">
                <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
                <main id="main-content" className="container mx-auto flex-grow px-5 py-10 md:px-0 md:py-[6rem]">
                    <h1 className="text-[32px] md:text-[2.3rem] font-medium">{t('faq')}</h1>
                    {/* Breadcrumb */}
                    <nav className="text-sm flex justify-start items-center text-gray-600 space-x-3">
                        <Link href="/" className="hover:text-primaryLight">{t('mainPage')}</Link>
                        <span className="text-lg">&gt;</span>
                        <span>{t('faq')}</span>
                    </nav>
                    <HelpSection title="General" t={t} />
                </main>
            </div>
        </Suspense>
    );
};

export default FAQ;
