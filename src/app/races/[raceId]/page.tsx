import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Metadata } from 'next';
import TabSelects from '@components/shared/tab-selects';
import { GeneralSection } from '@components/features/races/general-section';

export const metadata: Metadata = {
    title: "Race Details | DataRace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
};

const RaceItem = dynamic(() => import('@components/shared/race-item').then(mod => mod.default), { ssr: false });

interface IRaceItemType {
    title: string;
    description: string;
    img: string;
    price: string;
    expiry_date: string | number;
}

const RACE_ITEMS: IRaceItemType[] = [
    {
        title: 'Euismod lacus eu leo arcu leo ultrices morbi nisl.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        img: '/png/pic1.png',
        price: '6000₼',
        expiry_date: 'Ends in 2 days',
    },
    {
        title: 'Auctor ut luctus euismod euismod quam ut sapien.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        img: '/png/pic2.png',
        price: '6000₼',
        expiry_date: 'Ends in 2 days',
    },
    {
        title: 'Euismod lacus eu leo arcu leo ultrices morbi nisl.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        img: '/png/pic3.png',
        price: '6000₼',
        expiry_date: 'Ends in 2 days',
    },
]

const TABS: { title: string, content: ReactNode }[] = [
    {
        title: "General overview",
        content: <GeneralSection />,
    },
    {
        title: "Data",
        content: <div>Data</div>,
    },
    {
        title: "Rules",
        content: <div>Rules</div>,
    }
]

const RaceDetails: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto py-[6rem] space-y-5">
                {/* Breadcrumb */}
                <nav className="text-sm flex justify-start items-center text-gray-600 space-x-3">
                    <Link href="/" className="hover:text-primaryLight">Main page</Link>
                    <span className="text-lg">&gt;</span>
                    <Link href="/races" className="hover:text-primaryLight">Races</Link>
                    <span className="text-lg">&gt;</span>
                    <span>Kitablardan ekranlara keçid</span>
                </nav>

                <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>

                {/* Main Content */}
                <main id="#main-content" className="overflow-hidden space-y-5">
                    <section className="relative">
                        <img src="/jpg/racebanner.jpg" alt="Race Image" className="w-full h-[20rem] rounded-2xl object-cover" />
                        <h1 className="absolute bottom-5 left-5 text-2xl font-regmed bg-primary px-7 py-2 rounded-lg backdrop-blur-xl bg-white/60">
                            Kitablardan ekranlara keçid
                        </h1>
                    </section>

                    <section className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-2xl border border-gray-30">
                        {/* Left Content */}
                        <div className="lg:col-span-2">
                            <TabSelects tabs={TABS} />
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-6">
                            {/* Prize */}
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                                <p className="text-2xl font-semibold">$10,000</p>
                                <p className="text-green-600 mt-2">Award points & Medals</p>
                            </div>

                            {/* Tags */}
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                                <div className="space-x-2">
                                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">#Languages</span>
                                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">#Learn</span>
                                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">#Log loss</span>
                                </div>
                            </div>

                            {/* Table of Content */}
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">Table of content</h3>
                                <ul className="space-y-2">
                                    <li className="text-green-600">Description</li>
                                    <li>Evaluation</li>
                                    <li>FAQ</li>
                                    <li>Citation</li>
                                </ul>
                            </div>

                            {/* Join Button */}
                            <button
                                className="flex w-full text-center justify-center items-center px-6 py-3 text-white transition-all bg-primary rounded-lg hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                                aria-label="Join the Race"
                            >
                                Join the Race
                            </button>
                        </div>
                    </section>

                    <section className="container pt-20 px-auto space-y-10">
                        <div className="flex justify-between">
                            <div className="space-y-3">
                                <h2 className="text-[32px] md:text-[2.3rem]">Featured <span className="font-medium">Competitions</span></h2>
                                <p className="text-md text-gray-700">Get ready for an exciting race</p>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
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
        </div>
    );
};

export default RaceDetails;