import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Metadata } from 'next';
import { CategoriesSection, CompetitionsSection } from '@components/features/home';

export const metadata: Metadata = {
    title: "Races | DataRace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.",
};

// Dynamic imports for better performance
const TeamBrainStorm = dynamic(() => import('@assets/icons/team-brainstorm.svg').then(mod => mod.default));
const TeamBrainstorming = dynamic(() => import('@assets/icons/team-brainstorming.svg').then(mod => mod.default));
const HumanRight = dynamic(() => import('@assets/icons/human-right.svg').then(mod => mod.default));
const RaceSelect = dynamic(() => import('@components/shared/race-select').then(mod => mod.default), { ssr: false });
const RaceItem = dynamic(() => import('@components/shared/race-item').then(mod => mod.default), { ssr: false });


interface IRaceItemType {
    title: string;
    description: string;
    img: string;
    price: string;
    expiry_date: string;
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
];

const Races: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
            <main id="main-content" className="flex-grow bg-gray-50 px-5 py-20 md:px-0 md:py-[7rem] space-y-20">
                <section className="container mx-auto w-full space-y-10">
                    <div className="flex justify-between">
                        <div className="space-y-3">
                            <h2 className="text-[32px] md:text-[2.3rem]">Choose your <span className="font-medium">Competitions</span></h2>
                            <p className="text-md text-gray-700">Get ready for an exciting race</p>
                        </div>
                    </div>
                    <CategoriesSection />
                </section>

                <section className="container mx-auto text-center space-y-10">
                    <CompetitionsSection />
                </section>
            </main>
        </div>
    );
};

export default Races;
