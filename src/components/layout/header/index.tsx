"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserProfile } from '../user-profile';
import { useAuthenticate } from '@hooks/use-auth';
import { CloseIcon, HamburgerIcon } from '@assets/icons';
import { Sidebar } from '../sidebar';


const NAV_ROUTES: { route: string; label: string }[] = [
    { route: '/about-us', label: 'About Us' },
    { route: '/races', label: 'Races' },
    { route: '/faq', label: 'FAQ' },
    { route: '/contact', label: 'Contact' },
];


export const Header: React.FC = () => {
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = React.useState(false);

    const hideHeaderRoutes = React.useMemo(() => ["/sign-in", "/sign-up", "/success"], []);
    const shouldHideHeader = hideHeaderRoutes.includes(pathname);

    const navLinks = React.useMemo(() => {
        return NAV_ROUTES.map((item, i) => (
            <li key={i} className="relative flex items-center space-x-3">
                {pathname === item.route && (
                    <div className="absolute left-0 w-[7px] h-[7px] rounded-full bg-primaryLight" aria-hidden="true" />
                )}
                <Link href={item.route} className={`text-gray-600 hover:text-primaryLight transition-all duration-200 ease-in-out ${pathname === item.route ? 'font-medium' : ''}`}>
                    {item.label}
                </Link>
            </li>
        ));
    }, [pathname]);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    if (shouldHideHeader) return null;

    return (
        <>
            <header className="backdrop-blur-xl bg-white/60 w-full fixed z-30 h-[65px] border-b border-gray-200 select-none">
                <nav role="navigation" aria-label="Main navigation" className="container w-full mx-auto flex justify-between items-center px-3 py-0 h-full space-x-5 md:px-0">
                    <div className="flex items-center cursor-pointer lg:w-[20%] space-x-3 lg:space-x-0">
                        <div className="w-[30px] ml-3 flex lg:hidden">
                            {
                                isSidebarOpen
                                    ? <CloseIcon onClick={toggleSidebar} data-testid="close-icon" />
                                    : <HamburgerIcon onClick={toggleSidebar} data-testid="hamburger-icon" />
                            }
                        </div>
                        <Link href="/" passHref>
                            <Image src="/svg/datarace-logo.svg" alt="Logo" width={200} height={50} priority className="h-auto w-[160px] lg:w-[180px]" />
                        </Link>
                    </div>

                    <ul className="hidden lg:flex space-x-10 items-center">
                        {navLinks}
                    </ul>

                    <div className="flex items-center justify-end lg:w-[20%] h-full">
                        <UserProfile />
                    </div>
                </nav>
            </header>

            <div className="lg:hidden">
                <Sidebar
                    navLinks={navLinks}
                    visible={isSidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
            </div>
        </>
    );
};
