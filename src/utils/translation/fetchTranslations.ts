import translationStrings from '@locales';
import { fallbackLocale, defaultNamespace } from './config';
import { Locale, Strings } from '@locales/types';

type TransType = {
  namespace: string;
  translatedStrings: Strings;
};

export type TranslationsType = {
  lang: Locale;
  namespaces: string[];
  translations: {
    lang: TransType[];
    fallback: TransType[];
  };
};

export default async function fetchTranslations(
  lang: Locale,
  namespaces = [defaultNamespace]
): Promise<TranslationsType> {
  return {
    lang,
    namespaces,
    // translations: namespaces.map(namespace => ({
    //     namespace,
    //     translatedStrings:
    //       translationStrings[lang] && translationStrings[lang][namespace]
    //   })),
    translations: {
      lang: namespaces.map((namespace) => ({
        namespace,
        translatedStrings:
          translationStrings[lang] && translationStrings[lang][namespace],
      })),
      fallback: namespaces.map((namespace) => ({
        namespace,
        translatedStrings:
          translationStrings[fallbackLocale] &&
          translationStrings[fallbackLocale][namespace],
      })),
    },
  };
}
