import React from 'react';
import { Metadata } from 'next';
import { CategoriesSection, CompetitionsSection } from '@components/features/home';
import { CompetitionsTable } from '@components/features';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
    title: "Races | DataRace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
};


const Datasets: React.FC = () => {
    const t = useTranslations();

    return (
        <div className="min-h-screen flex flex-col">
            <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
            <main id="main-content" className="flex-grow bg-gray-50 px-5 py-20 lg:px-0 lg:py-[7rem] space-y-20">
                {/* <section className="container mx-auto w-full space-y-10">
                    <div className="flex justify-between">
                        <div className="space-y-3">
                            <h2 className="text-[32px] md:text-[2.3rem] font-medium">{t('chooseYourCompetitions')}</h2>
                            <p className="text-md text-gray-700">{t('competitionDescription')}</p>
                        </div>
                    </div>
                    <CategoriesSection />
                </section> */}

                {/* <section className="container mx-auto text-center space-y-10">
                    <CompetitionsTable />
                </section> */}
            </main>
        </div>
    );
};

export default Datasets;
