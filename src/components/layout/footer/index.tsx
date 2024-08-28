"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const InstagramIcon = dynamic(() => import('@assets/icons').then(mod => mod.InstagramIcon), { ssr: false });
const TwitterIcon = dynamic(() => import('@assets/icons').then(mod => mod.TwitterIcon), { ssr: false });
const YoutubeIcon = dynamic(() => import('@assets/icons').then(mod => mod.YoutubeIcon), { ssr: false });
const LinkedinIcon = dynamic(() => import('@assets/icons').then(mod => mod.LinkedinIcon), { ssr: false });
const LogoWhite = dynamic(() => import('@assets/icons').then(mod => mod.LogoWhite), { ssr: false });


export const Footer: React.FC = () => {
    const pathname = usePathname();

    const hideHeaderRoutes = React.useMemo(() => ["/sign-in", "/sign-up"], []);
    const shouldHideFooter = React.useMemo(() => hideHeaderRoutes.includes(pathname), [pathname]);

    if (shouldHideFooter) return null;

    return (
        <footer className="bg-dark" role="contentinfo">
            <div className="container mx-auto w-full py-[50px] space-y-12">
                <section className="grid gap-10 grid-cols-[3fr_2fr_2fr_1fr] text-white">
                    <div className="space-y-6 pr-40">
                        <LogoWhite aria-hidden="true" />
                        <p className="font-light text-sm">
                            DataRace is an innovative platform designed to bring data scientists and AI enthusiasts together to compete in data-driven challenges.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h2 className="font-semibold">Company</h2>
                        <ul className="text-sm font-light space-y-4">
                            <li>
                                <Link href="/about-us" className="hover:text-primary">About</Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-primary">FAQ</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">Terms and privacy policy</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h2 className="font-semibold">Races</h2>
                        <ul className="text-sm font-light space-y-4">
                            <li>
                                <Link href="/races" className="hover:text-primary">Active races</Link>
                            </li>
                            <li>
                                <Link href="/courses" className="hover:text-primary">Courses</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">Proqram təminatı mühəndisliyi</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h2 className="font-semibold">Contact us</h2>
                        <ul className="text-sm font-light space-y-4">
                            <li>
                                <Link href="#" className="hover:text-primary">Email</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">Phone</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">Address</Link>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="grid gap-10 grid-cols-[7fr_1fr]">
                    <span className="text-gray-400">DataRace</span>
                    <div className="flex sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
                        <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <InstagramIcon />
                            <span className="sr-only">Instagram page</span>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <TwitterIcon />
                            <span className="sr-only">Twitter page</span>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <YoutubeIcon />
                            <span className="sr-only">Youtube page</span>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <LinkedinIcon />
                            <span className="sr-only">LinkedIn page</span>
                        </a>
                    </div>
                </section>
            </div>
        </footer>
    );
};
