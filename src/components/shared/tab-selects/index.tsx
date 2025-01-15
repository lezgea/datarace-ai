"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";

interface ITab {
    title: string;
    value: string;
    content: React.ReactNode;
}

interface ITabSelectsProps {
    tabs: ITab[];
    selectedTab?: string;
}

const TabSelects: React.FC<ITabSelectsProps> = ({ tabs, selectedTab }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<string>(selectedTab || tabs[0]?.value || "");

    const renderContent = () => {
        const activeTabContent = tabs.find((tab) => tab.value === activeTab)?.content;
        return activeTabContent ? (
            <Suspense fallback={<div>Loading...</div>}>{activeTabContent}</Suspense>
        ) : null;
    };

    const handleTabChange = (tabValue: string) => {
        setActiveTab(tabValue);

        // Update the URL query parameter
        router.push(`${pathname}?tab=${tabValue}`);
    };

    useEffect(() => {
        // Retrieve the 'tab' query parameter from the URL
        const tabFromQuery = searchParams.get("tab");
        if (tabFromQuery && tabFromQuery !== activeTab) {
            setActiveTab(tabFromQuery);
        }
    }, [searchParams]);

    return (
        <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex space-x-4 border-b-2 border-gray-100 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => handleTabChange(tab.value)}
                        className={`pb-2 px-3 -mb-[2px] ${activeTab === tab.value
                            ? "font-medium border-b-2 border-green-600"
                            : "hover:text-primaryLight"
                            }`}
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
