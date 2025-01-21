"use client";

import React from 'react';
import { Dropdown } from '@components/shared/dropdown';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';


const LANGS: { code: string; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'az', name: 'Azerbaijani' },
];

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations();
    const lng = useLocale();
    const [lngToShow, setLngToShow] = React.useState<string>(lng);


    const changeLanguage = (code: string) => {
        if (code === lng) return;
        setLngToShow(code);
        const newPath = pathname.replace(`/${lng}`, `/${code}`);
        router.push(newPath);
    };


    const DropdownContent = (
        <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu" className="w-40">
            {LANGS.map((item) => (
                <div
                    key={item.code}
                    className="block px-3 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 hover:text-purple rounded-md transition-all duration-200 ease-in-out"
                    role="menuitem"
                    onClick={() => changeLanguage(item.code)}
                >
                    {t(item.name)}
                </div>
            ))}
        </div>
    );

    return (
        <Dropdown content={DropdownContent}>
            <div className="group p-[3px] rounded-full bg-gradient-to-r from-purple to-primary hover:to-purpleLight transition-all">
                <button
                    className={'font-medium border border-[3px] border-primaryLight rounded-full min-w-[40px] min-h-[40px] max-h-[40px] max-w-[40px] flex items-center justify-center hover:bg-primaryLight hover:text-white'}
                >
                    {lngToShow.toUpperCase()}
                </button>
            </div>
        </Dropdown>
    );
};

export default LanguageSwitcher;
