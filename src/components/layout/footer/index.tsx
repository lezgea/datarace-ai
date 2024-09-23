"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const InstagramIcon = dynamic(() => import('@assets/icons').then(mod => mod.InstagramIcon), { ssr: false });
const TwitterIcon = dynamic(() => import('@assets/icons').then(mod => mod.TwitterIcon), { ssr: false });
const YoutubeIcon = dynamic(() => import('@assets/icons').then(mod => mod.YoutubeIcon), { ssr: false });
const LinkedinIcon = dynamic(() => import('@assets/icons').then(mod => mod.LinkedinIcon), { ssr: false });
const LogoWhite = dynamic(() => import('@assets/icons').then(mod => mod.LogoWhite), { ssr: false });


export const Footer: React.FC = () => {
    const t = useTranslations();
    const pathname = usePathname();

    const hideHeaderRoutes = React.useMemo(() => ["/sign-in", "/sign-up", "/activation", "/forgot", "/reset-password"], []);
    const shouldHideFooter = React.useMemo(() => hideHeaderRoutes.includes(pathname), [pathname]);

    if (shouldHideFooter) return null;

    return (
        <footer className="bg-dark" role="contentinfo">
            <div className="container mx-auto w-full py-[50px] px-10 md:px-0 space-y-12">
                <section className="grid gap-10 grid-cols-1 md:grid-cols-[3fr_2fr_2fr_1fr] text-white text-center md:text-start">
                    <div className="space-y-6 flex flex-col items-center md:items-start md:pr-40">
                        <LogoWhite aria-hidden="true" />
                        <p className="font-light text-sm">
                            {t('footerDescription')}
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h2 className="font-semibold">{t('company')}</h2>
                        <ul className="text-sm font-light space-y-4">
                            <li>
                                <Link href="/about-us" className="hover:text-primary">{t('aboutUs')}</Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-primary">{t('faq')}</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">{t('termsTitle')}</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h2 className="font-semibold">{t('races')}</h2>
                        <ul className="text-sm font-light space-y-4">
                            <li>
                                <Link href="/races" className="hover:text-primary">{t('activeRaces')}</Link>
                            </li>
                            <li>
                                <Link href="/courses" className="hover:text-primary">{t('courses')}</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">Proqram təminatı mühəndisliyi</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h2 className="font-semibold">{t('contact')}</h2>
                        <ul className="text-sm font-light space-y-4">
                            <li>
                                <Link href="#" className="hover:text-primary">{t('email')}</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">{t('phone')}</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">{t('address')}</Link>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="flex flex-col items-center gap-10 md:flex-row md:justify-between">
                    <span className="text-gray-400">DataRace</span>
                    <div className="flex space-x-5 justify-center">
                        <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <InstagramIcon />
                            <span className="sr-only" aria-label='Instagram page'>Instagram page</span>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <TwitterIcon />
                            <span className="sr-only" aria-label='Twitter page'>Twitter page</span>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <YoutubeIcon />
                            <span className="sr-only" aria-label='YouTube page'>YouTube page</span>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <LinkedinIcon />
                            <span className="sr-only" aria-label='LinkedIn page'>LinkedIn page</span>
                        </a>
                    </div>
                </section>

            </div>
        </footer>
    );
};
