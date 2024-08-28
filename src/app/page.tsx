import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Metadata } from 'next';
import { RaceItem } from 'components/shared';
import { DropIcon, EducationIcon, EnvironmentIcon, RaceIcon, StarsIcon } from '@assets/icons';

export const metadata: Metadata = {
    title: "DataRace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
};

const RaceSelect = dynamic(() => import('@components/shared/race-select').then(mod => mod.default), { ssr: false });

interface IRaceType {
    title: string,
    description: string,
    icon: React.ElementType,
    type: string,
}

interface IRaceItemType {
    title: string,
    description: string,
    img: string,
    price: string,
    expiry_date: string | number,
}

const RACE_SELECTS: IRaceType[] = [
    {
        title: 'All races',
        description: '180 races',
        icon: RaceIcon,
        type: "race",
    },
    {
        title: 'Environment',
        description: '180 races',
        icon: EnvironmentIcon,
        type: "environment",
    },
    {
        title: 'Education',
        description: '6 races',
        icon: EducationIcon,
        type: "education",
    },
    {
        title: 'Oil & Industry',
        description: '6 races',
        icon: DropIcon,
        type: "industry",
    },
    {
        title: 'Technology',
        description: '6 races',
        icon: DropIcon,
        type: "tech",
    },
];

const RACE_ITEMS: IRaceItemType[] = [
    {
        title: 'Euismod lacus eu leo arcu leo ultrices morbi nisl.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
        img: '/png/pic1.png',
        price: '6000₼',
        expiry_date: 'Ends in 2 days',
    },
    {
        title: 'Auctor ut luctus euismod euismod quam ut sapien.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
        img: '/png/pic2.png',
        price: '6000₼',
        expiry_date: 'Ends in 2 days',
    },
    {
        title: 'Euismod lacus eu leo arcu leo ultrices morbi nisl.s',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
        img: '/png/pic3.png',
        price: '6000₼',
        expiry_date: 'Ends in 2 days',
    },
];

const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
            <main id="main-content" className="flex-grow bg-gray-50 py-40">
                <section className="flex w-full justify-between items-center text-center">
                    <div className="flex items-center min-w-[20%] left-svg-animation">
                        <Image src="/svg/team-brainstorming.svg" alt="Illustration of a team brainstorming together" width={400} height={300} priority />
                    </div>
                    <div className='px-20 space-y-7'>
                        <div className="flex justify-center content-center">
                            <StarsIcon className="-mt-10 -ml-[60px] star-icon-animation" aria-hidden="true" />
                            <h1 className="text-4xl font-semi text-gray-800 label-animation">
                                Join the race to AI excellence
                            </h1>
                        </div>
                        <p className="text-md text-gray-600 description-animation">DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.</p>
                        <Link href="/races" className="inline-flex w-auto text-center items-center px-6 py-3 text-white transition-all bg-primary dark:bg-white dark:text-gray-800 rounded-xl sm:w-auto hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 dark:shadow-neutral-700 focus:shadow-none button-animation">
                            See our races
                        </Link>
                    </div>
                    <div className="flex items-center min-w-[20%] right-svg-animation">
                        <Image src="/svg/human-right.svg" alt="Human rights illustration" width={400} height={100} className="max-h-[400px]" priority />
                    </div>
                </section>

                <section className="w-full overflow-x-auto py-[6rem] hide-scrollbar">
                    <div className="container mx-auto flex justify-center space-x-4">
                        {RACE_SELECTS.map((item, i) => (
                            <RaceSelect key={i} {...item} />
                        ))}
                    </div>
                </section>

                <section className="container mx-auto space-y-10">
                    <div className="flex justify-between">
                        <div className="space-y-3">
                            <h2 className="text-[40px]">Featured <strong>Competitions</strong></h2>
                            <p className='text-md text-gray-700'>Get ready for an exciting race</p>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
                        {RACE_ITEMS.map((item, i) => (
                            <RaceItem key={i} {...item} />
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

export default Home;
