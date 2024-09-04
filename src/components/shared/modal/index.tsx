import React, { useState } from "react";


interface IModalProps {
    visible: boolean,
    content: React.ReactNode,
    onClose: () => void,
}

export const Modal: React.FC<IModalProps> = (props) => {
    let { visible, content, onClose } = props;

    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Close the modal when clicking on the background (outside the modal content)
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            {visible ? (
                <>
                    <div onClick={handleBackgroundClick} className="flex h-full justify-center items-center overflow-x-hidden fixed top-0 inset-0 z-50 outline-none focus:outline-none bg-[rgba(0,0,0,.5)] animate-opacity">
                        <div className="relative w-auto mx-auto">
                            <div className="min-w-[400px] min-h-[50px] border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {content}
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

