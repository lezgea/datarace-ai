import React, { ReactNode } from 'react';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { DatasetsTable } from '@components/features/datasets/datasets-table';
import { MyDatasetsTable } from '@components/features/datasets/my-datasets-table';
import { DatasetsHeaderSection } from '@components/features/datasets/datasets-header';
import TabSelects from '@components/shared/tab-selects';


export const metadata: Metadata = {
    title: "Datasets | DataRace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
};


const Datasets: React.FC = () => {
    const t = useTranslations();

    const TABS: { title: string, content: ReactNode }[] = [
        {
            title: t('myDatasets'),
            content: <MyDatasetsTable />,
        },
        {
            title: t('allDatasets'),
            content: <DatasetsTable />,
        },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
            <main id="main-content" className="flex-grow bg-gray-50 px-5 py-20 lg:px-0 lg:py-[7rem] space-y-10">
                <section className="container mx-auto text-center">
                    <DatasetsHeaderSection />
                </section>

                <section className="container mx-auto text-center">
                    <TabSelects tabs={TABS} />
                </section>
            </main>
        </div>
    );
};

export default Datasets;
