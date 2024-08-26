import React, { useState, ReactNode } from 'react';


interface DropdownProps {
    content?: ReactNode;
    children: ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ content, children }) => {
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
            {
                isOpen &&
                <div className={`origin-top-right absolute right-0 mt-2 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 transition-all duration-500 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-10 opacity-0'}`}>
                    {content}
                </div>
            }
        </div>
    );
};
