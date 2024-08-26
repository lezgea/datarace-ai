import React, { useState } from 'react';
import Link from 'next/link';



export const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="fixed top-4 right-4 z-50 bg-blue-500 text-white p-2 rounded-lg"
            >
                {isOpen ? 'Close' : 'Open'} Sidebar
            </button>

            <div
                className={`fixed top-0 right-0 w-64 h-screen bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-40`}
            >
                <div className="flex items-center justify-center h-16 border-b border-gray-700">
                    <h1 className="text-2xl font-bold">My App</h1>
                </div>
                <nav className="flex-1 py-4 space-y-2">
                    <Link href="/" className="block px-4 py-2 hover:bg-gray-700 rounded">
                        Dashboard
                    </Link>
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-700 rounded">
                        Profile
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 hover:bg-gray-700 rounded">
                        Settings
                    </Link>
                    <Link href="/logout" className="block px-4 py-2 hover:bg-gray-700 rounded">
                        Logout
                    </Link>
                </nav>
            </div>

            {/* Overlay for when the sidebar is open */}
            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black opacity-50 z-30"
                ></div>
            )}
        </>
    );
};