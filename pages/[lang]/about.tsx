import React from 'react';
import LanguageSelector from '@components/LanguageSelector';
import { Container, Typography } from '@material-ui/core';
import Link from '@components/Link';
import { GetStaticPaths, GetStaticProps } from 'next';
import fetchTranslations from '@utils/translation/fetchTranslations';
import { Locale } from '@locales/types';
import { locales } from '@utils/translation/config';
import useTranslation from '@hooks/useTranslation';

function About(): JSX.Element {
  const { t } = useTranslation('about');

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="h1">
        {t('welcome')}
      </Typography>

      <Typography variant="h4" component="h1">
        {t('about_message.text_1')}
        <Link href="/" color="secondary" localise>
          {t('about_message.link_1')}
        </Link>
        {t('about_message.text_2')}.
      </Typography>
      <LanguageSelector />
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ({ params: { lang } }) => {
  return {
    props: {
      ...(await fetchTranslations(lang as Locale, ['common', 'about'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale } })),
    fallback: false,
  };
};

export default About;
