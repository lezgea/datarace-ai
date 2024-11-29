import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Loader } from '@components/shared';
import Link from 'next/link';
import { AboutSection } from '@components/features/about';
import { IParamsLanguage } from 'types/lang-types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LogoFullWhite, LogoWhite } from '@assets/icons';


export const metadata: Metadata = {
    title: "About Us | Datarace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and Al enthusiasts together to compete in data-driven challenges.",
};


const AboutUs: React.FC<IParamsLanguage> = ({ params: { lng } }) => {
    const t = useTranslations();

    return (
        <Suspense fallback={<Loader />}>
            <div className="min-h-screen flex flex-col">
                <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
                <main id="main-content" className="container mx-auto flex-grow px-5 py-10 md:px-0 md:py-[6rem]">
                    {/* Breadcrumb */}
                    <nav className="text-sm flex justify-start items-center text-gray-600 space-x-3">
                        <Link href="/" className="hover:text-primaryLight">{t('mainPage')}</Link>
                        <span className="text-lg">&gt;</span>
                        <span>{t('aboutUs')}</span>
                    </nav>
                    <h1 className="text-[32px] md:text-[2.3rem] font-medium">{t('aboutUs')}</h1>
                    <section className="relative border rounded-2xl mt-5 mb-4">
                        <Image
                            src={"/svg/dr_banner.svg"}
                            alt="Datarace Banner Image"
                            height={200}
                            width={800}
                            className="w-full h-[23rem] rounded-2xl object-cover"
                        />
                        <div className='absolute flex flex-col items-end justify-end gap-7 px-20 py-[4rem] top-0 w-full h-full'>
                            <LogoFullWhite />
                            <p className='text-md text-white font-light max-w-[50%] text-end'>{t('description')}</p>
                        </div>
                    </section>
                    <AboutSection description={t('aboutUsText1')} />
                    <AboutSection description={t('aboutUsText2')} />
                    <AboutSection description={t('aboutUsText3')} />
                </main>
            </div>
        </Suspense>
    );
};

export default AboutUs;
