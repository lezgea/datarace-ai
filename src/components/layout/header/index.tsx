"use client"; // This makes the component a Client Component
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserProfile } from '../user-profile';
import { Dropdown } from '@components/shared/dropdown';


const NAV_ROUTES: { route: string; label: string }[] = [
    { route: '/about-us', label: 'About Us' },
    { route: '/courses', label: 'Courses' },
    { route: '/community', label: 'Community' },
    { route: '/faq', label: 'FAQ' },
    { route: '/contact-us', label: 'Contact Us' },
];

const DROPDOWN_MENU: { route: string; label: string }[] = [
    { route: '/profile', label: 'Profile' },
    { route: '/races', label: 'Races' },
];


export const Header: React.FC = () => {
    const pathname = usePathname();

    // List of routes where the header should be hidden
    const hideHeaderRoutes = ["/sign-in", "/sign-up"];


    if (!hideHeaderRoutes.includes(pathname)) {
        return (
            <header className="backdrop-blur-xl bg-white/60 w-full fixed z-10 h-[65px]">
                <nav className="container mx-auto flex justify-between items-center py-0 h-full">
                    <Link href="/" passHref className="flex items-center cursor-pointer w-[20%]">
                        <Image src="/svg/datarace-logo.svg" alt="Logo" width={200} height={50} priority />
                    </Link>
                    <ul className="flex space-x-10">
                        {
                            NAV_ROUTES.map((item, i) =>
                                <li key={i}>
                                    <Link href={item.route} className="text-gray-600 hover:text-gray-900">
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                    <div className="flex items-center justify-end w-[20%] h-full">
                        <Dropdown
                            items={DROPDOWN_MENU}
                            button={
                                <button className="flex w-full text-sm text-medium text-center justify-center px-5 py-2 text-gray-500 transition-all bg-gray-100 dark:bg-white dark:text-gray-800 rounded-lg hover:bg-blue-500 hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none focus:bg-blue-500">
                                    Sign Out
                                </button>
                            }
                        >
                            <UserProfile
                                name="Surname F."
                                image="/png/pic1.png"
                            />
                        </Dropdown>
                    </div>
                </nav>
            </header>
        )
    }
    return null;
}

