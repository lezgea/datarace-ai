import React from 'react';
import { DropIcon, EducationIcon, EnvironmentIcon, RaceIcon, StarsIcon, TechIcon } from '@assets/icons';


interface IRaceSelectProps {
    id: number;
    name: string;
    competitionsCount: number;
    children: IRaceSelectProps[];
    type?: string,
}


const RaceSelect: React.FC<IRaceSelectProps> = (props) => {
    let { type } = props;

    switch (type) {
        case "All races": return <RaceTypeSelect {...props} />;
        case "Environment": return <EnvironmentTypeSelect {...props} />;
        case "Education": return <EducationTypeSelect {...props} />;
        case "Oil & Industry": return <IndustryTypeSelect {...props} />;
        case "Technology": return <TechTypeSelect {...props} />;
        default: return null;
    }
};

export default RaceSelect


const RaceTypeSelect: React.FC<IRaceSelectProps> = ({ name, competitionsCount }) => {
    return (
        <div className={`md:min-w-[250px] md:w-[250px] h-md px-6 py-4 flex rounded-2xl border border-gray-200 cursor-pointer shadow-sm hover:bg-[#FFB54D] transition-all duration-300 ease-in-out transform group`}>
            <div className="flex-shrink-0 transition-all duration-300 ease-in-out transform">
                <RaceIcon className="text-current transition-colors duration-200 ease-in-out group-hover:fill-white" fill={"#FFB54D"} />
            </div>
            <div className="column px-4">
                <p className="text-md font-medium transition-colors duration-200 ease-in-out group-hover:text-white">
                    {name}
                </p>
                <p className="text-md text-gray-400 transition-colors duration-200 ease-in-out group-hover:text-white">
                    {competitionsCount} races
                </p>
            </div>
        </div>
    );
}

const EnvironmentTypeSelect: React.FC<IRaceSelectProps> = ({ name, competitionsCount }) => {
    return (
        <div className={`md:min-w-[250px] md:w-[250px] h-md px-6 py-4 flex rounded-2xl border border-gray-200 cursor-pointer shadow-sm hover:bg-[#419A62] transition-all duration-300 ease-in-out transform group`}>
            <div className="flex-shrink-0 transition-all duration-300 ease-in-out transform">
                <EnvironmentIcon className="text-current transition-colors duration-200 ease-in-out group-hover:fill-white" fill={"#419A62"} />
            </div>
            <div className="column px-4">
                <p className="text-md font-medium transition-colors duration-200 ease-in-out group-hover:text-white">
                    {name}
                </p>
                <p className="text-md text-gray-400 transition-colors duration-200 ease-in-out group-hover:text-white">
                    {competitionsCount} races
                </p>
            </div>
        </div>
    );
}

const EducationTypeSelect: React.FC<IRaceSelectProps> = ({ name, competitionsCount }) => {
    return (
        <div className={`md:min-w-[250px] md:w-[250px] h-md px-6 py-4 flex rounded-2xl border border-gray-200 cursor-pointer shadow-sm hover:bg-[#5D66EA] transition-all duration-300 ease-in-out transform group`}>
            <div className="flex-shrink-0 transition-all duration-300 ease-in-out transform">
                <EducationIcon className="text-current transition-colors duration-200 ease-in-out group-hover:fill-white" fill={"#5D66EA"} />
            </div>
            <div className="column px-4">
                <p className="text-md font-medium transition-colors duration-200 ease-in-out group-hover:text-white">
                    {name}
                </p>
                <p className="text-md text-gray-400 transition-colors duration-200 ease-in-out group-hover:text-white">
                    {competitionsCount} races
                </p>
            </div>
        </div>
    );
}

const IndustryTypeSelect: React.FC<IRaceSelectProps> = ({ name, competitionsCount }) => {
    return (
        <div className={`md:min-w-[250px] md:w-[250px] h-md px-6 py-4 flex rounded-2xl border border-gray-200 cursor-pointer shadow-sm hover:bg-[#57566D] transition-all duration-300 ease-in-out transform group`}>
            <div className="flex-shrink-0 transition-all duration-300 ease-in-out transform">
                <DropIcon className="text-current transition-colors duration-200 ease-in-out group-hover:fill-white" fill={"#57566D"} />
            </div>
            <div className="column px-4">
                <p className="text-md font-medium transition-colors duration-200 ease-in-out group-hover:text-white">
                    {name}
                </p>
                <p className="text-md text-gray-400 transition-colors duration-200 ease-in-out group-hover:text-white">
                    {competitionsCount} races
                </p>
            </div>
        </div>
    );
}

const TechTypeSelect: React.FC<IRaceSelectProps> = ({ name, competitionsCount }) => {
    return (
        <div className={`md:min-w-[250px] md:w-[250px] h-md px-6 py-4 flex rounded-2xl border border-gray-200 cursor-pointer shadow-sm hover:bg-[#774CDC] transition-all duration-300 ease-in-out transform group`}>
            <div className="flex-shrink-0 transition-all duration-300 ease-in-out transform">
                <TechIcon className="text-current transition-colors duration-200 ease-in-out group-hover:fill-white" fill={"#774CDC"} />
            </div>
            <div className="column px-4">
                <p className="text-md font-medium transition-colors duration-200 ease-in-out group-hover:text-white">
                    {name}
                </p>
                <p className="text-md text-gray-400 transition-colors duration-200 ease-in-out group-hover:text-white">
                    {competitionsCount} races
                </p>
            </div>
        </div>
    );
}
