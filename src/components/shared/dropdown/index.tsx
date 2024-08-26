import Link from 'next/link';
import React, { useState, ReactNode } from 'react';
import Divider from '../divider';

interface DropdownProps {
    width?: number;
    button?: ReactNode;
    items: { label: string; route: string }[];
    children?: ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ width = 200, button, items, children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div onClick={toggleDropdown}>
                {children} {/* Renders children element */}
            </div>

            {isOpen && (
                <div
                    className={`origin-top-right absolute right-0 mt-2 w-[${width}px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 transition-all duration-500 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-10 opacity-0'
                        }`}
                >
                    <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {items.map((item, index) => (
                            <Link
                                key={index}
                                href={item.route}
                                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-500 rounded-md transition-all duration-200 ease-in-out"
                                role="menuitem"
                                onClick={() => setIsOpen(false)} // Close dropdown on item click
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Divider />
                        {button && (
                            <div className="mt-2">
                                {button} {/* Additional btn */}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
