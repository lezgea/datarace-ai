import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next'
import { RaceItem } from 'components/shared';
import { DropIcon, EducationIcon, EnvironmentIcon, RaceIcon, StarsIcon } from '@assets/icons';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { RaceSelect } from '@components/shared/race-select';

// const RaceSelect = dynamic(() => import('@/components/shared/race-select').then(mod => mod.default), {
//     ssr: false, // Optional: disable server-side rendering if needed
// });


export const metadata: Metadata = {
    title: "DataRace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and Al enthusiasts together to compete in data-driven challenges.",
};

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
        title: 'Enviroment',
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
    {
        title: 'Euismod lacus eu leo arcu leo ultrices morbi nisl.s',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
        img: '/png/pic4.png',
        price: '6000₼',
        expiry_date: 'Ends in 2 days',
    },
    {
        title: 'Euismod lacus eu leo arcu leo ultrices morbi nisl.s',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
        img: '/png/pic5.png',
        price: '6000₼',
        expiry_date: 'Ends in 2 days',
    },
    {
        title: 'Euismod lacus eu leo arcu leo ultrices morbi nisl.s',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
        img: '/png/pic6.png',
        price: '6000₼',
        expiry_date: 'Ends in 2 days',
    },
];


const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-gray-50 py-40">

                {/*---- BANNER SECTION */}
                <section className="flex w-full justify-between items-center text-center">
                    <div className="flex items-center min-w-[20%]">
                        <Image src="/svg/team-brainstorming.svg" alt="Team Brainstorming" width={400} height={300} priority />
                    </div>
                    <div className='px-20 space-y-7'>
                        <div className="flex justify-center content-center">
                            <h1 className="text-4xl font-semi text-gray-800">
                                <StarsIcon className="-mt-20 -ml-[60px]" />
                                Join the race to AI excellence
                            </h1>
                        </div>
                        <p className="text-md text-gray-600">DataRace is an innovative platform designed to bring data scientists and Al enthusiasts together to compete in data-driven challenges.</p>
                        <Link href="/races" className="inline-flex w-auto text-center items-center px-6 py-3 text-white transition-all bg-primary dark:bg-white dark:text-gray-800 rounded-xl sm:w-auto hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px shadow-neutral-300 dark:shadow-neutral-700 focus:shadow-none">
                            See our races
                        </Link>
                    </div>
                    <div className="flex items-center min-w-[20%]">
                        <Image src="/svg/human-right.svg" alt="Human Right" width={400} height={100} className="max-h-[400px]" priority />
                    </div>
                </section>

                {/*---- RACE BUTTONS */}
                <section className="w-full overflow-x-auto py-[6rem] hide-scrollbar">
                    <div className="container mx-auto flex justify-center space-x-4">
                        {
                            RACE_SELECTS.map((item, i) =>
                                <RaceSelect key={i} {...item} />
                            )
                        }
                    </div>
                </section>

                <section className="container mx-auto space-y-10">
                    <div className="flex justify-between">
                        <div className="space-y-3">
                            <h2 className="text-[40px]">Featured <strong>Competitions</strong></h2>
                            <p className='text-md text-gray-700'>Get ready to exciting race</p>
                        </div>
                        {/* <form className="group relative w-[400px] mt-10">
                            <div className="relative">
                                <svg width="20" height="20" fill="currentColor" className="absolute left-3 mt-3 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                                </svg>
                                <input className="focus:ring-2 focus:ring-blue-500 h-[45px] focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-xl py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Search..." placeholder="Search..." />
                            </div>
                        </form> */}
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
                        {
                            RACE_ITEMS.map((item, i) =>
                                <RaceItem key={i} {...item} />
                            )
                        }
                    </div>
                    <div className="flex justify-center">
                        <Link href="/races" type="button" className="inline-flex w-auto text-center font-regmed items-center px-6 py-3 text-gray-900 transition-all dark:bg-white dark:text-gray-800 rounded-xl sm:w-auto hover:bg-primaryDark hover:text-white hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px shadow-neutral-300 dark:shadow-neutral-700 focus:shadow-none">
                            All races
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
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
