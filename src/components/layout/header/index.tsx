"use client"; // This makes the component a Client Component
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserProfile } from '../user-profile';
import { Dropdown } from '@components/shared/dropdown';
import { CloseIcon, HamburgerIcon } from '@assets/icons';
import { useRouter } from 'next/navigation';


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
    const router = useRouter();

    // List of routes where the header should be hidden
    const hideHeaderRoutes = ["/sign-in", "/sign-up"];


    if (!hideHeaderRoutes.includes(pathname)) {
        return (
            <header className="backdrop-blur-xl bg-white/60 w-full fixed z-10 h-[65px] border-b border-gray-200 select-none">
                <nav className="container w-full mx-auto flex justify-between items-center py-0 h-full space-x-5">
                    {/* <HamburgerIcon className="flex lg:hidden" /> */}
                    {/* <CloseIcon className="flex lg:hidden" /> */}
                    <Link href="/" passHref className="flex items-center cursor-pointer w-full md:w-[20%]">
                        <Image src="/svg/datarace-logo.svg" alt="Logo" width={200} height={50} priority />
                    </Link>
                    {
                        NAV_ROUTES.map((item, i) => (
                            <li key={i} className="flex items-center space-x-1.5">
                                {pathname === item.route && (
                                    <div className="w-[7px] h-[7px] rounded-full bg-primary" />
                                )}
                                <Link href={item.route} className={`text-gray-600 hover:text-primary transition-all duration-200 ease-in-out ${pathname === item.route ? 'font-medium' : ''}`}>
                                    {item.label}
                                </Link>
                            </li>
                        ))
                    }
                    <div className="flex items-center justify-end w-[20%] h-full">
                        <UserProfile
                            name="Surname F."
                            image="/png/pic1.png"
                        />
                    </div>
                </nav>
            </header>
        )
    }
    return null;
}

