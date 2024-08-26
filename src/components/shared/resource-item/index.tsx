import React from 'react';


interface IResourceItemProps {
    title: string;
    description: string;
    img: string;
    duration: string,
    guided: string | number,
};

export const ResourceItem: React.FC<IResourceItemProps> = (props) => {
    let { title, description, img, duration, guided } = props

    return (
        <div className="flex flex-col min-w-[300px] max-w-[300px] items-center justify-center h-md bg-white rounded-custom_md cursor-pointer border border-gray-200 shadow-sm hover:shadow-lg group p-5 space-y-3">
            <img
                src={img}
                alt="Feature 1"
                className="w-50 transition-transform duration-300 ease-in-out transform group-hover:scale-110"
            />
            <p className="text-[20px] text-customBlue-900 text-center">{title}</p>
            <p className="text-[12px] text-gray-500 text-center">{description}</p>
            <div className='flex justify-between items-center w-full pt-5'>
                <p className="text-[22px] font-medium text-customBlue-900">{duration}</p>
                <p className="bg-customBlue-500 text-sm content-center px-4 rounded-xl text-white">{guided}</p>
            </div>
        </div>
    )
};