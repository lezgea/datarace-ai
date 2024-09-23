"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';


const LANGS = [
    { code: 'en', name: 'English' },
    { code: 'az', name: 'Azerbaijani' },
];

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();  // Current path
    const lng = useLocale();  // Current language from context or state
    let lngToShow = lng === 'az' ? 'en' : 'az'

    const changeLanguage = () => {
        let newLng = (LANGS[0]?.code === lng) ? LANGS[1]?.code : LANGS[0]?.code

        if (newLng === lng) return;  // No need to change if the selected language is already active

        // Replace the current language in the URL with the new language
        const newPath = pathname.replace(`/${lng}`, `/${newLng}`);
        router.push(newPath);  // Navigate to the new language route
    };

    return (
        <div>
            <button
                onClick={changeLanguage}
                className={'font-medium border border-[3px] border-primaryLight rounded-full min-w-[40px] min-h-[40px] max-h-[40px] max-w-[40px] flex items-center justify-center'}
            >
                {lngToShow.toUpperCase()}
            </button>
        </div>
    );
};

export default LanguageSwitcher;
