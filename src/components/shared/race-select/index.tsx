import React from 'react';
import { DropIcon, EducationIcon, EnvironmentIcon, RaceIcon, StarsIcon, TechIcon } from '@assets/icons';
import { setSelectedCategory } from '@slices/category-slice';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


interface IRaceSelectProps {
    id: number;
    name: string;
    competitionsCount: number;
    children: IRaceSelectProps[];
    type?: string,
    selected?: boolean,
    onClick?: () => void,
}


const RaceSelect: React.FC<IRaceSelectProps> = (props) => {
    let { type, id } = props;

    const dispatch = useDispatch();
    const { selectedCategory } = useSelector((state: RootState) => state.categories);

    const selectCategory = (categoryId: number) => {
        dispatch(setSelectedCategory(categoryId));
    };

    switch (type) {
        case "All races": return (
            <RaceTypeSelect
                {...props}
                selected={id == selectedCategory}
                onClick={() => selectCategory(id)} />
        );
        case "Environment": return (
            <EnvironmentTypeSelect
                {...props}
                selected={id == selectedCategory}
                onClick={() => selectCategory(id)} />
        );
        case "Education": return (
            <EducationTypeSelect
                {...props}
                selected={id == selectedCategory}
                onClick={() => selectCategory(id)} />
        );
        case "Oil & Industry": return (
            <IndustryTypeSelect
                {...props}
                selected={id == selectedCategory}
                onClick={() => selectCategory(id)} />
        );
        case "Technology": return (
            <TechTypeSelect
                {...props}
                selected={id == selectedCategory}
                onClick={() => selectCategory(id)} />
        );
        default: return null;
    }
};

export default RaceSelect


const RaceTypeSelect: React.FC<IRaceSelectProps> = ({ selected, name, competitionsCount, onClick }) => {
    return (
        <div onClick={onClick} className={`md:min-w-[250px] md:w-[250px] ${selected ? 'bg-[#FFB54D]' : 'bg-none'} h-md px-6 py-4 flex rounded-2xl border border-gray-200 cursor-pointer shadow-sm hover:bg-[#FFB54D] transition-all duration-300 ease-in-out transform group`}>
            <div className="flex-shrink-0 transition-all duration-300 ease-in-out transform">
                <RaceIcon className={`text-current transition-colors duration-200 ease-in-out group-hover:fill-white ${selected ? 'fill-white' : 'fill-[#FFB54D]'}`} />
            </div>
            <div className="column px-4">
                <p className={`text-md font-medium transition-colors duration-200 ease-in-out group-hover:text-white ${selected ? 'text-white' : 'text-none'}`}>
                    {name}
                </p>
                <p className={`text-md text-gray-400 transition-colors duration-200 ease-in-out group-hover:text-white ${selected ? 'text-white' : 'text-none'}`}>
                    {competitionsCount} races
                </p>
            </div>
        </div>
    );
}

const EnvironmentTypeSelect: React.FC<IRaceSelectProps> = ({ selected, name, competitionsCount, onClick }) => {
    return (
        <div onClick={onClick} className={`md:min-w-[250px] md:w-[250px] ${selected ? 'bg-[#419A62]' : 'bg-none'} h-md px-6 py-4 flex rounded-2xl border border-gray-200 cursor-pointer shadow-sm hover:bg-[#419A62] transition-all duration-300 ease-in-out transform group`}>
            <div className="flex-shrink-0 transition-all duration-300 ease-in-out transform">
                <EnvironmentIcon className={`text-current transition-colors duration-200 ease-in-out group-hover:fill-white ${selected ? 'fill-white' : 'fill-[#419A62]'}`} />
            </div>
            <div className="column px-4">
                <p className={`text-md font-medium transition-colors duration-200 ease-in-out group-hover:text-white ${selected ? 'text-white' : 'text-none'}`}>
                    {name}
                </p>
                <p className={`text-md text-gray-400 transition-colors duration-200 ease-in-out group-hover:text-white ${selected ? 'text-white' : 'text-none'}`}>
                    {competitionsCount} races
                </p>
            </div>
        </div>
    );
}

const EducationTypeSelect: React.FC<IRaceSelectProps> = ({ selected, name, competitionsCount, onClick }) => {
    return (
        <div onClick={onClick} className={`md:min-w-[250px] md:w-[250px] ${selected ? 'bg-[#5D66EA]' : 'bg-none'} h-md px-6 py-4 flex rounded-2xl border border-gray-200 cursor-pointer shadow-sm hover:bg-[#5D66EA] transition-all duration-300 ease-in-out transform group`}>
            <div className="flex-shrink-0 transition-all duration-300 ease-in-out transform">
                <EducationIcon className={`text-current transition-colors duration-200 ease-in-out group-hover:fill-white ${selected ? 'fill-white' : 'fill-[#5D66EA]'}`} />
            </div>
            <div className="column px-4">
                <p className={`text-md font-medium transition-colors duration-200 ease-in-out group-hover:text-white ${selected ? 'text-white' : 'text-none'}`}>
                    {name}
                </p>
                <p className={`text-md text-gray-400 transition-colors duration-200 ease-in-out group-hover:text-white ${selected ? 'text-white' : 'text-none'}`}>
                    {competitionsCount} races
                </p>
            </div>
        </div>
    );
}

const IndustryTypeSelect: React.FC<IRaceSelectProps> = ({ selected, name, competitionsCount, onClick }) => {
    return (
        <div onClick={onClick} className={`md:min-w-[250px] md:w-[250px] ${selected ? 'bg-[#57566D]' : 'bg-none'} h-md px-6 py-4 flex rounded-2xl border border-gray-200 cursor-pointer shadow-sm hover:bg-[#57566D] transition-all duration-300 ease-in-out transform group`}>
            <div className="flex-shrink-0 transition-all duration-300 ease-in-out transform">
                <DropIcon className={`text-current transition-colors duration-200 ease-in-out group-hover:fill-white ${selected ? 'fill-white' : 'fill-[#57566D]'}`} />
            </div>
            <div className="column px-4">
                <p className={`text-md font-medium transition-colors duration-200 ease-in-out group-hover:text-white ${selected ? 'text-white' : 'text-none'}`}>
                    {name}
                </p>
                <p className={`text-md text-gray-400 transition-colors duration-200 ease-in-out group-hover:text-white ${selected ? 'text-white' : 'text-none'}`}>
                    {competitionsCount} races
                </p>
            </div>
        </div>
    );
}

const TechTypeSelect: React.FC<IRaceSelectProps> = ({ selected, name, competitionsCount, onClick }) => {
    return (
        <div onClick={onClick} className={`md:min-w-[250px] md:w-[250px] ${selected ? 'bg-[#774CDC]' : 'bg-none'} h-md px-6 py-4 flex rounded-2xl border border-gray-200 cursor-pointer shadow-sm hover:bg-[#774CDC] transition-all duration-300 ease-in-out transform group`}>
            <div className="flex-shrink-0 transition-all duration-300 ease-in-out transform">
                <TechIcon className={`text-current transition-colors duration-200 ease-in-out group-hover:fill-white ${selected ? 'fill-white' : 'fill-[#774CDC]'}`} />
            </div>
            <div className="column px-4">
                <p className={`text-md font-medium transition-colors duration-200 ease-in-out group-hover:text-white ${selected ? 'text-white' : 'text-none'}`}>
                    {name}
                </p>
                <p className={`text-md text-gray-400 transition-colors duration-200 ease-in-out group-hover:text-white ${selected ? 'text-white' : 'text-none'}`}>
                    {competitionsCount} races
                </p>
            </div>
        </div>
    );
}
