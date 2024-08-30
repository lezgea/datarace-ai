"use client";

import React, { useState, Suspense } from 'react';

interface ITab {
    title: string;
    content: React.ReactNode;
}

interface ITabSelectsProps {
    tabs: ITab[];
}


const TabSelects: React.FC<ITabSelectsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]?.title || '');

    const renderContent = () => {
        const activeTabContent = tabs.find(tab => tab.title === activeTab)?.content;
        return activeTabContent ? <Suspense fallback={<div>Loading...</div>}>{activeTabContent}</Suspense> : null;
    };

    return (
        <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex space-x-4 border-b-2 border-gray-100 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.title}
                        onClick={() => setActiveTab(tab.title)}
                        className={`pb-2 px-3 -mb-[2px] ${activeTab === tab.title ? 'font-medium border-b-2 border-green-600' : 'hover:text-primaryLight'}`}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            {/* Render content based on active tab */}
            {renderContent()}
        </div>
    );
};

export default TabSelects;
