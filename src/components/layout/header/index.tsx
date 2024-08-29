"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserProfile } from '../user-profile';
import { useAuthenticate } from 'hooks/use-auth';

const NAV_ROUTES: { route: string; label: string }[] = [
    { route: '/', label: 'About Us' },
    { route: '/races', label: 'Races' },
    { route: '/courses', label: 'Courses' },
    { route: '/community', label: 'Community' },
    { route: '/faq', label: 'FAQ' },
    { route: '/contact', label: 'Contact' },
];

export const Header: React.FC = () => {
    const pathname = usePathname();
    useAuthenticate();

    const hideHeaderRoutes = React.useMemo(() => ["/sign-in", "/sign-up"], []);
    const shouldHideHeader = hideHeaderRoutes.includes(pathname);

    // Ensure all hooks are called regardless of the condition
    const navLinks = React.useMemo(() => {
        return NAV_ROUTES.map((item, i) => (
            <li key={i} className="relative flex items-center space-x-3">
                {pathname === item.route && (
                    <div className="absolute left-0 w-[7px] h-[7px] rounded-full bg-primary" aria-hidden="true" />
                )}
                <Link href={item.route} className={`text-gray-600 hover:text-primary transition-all duration-200 ease-in-out ${pathname === item.route ? 'font-medium' : ''}`}>
                    {item.label}
                </Link>
            </li>
        ));
    }, [pathname]);

    // Return null only inside the render
    if (shouldHideHeader) return null;

    return (
        <header className="backdrop-blur-xl bg-white/60 w-full fixed z-10 h-[65px] border-b border-gray-200 select-none">
            <nav role="navigation" aria-label="Main navigation" className="container w-full mx-auto flex justify-between items-center py-0 h-full space-x-5">
                <Link href="/" passHref className="flex items-center cursor-pointer w-full md:w-[20%]">
                    <Image src="/svg/datarace-logo.svg" alt="Logo" width={200} height={50} priority className="h-auto w-auto" />
                </Link>

                <ul className="flex space-x-10 items-center">
                    {navLinks}
                </ul>

                <div className="flex items-center justify-end w-[20%] h-full">
                    <UserProfile />
                </div>
            </nav>
        </header>
    );
};
