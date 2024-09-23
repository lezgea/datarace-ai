import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Loader } from '@components/shared';
import Link from 'next/link';
import { AboutSection } from '@components/features/about';


export const metadata: Metadata = {
    title: "About Us | Datarace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and Al enthusiasts together to compete in data-driven challenges.",
};


const AboutUs: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <div className="min-h-screen flex flex-col">
                <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
                <main id="main-content" className="container mx-auto flex-grow px-5 py-10 md:px-0 md:py-[6rem]">
                    <h1 className="text-[32px] md:text-[2.3rem] font-medium">About Us</h1>
                    {/* Breadcrumb */}
                    <nav className="text-sm flex justify-start items-center text-gray-600 space-x-3">
                        <Link href="/" className="hover:text-primaryLight">Main page</Link>
                        <span className="text-lg">&gt;</span>
                        <span>About Us</span>
                    </nav>
                    <AboutSection description="Welcome to Datarace, a competitive platform powered by the Azerbaijan Artificial Intelligence Laboratory (AILab). We are dedicated to advancing data science and artificial intelligence by offering a space where enthusiasts, researchers, and professionals can collaborate, compete, and innovate." />
                    <AboutSection description="Datarace hosts a range of exciting AI competitions, giving participants the chance to solve real-world challenges and showcase their skills. From predictive analytics to cutting-edge machine learning models, these competitions span various AI applications. To motivate and reward excellence, Datarace offers attractive prizes for top performers, driving innovation and pushing the limits of AI technology." />
                    <AboutSection description="Whether you're a beginner or an expert, Datarace provides the tools and opportunities to accelerate your growth in the AI field. Join us, compete with the best, win prizes, and be part of the future of artificial intelligence!" />
                </main>
            </div>
        </Suspense>
    );
};

export default AboutUs;
