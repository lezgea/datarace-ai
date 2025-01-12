import React from 'react';
import { Teamwork } from '@assets/icons';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';


export const EmailSent: React.FC = () => {
    const t = useTranslations();
    const lng = useLocale();

    return (
        <div className="flex flex-col w-full items-center justify-center mx-auto lg:max-w-md space-y-7 animate-right-svg text-center">
            <Teamwork />
            <h2 className="text-[2.3rem] font-regmed">{t('registerConfirmationTitle')}</h2>
            <p className="text-sm text-gray-600">{t('registerConfirmationDescription1')}</p>
            <p className="text-sm text-gray-600">{t('registerConfirmationDescription2')}</p>
            <Link
                href={`/${lng}`}
                className="flex w-full text-center justify-center items-center px-6 py-3 text-white transition-all bg-primary rounded-xl hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                aria-label="Back to homepage"
            >
                {t('mainPage')}
            </Link>
        </div>
    );
}

