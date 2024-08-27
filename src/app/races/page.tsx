import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Loader } from '@components/shared';


export const metadata: Metadata = {
    title: "Races | Datarace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and Al enthusiasts together to compete in data-driven challenges.",
};


const Races: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <div className="min-h-screen flex flex-col">
                <main className="flex-grow bg-gray-50 py-40">
                    <section className="container mx-auto text-center">
                        <h1 className="text-4xl font-medium mb-4">Races</h1>
                        <p className="text-lg text-gray-700 mb-8">Some amazing description goes here</p>
                    </section>
                </main>
            </div>
        </Suspense>
    );
};

export default Races;
