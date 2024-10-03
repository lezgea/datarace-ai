import React from 'react';
import { Metadata } from 'next';
import { Loader } from '@components/shared';
import { useTranslations } from 'next-intl';
import { ContactForm, SignUpForm } from '@components/features';
import { InstagramIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from '@assets/icons';


export const metadata: Metadata = {
    title: "Contact Us | Datarace.ai",
    description: "DataRace is an innovative platform designed to bring data scientists and Al enthusiasts together to compete in data-driven challenges.",
};


const Contact: React.FC = () => {
    const t = useTranslations();

    return (
        <div className="min-h-screen flex flex-col">
            <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
            <main id="main-content" className="flex-grow bg-gray-50 px-5 py-20 lg:px-0 lg:py-[7rem] space-y-20">
                <section className="container flex flex-col lg:flex-row mx-auto w-full justify-between space-y-20 lg:space-y-0">
                    <div className="justify-between space-y-[50px]">
                        <div className="space-y-3">
                            <h2 className="text-[32px] md:text-[2.3rem] font-medium">{t('contact')}</h2>
                            <p className="text-md text-gray-700">{t('contactDescription')}</p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-2xl font-medium">{t('contactInformation')}:</h3>
                            <p className="text-md text-gray-700"><strong className="mr-2">{t('emailAddress')}: </strong> info@datarace.ai</p>
                        </div>

                        <div className="space-y-5">
                            <h4 className="text-2xl font-medium">{t('socialLinks')}:</h4>
                            <div className="flex space-x-5">
                                <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    <InstagramIcon fill="#419A62" />
                                    <span className="sr-only" aria-label='Instagram page'>Instagram page</span>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    <TwitterIcon fill="#419A62" />
                                    <span className="sr-only" aria-label='Twitter page'>Twitter page</span>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    <YoutubeIcon fill="#419A62" />
                                    <span className="sr-only" aria-label='YouTube page'>YouTube page</span>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    <LinkedinIcon fill="#419A62" />
                                    <span className="sr-only" aria-label='LinkedIn page'>LinkedIn page</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex lg:w-[50%]">
                        <ContactForm />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Contact;
