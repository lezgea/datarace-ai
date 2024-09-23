"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '@providers/language-provider';  // Assuming you have a provider to track language state
import { languages } from 'app/i18n/settings';  // Assuming you have defined available languages

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();  // Current path
    const { lng } = useLanguage();  // Current language from context or state

    const changeLanguage = () => {
        let newLng = (languages[0] === lng) ? languages[1] : languages[0]

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
                {lng.toUpperCase()}
            </button>
        </div>
    );
};

export default LanguageSwitcher;
