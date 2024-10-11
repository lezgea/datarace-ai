import React, { ReactNode } from 'react';
import { Metadata } from 'next';
import { CompetitionsTable } from '@components/features';
import { useTranslations } from 'next-intl';
import TabSelects from '@components/shared/tab-selects';
import { DatasetsTable } from '@components/features/datasets/datasets-table';
import { MyDatasetsTable } from '@components/features/datasets/my-datasets-table';

export const metadata: Metadata = {
    title: "Datasets | DataRace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
};


const Datasets: React.FC = () => {
    const t = useTranslations();

    const TABS: { title: string, content: ReactNode }[] = [
        {
            title: t('allDatasets'),
            content: <DatasetsTable />,
        },
        {
            title: t('myDatasets'),
            content: <MyDatasetsTable />,
        },
    ]

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

                <section className="container mx-auto text-center space-y-10">
                    <div className="flex items-center justify-between">
                        <div className="text-start space-y-3">
                            <h2 className="text-[32px] md:text-[2.3rem]">{t('datasets')}</h2>
                            <p className="text-md text-gray-700">{t('competitionDescription')}</p>
                        </div>
                        <button
                            className="inline-flex w-auto text-center items-center px-6 py-3 text-white transition-all bg-primary rounded-xl sm:w-auto hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                            aria-label="Upload Dataset"
                        >
                            {t('createDataset')}
                        </button>
                    </div>
                    <TabSelects tabs={TABS} />
                </section>
            </main>
        </div>
    );
};

export default Datasets;
