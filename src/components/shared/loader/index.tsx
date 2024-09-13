import Image from 'next/image';
import React from 'react';


export const Loader: React.FC = () => {
    return (
        <div className="loader-page-wrapper w-screen min-h-screen bg-white/3">
            <div className="loader-wrapper">
                <div className="overflow-box"></div>
                <Image src="/svg/race.svg" alt="Logo" className="loader" width={80} height={50} priority />
            </div>
        </div>

    )
}