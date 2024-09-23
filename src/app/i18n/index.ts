import { initReactI18next } from 'react-i18next/initReactI18next';
import { createInstance } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

import { getOptions } from './settings';

const initI18next = async (lng: string, ns: string | string[]) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns as string));
  return i18nInstance;
};

interface IOptions {
  keyPrefix?: string;
}

export async function useTranslation(lng: string, ns?: 'common', options: IOptions = {}) {
  const i18nextInstance = await initI18next(lng, ns = 'common');
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
