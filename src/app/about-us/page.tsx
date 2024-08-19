import React from 'react';
import Head from 'next/head';
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: "Datarace.ai | About Us",
    description: "DataRace is an innovative platform designed to bring data scientists and Al enthusiasts together to compete in data-driven challenges.",
};


const AboutUs: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-gray-50 py-40">
                <section className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">About Us</h1>
                    <p className="text-lg text-gray-700 mb-8">Some amazing description goes here</p>
                </section>
            </main>
        </div>
    );
};

export default AboutUs;
