import React from 'react';


export const UserProfileSkeleton = React.FC = () => {
    return (
        <div className="flex items-center justify-end w-[20%] h-full">
            <div className="flex items-center space-x-3">
                <div className="w-[80px] h-[20px] bg-gray-200 rounded-full"></div> {/* Placeholder for name */}
                <div className="relative w-[40px] h-[40px] rounded-full bg-gray-200 overflow-hidden"></div> {/* Placeholder for avatar */}
            </div>
        </div>
    )
}