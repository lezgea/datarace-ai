import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Metadata } from 'next';
import { StarsIcon } from '@assets/icons';
import { CategoriesSection } from '@components/features/home/categories-section';
import { CompetitionsSection } from '@components/features/home';
import { IParamsLanguage } from 'types/lang-types';
import { useLanguage } from '@providers/language-provider';
import { useTranslation } from 'app/i18n';

export const metadata: Metadata = {
    title: "DataRace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
};

// Dynamic imports for better performance
const TeamBrainStorm = dynamic(() => import('@assets/icons/team-brainstorm.svg').then(mod => mod.default));
const TeamBrainstorming = dynamic(() => import('@assets/icons/team-brainstorming.svg').then(mod => mod.default));
const HumanRight = dynamic(() => import('@assets/icons/human-right.svg').then(mod => mod.default));
const RaceItem = dynamic(() => import('@components/shared/race-item').then(mod => mod.default), { ssr: false });



const Home: React.FC<IParamsLanguage> = async ({ params: { lng } }) => {
    const { t } = await useTranslation(lng)

    return (
        <div className="min-h-screen flex flex-col">
            <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
            <main id="main-content" className="flex-grow bg-gray-50 px-5 py-20 md:px-0 md:py-40">
                <section className="flex flex-col w-full items-center text-center md:flex-row md:justify-between">
                    <div className="flex md:hidden w-full py-10 items-center justify-center">
                        <TeamBrainstorming />
                    </div>
                    <div className="hidden md:flex items-center min-w-[20%] animate-left-svg">
                        <TeamBrainStorm />
                    </div>
                    <div className="md:px-20 space-y-7">
                        <div className="flex justify-center content-center">
                            <StarsIcon className="hidden md:flex -mt-10 md:-ml-[60px] animate-star" aria-hidden="true" />
                            <h1 className="text-4xl font-semibold text-gray-800">
                                {t('title')}
                            </h1>
                        </div>
                        <p className="text-md text-gray-600">
                            {t('description')}
                        </p>
                        <Link
                            href="/races"
                            className="inline-flex w-auto text-center items-center px-6 py-3 text-white transition-all bg-primary rounded-xl sm:w-auto hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                            aria-label="See our races"
                        >
                            {t('seeOurRaces')}
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center justify-end min-w-[20%] animate-right-svg">
                        <HumanRight />
                    </div>
                </section>

                <section className="w-full overflow-x-auto py-[6rem] hide-scrollbar">
                    <CategoriesSection />
                </section>

                <section className="container mx-auto space-y-10">
                    <CompetitionsSection />
                </section>
            </main>
        </div>
    );
};

export default Home
