import React, { useCallback } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { locales, languageNames } from '@utils/translation/config';
import { useRouter } from 'next/router';
import { Locale } from '@locales/types';
import useTranslation from '@hooks/useTranslation';

const LanguageSelector = (): JSX.Element => {
  const { locale, t } = useTranslation();
  const router = useRouter();

  const selectLocale = useCallback(
    (lng: Locale) => {
      if (lng !== locale) {
        const regex = new RegExp(`^/(${locales.join('|')})`);
        router
          .push(router.pathname, router.asPath.replace(regex, `/${lng}`))
          .then();
      }
    },
    [router, locale]
  );

  return (
    <ButtonGroup variant="contained" color="primary">
      {locales.map((lang) => {
        return (
          <Button key={lang} onClick={() => selectLocale(lang)}>
            {t(`languages.${lang}`)}
            {locale !== lang && languageNames[lang]
              ? ` (${languageNames[lang]})`
              : null}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default LanguageSelector;
