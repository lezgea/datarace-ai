import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: "DataRace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and Al enthusiasts together to compete in data-driven challenges.",
};


const Home: React.FC = () => {
    var a = 5
    // var a = 3
    console.log(a)

    return (
        <div className="min-h-screen flex flex-col">
            <Head>
                <title>Home Page</title>
                <meta name="description" content="Your description here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex-grow bg-gray-50 py-40">
                <section className="flex w-full justify-between items-center text-center">
                    <a className="flex items-center">
                        <Image src="/svg/team-brainstorming.svg" alt="Team Brainstorming" width={400} height={200} />
                    </a>
                    <div className='px-20 space-y-7'>
                        <h1 className="text-5xl font-bold">Join the race to AI excellence</h1>
                        <p className="text-lg text-gray-700">DataRace is an innovative platform designed to bring data scientists and Al enthusiasts together to compete in data-driven challenges.</p>
                        <button type="button" className="inline-flex w-auto text-center items-center px-6 py-3 text-white transition-all bg-gray-900 dark:bg-white dark:text-gray-800 rounded-xl shadow-md shadow-neutral-300 sm:w-auto hover:bg-gray-900 hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-xl hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none focus:bg-blue-500">
                            See races
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center">
                        <Image src="/svg/human-right.svg" alt="Human Right" width={300} height={200} />
                    </div>
                </section>

                <section className="container mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="p-8 bg-white shadow-md rounded-lg text-center">
                        <h2 className="text-xl font-semibold mb-2">Feature 1</h2>
                        <p className="text-gray-600">Short description of feature 1</p>
                    </div>
                    <div className="p-8 bg-white shadow-md rounded-lg text-center">
                        <h2 className="text-xl font-semibold mb-2">Feature 2</h2>
                        <p className="text-gray-600">Short description of feature 2</p>
                    </div>
                    <div className="p-8 bg-white shadow-md rounded-lg text-center">
                        <h2 className="text-xl font-semibold mb-2">Feature 3</h2>
                        <p className="text-gray-600">Short description of feature 3</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
