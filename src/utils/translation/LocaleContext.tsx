import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import isLocale from './isLocale';
import { defaultLocale, defaultNamespace } from './config';
import strings from '@locales';
import { Strings } from '@locales/types';

type ProviderProps = {
  lang: string;
  translations: Strings;
  namespaces: string[];
};

type ContextProps = {
  locale: ProviderProps;
  setLocale: (...args) => any;
};

export const LocaleContext = createContext<ContextProps>({
  locale: {
    lang: defaultLocale, // default lang
    translations: strings[defaultLocale][defaultNamespace], // default translations
    namespaces: [defaultNamespace], // default namespace
  },
  setLocale: () => null,
});

export const LocaleProvider: React.FC<ProviderProps> = ({
  lang,
  translations,
  namespaces,
  children,
}): JSX.Element => {
  const [locale, setLocale] = useState<any>({ lang, translations, namespaces });
  const { query } = useRouter();

  useEffect(() => {
    if (locale.lang !== localStorage.getItem('locale')) {
      localStorage.setItem('locale', locale.lang);
    }
  }, [locale.lang]);

  useEffect(() => {
    const { lang } = query;
    if (typeof lang === 'string' && isLocale(lang) && locale.lang !== lang) {
      setLocale({ lang, translations, namespaces });
    }
  }, [query.lang, locale.lang, query, translations, namespaces]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
