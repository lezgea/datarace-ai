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
                    <div className="relative">
                        <img src="/jpg/racebanner.jpg" alt="Race Image" className="w-full h-[20rem] rounded-2xl object-cover" />
                        <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                            Kitablardan ekranlara keçid
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-2xl border border-gray-30">
                        {/* Left Content */}
                        <div className="lg:col-span-2">
                            {/* Tabs */}
                            {/* <div className="flex space-x-6 border-b-2 border-gray-200 mb-6">
                                <button className="pb-2 text-green-600 border-b-2 border-green-600">General overview</button>
                                <button className="pb-2 text-gray-600">Data</button>
                                <button className="pb-2 text-gray-600">Rules</button>
                            </div> */}

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
                            <div className="text-center">
                                <button className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition">
                                    Join the Race
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default RaceDetails;
