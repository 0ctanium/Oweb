import React from 'react';
import { useContext, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Skeleton from '@material-ui/lab/Skeleton';
import { LocaleContext } from '@context/LocaleContext';
import { defaultNamespace, fallbackNamespace } from '@utils/translation/config';
import { Locale } from '@locales/types';

function nestedT(string, key) {
  const pathArr = [string, ...key.split('.')];
  return pathArr.reduce((obj, path) => {
    return (obj || {})[path];
  });
}

function nsToTrans(obj) {
  return obj.reduce((acc, cur, i) => {
    if (i === 1) acc = { [acc.namespace]: acc.translatedStrings };
    acc[cur.namespace] = cur.translatedStrings;
    return acc;
  });
}

type useTranslationType = {
  t: (key: string) => string;
  locale: Locale;
};

export default function useTranslation(
  namespace: string = defaultNamespace
): useTranslationType {
  const { localeData } = useContext(LocaleContext) || {};
  const { translations, lang } = localeData;
  const { isFallback } = useRouter();

  const strings = useMemo(
    () =>
      translations &&
      typeof translations === 'object' &&
      Array.isArray(translations.lang) &&
      translations.lang.some(
        (translation) => translation.namespace === namespace
      ) &&
      nsToTrans(translations.lang),
    [translations, namespace]
  );

  const fallbackStrings = useMemo(
    () =>
      translations &&
      typeof translations === 'object' &&
      Array.isArray(translations.fallback) &&
      translations.fallback.some(
        (translation) => translation.namespace === namespace
      ) &&
      nsToTrans(translations.fallback),
    [translations, namespace]
  );

  const t = useCallback(
    (key) => {
      if (isFallback) {
        return <Skeleton variant={'text'} width={key ? key.length * 10 : 30} />;
      }

      if (!strings[namespace]) {
        console.warn(
          `Namespace '${namespace}' for locale '${lang}' not found.`
        );
      }

      const translation = nestedT(strings[namespace], key);

      if (!strings[namespace] || !translation) {
        const fallbackNSTranslation = nestedT(strings[fallbackNamespace], key);

        if (!fallbackNSTranslation) {
          const fallbackLngTranslation = nestedT(
            fallbackStrings[namespace],
            key
          );

          if (!fallbackLngTranslation) {
            const fallbackTranslation = nestedT(
              fallbackStrings[fallbackNamespace],
              key
            );

            if (!fallbackTranslation) {
              console.warn(`Translation '${key}' not found.`);
              return key;
            }

            console.warn(
              `Translation '${key}' for locale '${lang}' not found.`
            );
            return fallbackTranslation || key;
          }

          return fallbackLngTranslation || key;
        }

        return fallbackNSTranslation || key;
      }

      return translation || key;
    },
    [isFallback, strings, namespace, lang, fallbackStrings]
  );

  return {
    t,
    locale: lang || 'en',
  };
}
