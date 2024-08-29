import React from 'react';


interface IRaceSelectProps {
    title: string,
    description: string,
    icon: React.ElementType,
    type: string,
}


const RaceSelect: React.FC<IRaceSelectProps> = (props) => {
    let { type } = props;

    switch (type) {
        case "race": return <RaceTypeSelect {...props} />;
        case "environment": return <EnvironmentTypeSelect {...props} />;
        case "education": return <EducationTypeSelect {...props} />;
        case "industry": return <IndustryTypeSelect {...props} />;
        case "tech": return <TechTypeSelect {...props} />;
        default: return null;
    }
};

export default RaceSelect


const RaceTypeSelect: React.FC<IRaceSelectProps> = ({ title, description, icon: Icon }) => {
    return (
        <div className={`md:min-w-[250px] md:w-[250px] h-md px-6 py-4 flex rounded-2xl border border-gray-200 cursor-pointer shadow-sm hover:bg-[#FFB54D] transition-all duration-300 ease-in-out transform group`}>
            <div className="flex-shrink-0 transition-all duration-300 ease-in-out transform">
                <Icon className="text-current transition-colors duration-200 ease-in-out group-hover:fill-white" fill={"#FFB54D"} />
            </div>
            <div className="column px-4">
                <p className="text-md font-medium transition-colors duration-200 ease-in-out group-hover:text-white">
                    {title}
                </p>
                <p className="text-md transition-colors duration-200 ease-in-out group-hover:text-white">
                    {description}
                </p>
            </div>
        </div>
    );
}

const EnvironmentTypeSelect: React.FC<IRaceSelectProps> = ({ title, description, icon: Icon }) => {
    return (
        <div className={`md:min-w-[250px] md:w-[250px] h-md px-6 py-4 flex rounded-2xl border border-gray-200 cursor-pointer shadow-sm hover:bg-[#419A62] transition-all duration-300 ease-in-out transform group`}>
            <div className="flex-shrink-0 transition-all duration-300 ease-in-out transform">
                <Icon className="text-current transition-colors duration-200 ease-in-out group-hover:fill-white" fill={"#419A62"} />
            </div>
            <div className="column px-4">
                <p className="text-md font-medium transition-colors duration-200 ease-in-out group-hover:text-white">
                    {title}
                </p>
                <p className="text-md transition-colors duration-200 ease-in-out group-hover:text-white">
                    {description}
                </p>
            </div>
        </div>
    );
}

const EducationTypeSelect: React.FC<IRaceSelectProps> = ({ title, description, icon: Icon }) => {
    return (
        <div className={`md:min-w-[250px] md:w-[250px] h-md px-6 py-4 flex rounded-2xl border border-gray-200 cursor-pointer shadow-sm hover:bg-[#5D66EA] transition-all duration-300 ease-in-out transform group`}>
            <div className="flex-shrink-0 transition-all duration-300 ease-in-out transform">
                <Icon className="text-current transition-colors duration-200 ease-in-out group-hover:fill-white" fill={"#5D66EA"} />
            </div>
            <div className="column px-4">
                <p className="text-md font-medium transition-colors duration-200 ease-in-out group-hover:text-white">
                    {title}
                </p>
                <p className="text-md transition-colors duration-200 ease-in-out group-hover:text-white">
                    {description}
                </p>
            </div>
        </div>
    );
}

const IndustryTypeSelect: React.FC<IRaceSelectProps> = ({ title, description, icon: Icon }) => {
    return (
        <div className={`md:min-w-[250px] md:w-[250px] h-md px-6 py-4 flex rounded-2xl border border-gray-200 cursor-pointer shadow-sm hover:bg-[#57566D] transition-all duration-300 ease-in-out transform group`}>
            <div className="flex-shrink-0 transition-all duration-300 ease-in-out transform">
                <Icon className="text-current transition-colors duration-200 ease-in-out group-hover:fill-white" fill={"#57566D"} />
            </div>
            <div className="column px-4">
                <p className="text-md font-medium transition-colors duration-200 ease-in-out group-hover:text-white">
                    {title}
                </p>
                <p className="text-md transition-colors duration-200 ease-in-out group-hover:text-white">
                    {description}
                </p>
            </div>
        </div>
    );
}

const TechTypeSelect: React.FC<IRaceSelectProps> = ({ title, description, icon: Icon }) => {
    return (
        <div className={`md:min-w-[250px] md:w-[250px] h-md px-6 py-4 flex rounded-2xl border border-gray-200 cursor-pointer shadow-sm hover:bg-[#774CDC] transition-all duration-300 ease-in-out transform group`}>
            <div className="flex-shrink-0 transition-all duration-300 ease-in-out transform">
                <Icon className="text-current transition-colors duration-200 ease-in-out group-hover:fill-white" fill={"#774CDC"} />
            </div>
            <div className="column px-4">
                <p className="text-md font-medium transition-colors duration-200 ease-in-out group-hover:text-white">
                    {title}
                </p>
                <p className="text-md transition-colors duration-200 ease-in-out group-hover:text-white">
                    {description}
                </p>
            </div>
        </div>
    );
}
