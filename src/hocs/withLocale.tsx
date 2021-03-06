import React from 'react';
import useTranslation from '@hooks/useTranslation';
import { NextPage } from 'next';

const withTranslation = (namespace: string) => (
  PageComponent: NextPage
): NextPage => {
  const WithInjectedStores = (props) => {
    const { locale, t } = useTranslation(namespace);

    return <PageComponent {...props} locale={locale} t={t} />;
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';
    WithInjectedStores.displayName = `withInjectedStores(${displayName})`;
  }

  return WithInjectedStores;
};

export default withTranslation;
