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
                            items={[{ label: 'test', href: '/' }]}
                        >
                            <UserProfile
                                name="Surname F."
                                image="/png/pic1.png"
                            />
                        </Dropdown>

                        {/* <div className="relative inline-block text-left">
                            <div>
                                <button onClick={() => { }} className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Options
                                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M10 3a1 1 0 01.707 1.707l-3.293 3.293H16a1 1 0 110 2H7.414l3.293 3.293A1 1 0 0110 17a1 1 0 01-.707-.293l-5-5a1 1 0 010-1.414l5-5A1 1 0 0110 3z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            <div id="dropdownMenu" className="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Item 1</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Item 2</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Item 3</a>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </nav>
            </header>
        )
    }
    return null;
}

