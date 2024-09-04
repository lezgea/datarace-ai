import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Metadata } from 'next';
import { StarsIcon } from '@assets/icons';
import { useGetCategoriesQuery } from '@api/category-api';
import { CategoriesSection } from '@components/features/home/categories-section';

export const metadata: Metadata = {
    title: "DataRace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
};

// Dynamic imports for better performance
const TeamBrainStorm = dynamic(() => import('@assets/icons/team-brainstorm.svg').then(mod => mod.default));
const TeamBrainstorming = dynamic(() => import('@assets/icons/team-brainstorming.svg').then(mod => mod.default));
const HumanRight = dynamic(() => import('@assets/icons/human-right.svg').then(mod => mod.default));
const RaceItem = dynamic(() => import('@components/shared/race-item').then(mod => mod.default), { ssr: false });


interface IRaceItemType {
    title: string;
    description: string;
    img: string;
    price: string;
    expiry_date: string;
}

const RACE_ITEMS: IRaceItemType[] = [
    {
        title: 'Euismod lacus eu leo arcu leo ultrices morbi nisl.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        img: '',
        price: '6000₼',
        expiry_date: 'Ends in 2 days',
    },
    {
        title: 'Auctor ut luctus euismod euismod quam ut sapien.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        img: '',
        price: '6000₼',
        expiry_date: 'Ends in 2 days',
    },
    {
        title: 'Euismod lacus eu leo arcu leo ultrices morbi nisl.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        img: '',
        price: '6000₼',
        expiry_date: 'Ends in 2 days',
    },
];

const Home: React.FC = () => {

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
                                Join the race to AI excellence
                            </h1>
                        </div>
                        <p className="text-md text-gray-600">
                            DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.
                        </p>
                        <Link
                            href="/races"
                            className="inline-flex w-auto text-center items-center px-6 py-3 text-white transition-all bg-primary rounded-xl sm:w-auto hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                            aria-label="See our races"
                        >
                            See our races
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
                    <div className="flex justify-between">
                        <div className="space-y-3">
                            <h2 className="text-[32px] md:text-[2.3rem]">Featured <span className="font-medium">Competitions</span></h2>
                            <p className="text-md text-gray-700">Get ready for an exciting race</p>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
                        {RACE_ITEMS.map((item, i) => (
                            <RaceItem key={i} {...item} img={item.img || "/svg/noimg.svg"} />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Link href="/races" className="inline-flex w-auto text-center font-medium items-center px-6 py-3 text-gray-900 transition-all dark:bg-white dark:text-gray-800 rounded-xl sm:w-auto hover:bg-primaryDark hover:text-white hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 dark:shadow-neutral-700 focus:shadow-none">
                            All races
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home
