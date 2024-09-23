import { InitOptions } from 'i18next';

export const fallbackLng = 'az';
export const languages = [fallbackLng, 'en', 'tr', 'ru'];
export const defaultNS = 'translation';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  const options: InitOptions = {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
  return options;
}
