"use client";

import { NoDataSvg } from "@assets/icons"
import { RootState } from "@store/store";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";


export const NoData = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.user);
    const lng = useLocale();
    const t = useTranslations();
    const router = useRouter();

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center p-6 text-center min-h-[50vh]">
                <p className='font-light'>{t('noDataTitle')}</p>
                <p className='font-light'>
                    {t('noDataDescription')} <span className="font-medium cursor-pointer underline text-primary" onClick={() => router.push(`/${lng}/sign-up`)}>{t('newAccount').toLowerCase()}</span>
                </p>
                <div className="flex flex-col items-center space-y-3 mt-5">
                    <button
                        onClick={() => router.push(`/${lng}/sign-in`)}
                        className="flex w-full max-w-[200px] text-center justify-center items-center px-6 py-2 text-white transition-all bg-primary rounded-lg hover:bg-primaryDark hover:shadow-lg hover:shadow-neutral-300 hover:-translate-y-px shadow-neutral-300 focus:shadow-none animate-button"
                        aria-label="Join the Race"
                    >
                        {t('signIn')}
                    </button>
                </div>
            </div>
        )
    }


    return (
        <div className="flex flex-col items-center justify-center w-full h-[50vh] gap-10">
            <NoDataSvg className="h-40 w-[300px]" />
            <p className="text-gray-400 ">No Data Found</p>
        </div>
    )
}