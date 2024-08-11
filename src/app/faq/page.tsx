import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: "Datarace.ai | About Us",
    description: "DataRace is an innovative platform designed to bring data scientists and Al enthusiasts together to compete in data-driven challenges.",
};


const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Head>
                <title>Home Page</title>
                <meta name="description" content="Your description here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="bg-white shadow-md">
                <nav className="container mx-auto flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Image src="/logo.png" alt="Logo" width={120} height={40} />
                    </div>
                    <ul className="flex space-x-6">
                        <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-gray-900">Courses</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-gray-900">Community</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-gray-900">FAQ</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact Us</a></li>
                    </ul>
                </nav>
            </header>

            <main className="flex-grow bg-gray-50 py-16">
                <section className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
                    <p className="text-lg text-gray-700 mb-8">Your amazing product description goes here.</p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                        Get Started
                    </button>
                </section>

                <section className="container mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
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

            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 Your Company Name. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
