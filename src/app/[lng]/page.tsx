import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { StarsIcon } from '@assets/icons';
import { CategoriesSection } from '@components/features/home/categories-section';
import { BlogSection, CompetitionsSection, DatasetsSection } from '@components/features/home';
import { IParamsLanguage } from 'types/lang-types';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation'


export async function generateMetadata() {
    return {
        title: "DataRace.ai",
        description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
        keywords: [
            'AI Academy',
            'Artificial Intelligence',
            'AI Courses',
            'Future Technology',
            'AI Education',
            'Süni İntellekt Təhsili',
            'Machine Learning',
            'Data Science',
            'AI Programming',
            'AI Təlimləri',
            'Deep Learning',
            'Neural Networks',
            'AI Research',
            'AI Studies',
            'AI Certification',
            'AI Lessons',
            'AI Development',
            'AI Tədrisi',
            'Robototexnika',
            'AI Proqramlaşdırma',
            'AI Öyrənmə',
            'AI Academy Haqqında',
            'AI Təhsili',
            'Riaziyyat Olimpiyadasi',
            'Olimpiada Suallari',
            'RFO',
            'RPM',
        ],
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                noarchive: false,
            },
        },
        openGraph: {
            title: "DataRace.ai",
            description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
            url: `https://datarace.ai`,
            images: [
                {
                    url: `https://datarace.ai/webp/default_banner.webp`,
                    width: 1200,
                    height: 630,
                    alt: `DataRace.ai Banner`,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: "DataRace.ai",
            description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
            images: [`https://datarace.ai/webp/default_banner.webp`],
        },
        alternates: {
            canonical: `https://datarace.ai`,
        },
    };
}


// Dynamic imports for better performance
const TeamBrainStorm = dynamic(() => import('@assets/icons/team-brainstorm.svg').then(mod => mod.default));
const TeamBrainstorming = dynamic(() => import('@assets/icons/team-brainstorming.svg').then(mod => mod.default));
const HumanRight = dynamic(() => import('@assets/icons/human-right.svg').then(mod => mod.default));


const Home: React.FC<IParamsLanguage> = ({ params: { lng } }) => {
    const t = useTranslations();

    if (!lng) {
        return notFound()
    }

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
                            href={`${lng}/races`}
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

                <section className="w-full overflow-x-auto py-[6rem] hide-scrollba md:px-7">
                    <CategoriesSection />
                </section>

                <section className="container mx-auto md:px-7">
                    <CompetitionsSection />
                </section>

                <section className="container mx-auto md:px-7">
                    <DatasetsSection />
                </section>

                <section className="container mx-auto md:px-7">
                    <BlogSection />
                </section>
            </main>
        </div>
    );
};

export default Home
