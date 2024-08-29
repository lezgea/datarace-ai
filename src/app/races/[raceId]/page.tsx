import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Race Details | DataRace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
};


const RaceDetails: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto py-20">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-600 mb-4">
                    <a href="/" className="hover:underline">Main page</a> &gt;
                    <a href="/races" className="hover:underline"> Races</a> &gt;
                    Kitablardan ekranlara keçid
                </nav>

                <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>

                {/* Main Content */}
                <main id="#main-content" className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="relative">
                        <img src="/path-to-image.jpg" alt="Race Image" className="w-full h-64 object-cover" />
                        <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                            Kitablardan ekranlara keçid
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Content */}
                        <div className="lg:col-span-2">
                            {/* Tabs */}
                            <div className="flex space-x-6 border-b-2 border-gray-200 mb-6">
                                <button className="pb-2 text-green-600 border-b-2 border-green-600">General overview</button>
                                <button className="pb-2 text-gray-600">Data</button>
                                <button className="pb-2 text-gray-600">Rules</button>
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">Description</h2>
                                <p className="text-gray-700">
                                    Arcu dictumst ac imperdiet egestas scelerisque dui vitae turpis purus. Dui dui vel ultricies augue consectetur dignissim lectus senectus at...
                                </p>
                                {/* Additional paragraphs can be added similarly */}
                            </div>

                            {/* Accordion (Evaluation, FAQ, Citation) */}
                            <div className="mt-8 space-y-4">
                                <div>
                                    <button className="w-full flex justify-between items-center text-left font-semibold text-lg">
                                        Evaluation <span>+</span>
                                    </button>
                                </div>
                                <div>
                                    <button className="w-full flex justify-between items-center text-left font-semibold text-lg">
                                        FAQ <span>+</span>
                                    </button>
                                </div>
                                <div>
                                    <button className="w-full flex justify-between items-center text-left font-semibold text-lg">
                                        Citation <span>+</span>
                                    </button>
                                </div>
                            </div>
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
