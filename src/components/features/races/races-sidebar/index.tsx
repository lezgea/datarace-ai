import Divider from '@components/shared/divider';
import { RootState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';

interface IRacesSidebarProps {
    visible: boolean;
    setSidebarOpen: (val: boolean) => void;
}


export const RacesSidebar: React.FC<IRacesSidebarProps> = ({ visible, setSidebarOpen }) => {
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const { loading: competitionLoading, competitionInfo } = useSelector((state: RootState) => state.competitions);


    const handleFileUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setSidebarOpen]);


    return (
        <div
            data-testid="sidebar-overlay"
            className={`fixed inset-0 z-20 bg-[rgba(0,0,0,.5)] top-[65px] transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                className={`fixed top-0 right-0 w-[60%] h-full items-between bg-white shadow-xl py-8 transition-transform transform ${visible ? 'translate-x-0' : 'translate-x-full'}`}
                ref={sidebarRef}
                onClick={(e) => e.stopPropagation()} // Prevent event propagation
            >
                <div className="h-auto mt-8 p-5 space-y-4">
                    <div className="relative border rounded-2xl">
                        <img src={competitionInfo?.imageUrl || "/svg/noimg_large.svg"} alt={competitionInfo?.name} className="w-full h-[10rem] rounded-2xl object-cover" />
                    </div>
                    <h2 className="text-2xl font-regmed">
                        {competitionInfo?.name}
                    </h2>
                    <p className="text-sm mb-2">{competitionInfo?.text}</p>
                    <Divider />
                    <h2 className="text-2xl font-regmed text-center">
                        Upload your solution
                    </h2>
                    <p className="text-sm mb-2 text-center px-10">
                        You can upload your solution and submit your project.
                        Bear in mind you can only submit one solution for each project. Before submission you can save your project and replace file but after submission it will not possible.
                    </p>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                                console.log('Selected file:', files[0]);
                            }
                        }}
                    />
                    <button
                        type="button"
                        className="inline-flex w-auto text-center items-center px-10 py-2 text-white transition-all bg-primary rounded-lg sm:w-auto hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none"
                        onClick={handleFileUploadClick}
                    >
                        Browse files
                    </button>
                </div>
                <div className="bg-white absolute w-full bottom-0 shadow-[0px_-2px_10px_0px_rgba(0,0,0,0.10)]">
                    <div className="flex space-x-3 p-5">
                        <button type="button" className="inline-flex w-auto text-center items-center px-10 py-2 text-white transition-all bg-primary rounded-lg sm:w-auto hover:bg-primaryDark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                            Submit
                        </button>
                        <button onClick={() => setSidebarOpen(false)} className="hidden md:inline-flex w-auto text-center items-center px-10 py-2 text-white transition-all bg-gray-800 rounded-lg sm:w-auto hover:bg-dark hover:text-white shadow-neutral-300 dark:shadow-neutral-700 hover:shadow-lg hover:shadow-neutral-300 hover:-tranneutral-y-px focus:shadow-none">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
