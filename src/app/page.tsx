import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Metadata } from 'next'
import { useParams } from 'next/navigation';
import { RaceItem } from 'components/shared';


export const metadata: Metadata = {
    title: "DataRace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and Al enthusiasts together to compete in data-driven challenges.",
};

interface RaceType {
    title: string;
    description: string;
    img: string;
}

interface RaceItemType extends RaceType {
    price: string,
    expiry_date: string | number,
}

const RACE_SELECTS: RaceType[] = [
    {
        title: 'All races',
        description: '180 races',
        img: '/svg/all_races.svg',
    },
    {
        title: 'Enviroment',
        description: '180 races',
        img: '/svg/environment.svg',
    },
    {
        title: 'Education',
        description: '6 races',
        img: '/svg/education.svg',
    },
    {
        title: 'Oil & Industry',
        description: '6 races',
        img: '/svg/drop.svg',
    },
    {
        title: 'Enviroment',
        description: '180 races',
        img: '/svg/environment.svg',
    },
    {
        title: 'Enviroment',
        description: '180 races',
        img: '/svg/environment.svg',
    },
    {
        title: 'Enviroment',
        description: '180 races',
        img: '/svg/environment.svg',
    },
];


const RACE_ITEMS: RaceItemType[] = [
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


const COMPLETED_ITEMS: RaceItemType[] = [
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
];


const Home: React.FC = () => {

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-gray-50 py-40">

                {/*---- BANNER SECTION */}
                <section className="flex w-full justify-between items-center text-center">
                    <a className="flex items-center">
                        <Image src="/svg/team-brainstorming.svg" alt="Team Brainstorming" width={400} height={300} />
                    </a>
                    <div className='px-20 space-y-7'>
                        <div className="flex justify-center content-center">
                            <h1 className="text-5xl font-semibold">
                                <img src={'/svg/draw.svg'} alt="draw" className="-mt-20 -ml-[60px]" />
                                Join the race to AI excellence
                            </h1>
                        </div>
                        <p className="text-lg text-gray-700">DataRace is an innovative platform designed to bring data scientists and Al enthusiasts together to compete in data-driven challenges.</p>
                        <button type="button" className="inline-flex w-auto text-center items-center px-6 py-3 text-white transition-all bg-gray-900 dark:bg-white dark:text-gray-800 rounded-xl shadow-md shadow-neutral-300 sm:w-auto hover:bg-blue-500 hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-xl hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none focus:bg-blue-500">
                            See races
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center">
                        <Image src="/svg/human-right.svg" alt="Human Right" width={400} height={100} className="max-h-[400px]" />
                    </div>
                </section>

                {/*---- RACE BUTTONS */}
                <section className="w-full overflow-x-auto py-20 hide-scrollbar">
                    <div className="container mx-auto flex space-x-4">
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
                            <div className="flex">
                                <div className="text-[40px]">Discover races</div>
                                <img src={'/svg/arrow_styled.svg'} alt="Feature 1" className="ml-7" />
                            </div>
                            <div className='text-sm'>Get ready to exciting race</div>
                        </div>
                        <form className="group relative w-[400px] mt-10">
                            <div className="relative">
                                <svg width="20" height="20" fill="currentColor" className="absolute left-3 mt-3 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                                </svg>
                                <input className="focus:ring-2 focus:ring-blue-500 h-[45px] focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-xl py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Search..." placeholder="Search..." />
                            </div>
                        </form>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
                        {
                            RACE_ITEMS.map((item, i) =>
                                <RaceItem key={i} {...item} />
                            )
                        }
                    </div>
                    <button type="button" className="inline-flex w-auto text-center items-center px-6 py-3 text-gray-900 transition-all bg-gray-200 dark:bg-white dark:text-gray-800 rounded-xl shadow-sm shadow-neutral-300 sm:w-auto hover:bg-gray-900 hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-xl hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                        See all races
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </section>

                <section className="container mx-auto pt-20 space-y-10">
                    <div className="flex justify-between content-center">
                        <div className="space-y-3">
                            <div className="flex">
                                <div className="text-[40px]">Completed <strong>projects</strong></div>
                                <img src={'/svg/arrow_styled.svg'} alt="Feature 1" className="ml-7" />
                            </div>
                            <div className='text-sm'>Get ready to exciting race</div>
                        </div>
                        <button type="button" className="inline-flex h-[50px] w-auto mt-5 text-center items-center px-6 py-3 text-gray-900 transition-all bg-gray-200 dark:bg-white dark:text-gray-800 rounded-xl shadow-sm shadow-neutral-300 sm:w-auto hover:bg-gray-900 hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-xl hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                            See all
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
                        {
                            COMPLETED_ITEMS.map((item, i) =>
                                <RaceItem key={i} {...item} />
                            )
                        }
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;


interface RacesSelectProps extends RaceType { };

const RaceSelect: React.FC<RacesSelectProps> = (props) => {
    let { title, description, img } = props

    return (
        <div className="min-w-[300px] w-[300px] h-md px-6 py-4 flex rounded-custom_md bg-custom_gray border border-transparent cursor-pointer shadow-sm hover:shadow-lg hover:border-blue transition-bg transition-shadow duration-200 ease-in group">
            <div className="flex-shrink-0 transition-transform duration-300 ease-in-out transform group-hover:scale-105">
                <img src={img} alt="Feature 1" />
            </div>
            <div className='column px-4'>
                <h4 className="text-md font-medium">{title}</h4>
                <p className="text-md">{description}</p>
            </div>
        </div>
    )
};

