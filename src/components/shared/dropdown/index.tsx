import React, { useState, ReactNode } from 'react';


interface DropdownProps {
    button?: ReactNode;
    items: { label: string; href?: string }[];
    children?: ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ button, items, children }) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
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
                {children}
            </div>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {items.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                {item.label}
                            </a>
                        ))}
                        {button && (
                            <div className="mt-2">
                                {button} {/* Render children elements */}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
