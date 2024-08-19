import React from 'react';
import Image from 'next/image';


export const Header: React.FC = () => {
    return (
        <header className="backdrop-blur-xl bg-white/60 w-full fixed z-10">
            <nav className="container mx-auto flex justify-between items-center py-4">
                <a className="flex items-center cursor-pointer" href="/">
                    <Image src="/svg/datarace-logo.svg" alt="Logo" width={150} height={50} />
                </a>
                <ul className="flex space-x-10">
                    <li><a href="/about-us" className="text-gray-600 hover:text-gray-900">About Us</a></li>
                    <li><a href="/courses" className="text-gray-600 hover:text-gray-900">Courses</a></li>
                    <li><a href="/community" className="text-gray-600 hover:text-gray-900">Community</a></li>
                    <li><a href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</a></li>
                    <li><a href="/contact-us" className="text-gray-600 hover:text-gray-900">Contact Us</a></li>
                </ul>
                <button type="button" className="inline-flex w-auto text-center items-center px-5 py-2 text-white transition-all bg-gray-900 dark:bg-white dark:text-gray-800 rounded-lg shadow-md shadow-neutral-300 sm:w-auto hover:bg-blue-500 hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none focus:bg-blue-500">
                    Sign In
                </button>
            </nav>
        </header>
    )
}
