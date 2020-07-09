import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Link from '@components/Link';
import { locales } from '@utils/translation/config.js';
import fetchTranslations from '@utils/translation/fetchTranslations';
import useTranslation from '@hooks/useTranslation';
import LanguageSelector from '@components/LanguageSelector';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Locale } from '@locales/types';

function Home(): JSX.Element {
  const { t } = useTranslation('home');

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="h1">
        {t('welcome')}
      </Typography>

      <Typography variant="h4" component="h1">
        {t('welcome_message.text_1')}
        <Link href="/about" color="secondary" localise>
          {t('welcome_message.link_1')}
        </Link>
        {t('welcome_message.text_2')}.
      </Typography>
      <LanguageSelector />
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ({ params: { lang } }) => {
  return {
    props: {
      ...(await fetchTranslations(lang as Locale, ['common', 'home'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale } })),
    fallback: false,
  };
};

export default Home;
