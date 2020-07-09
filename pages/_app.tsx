import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';
import { useStore } from '@store/configureStore';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from '@components/Loader';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { clientProps } from '@utils/firebase/clientApp';
import theme from '@theme';
import stateType from '@reducers/types';
import { LocaleProvider } from '@context/LocaleContext';
import { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const { lang, translations, namespaces } = pageProps;
  const store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const Page: React.FC<{ loading?: boolean }> = (
    { loading } = { loading: false }
  ) => (
    <Layout loading={loading}>
      <Component {...pageProps} />
    </Layout>
  );

  return (
    <Provider store={store}>
      <LocaleProvider
        lang={lang}
        translations={translations}
        namespaces={namespaces}>
        {process.browser ? (
          <ReactReduxFirebaseProvider {...clientProps({ store })}>
            <PersistGate
              loading={<Page loading={true} />}
              persistor={persistStore(store)}>
              <Page />
            </PersistGate>
          </ReactReduxFirebaseProvider>
        ) : (
          <Page />
        )}
      </LocaleProvider>
    </Provider>
  );
}

export function Layout(
  { loading, children }: any = { loading: false }
): JSX.Element {
  const auth = useSelector<stateType>((state) => state.firebase.auth);

  return (
    <React.Fragment>
      <Head>
        <title>Oweb</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Loader loading={loading && isLoaded(auth)} />
        {children}
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
