"use client"; // This makes the component a Client Component
import React from 'react';
import { usePathname } from 'next/navigation';
import { InstagramIcon, LogoWhite } from '@assets/icons';
import Link from 'next/link';


export const Footer: React.FC = () => {
    const pathname = usePathname();

    // List of routes where the header should be hidden
    const hideHeaderRoutes = ["/sign-in", "/sign-up"];

    if (!hideHeaderRoutes.includes(pathname)) {
        return (
            <footer className="bg-dark">
                <div className="container mx-auto w-full py-[50px] space-y-12">
                    <div className="grid gap-10 grid-cols-[3fr_2fr_2fr_1fr] text-white">
                        <div className="space-y-6 pr-40">
                            <LogoWhite />
                            <p className="font-light">
                                DataRace is an innovative platform designed to bring data scientists and Al enthusiasts together to compete in data-driven challenges.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h2 className="font-semibold">Company</h2>
                            <ul className="font-light space-y-3">
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
                            <ul className="font-light space-y-3">
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
                            <ul className="font-light space-y-3">
                                <li>
                                    <Link href="#" className="hover:text-primary">E-mail</Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-primary">Number</Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-primary">Address</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid gap-10 grid-cols-[7fr_1fr]">
                        <span className="text-gray-400">DataRace</span>
                        <div className="flex sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
                            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <InstagramIcon />
                                <span className="sr-only">Facebook page</span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }

    return null;
}