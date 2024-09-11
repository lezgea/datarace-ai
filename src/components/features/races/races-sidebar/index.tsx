import Divider from '@components/shared/divider';
import { RootState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import DragAndDropSection from '../drag-drop-section';
import { Loader } from '@components/shared';


interface IRacesSidebarProps {
    visible: boolean;
    setSidebarOpen: (val: boolean) => void;
}

export const RacesSidebar: React.FC<IRacesSidebarProps> = ({ visible, setSidebarOpen }) => {
    const sidebarRef = React.useRef<HTMLDivElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const { loading: competitionLoading, competitionInfo } = useSelector((state: RootState) => state.competitions);
    // const { loading: isFilesLoading } = useSelector((state: RootState) => state.uploads);


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


    // if (isFilesLoading) return <Loader />

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
                <div className="h-screen mt-8 px-5 pt-5 pb-[200px] space-y-4 overflow-auto">
                    <div className="relative border rounded-2xl">
                        <img src={competitionInfo?.imageUrl || "/svg/noimg_large.svg"} alt={competitionInfo?.name} className="w-full h-[10rem] rounded-2xl object-cover" />
                    </div>
                    <h2 className="text-2xl font-regmed">{competitionInfo?.name}</h2>
                    <p className="text-sm font-light mb-2 truncate-text">{competitionInfo?.text}</p>
                    <Divider />
                    <h2 className="text-2xl font-regmed text-center">Upload your solution</h2>
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

                    {
                        visible &&
                        <DragAndDropSection onClose={() => setSidebarOpen(false)} />
                    }
                </div>
            </div>
        </div>
    );
};
