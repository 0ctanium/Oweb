import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import theme from '@theme';
import { ServerStyleSheets } from '@material-ui/styles';

type Props = {
  lang: string;
};

type DocumentGetInitialPropsOutput = Props & DocumentInitialProps;
type DocumentRenderProps = Props & DocumentProps;

class MyDocument extends Document<DocumentRenderProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentGetInitialPropsOutput> {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps: DocumentInitialProps = await Document.getInitialProps(
      ctx
    );

    const { query } = ctx;
    const lang = query?.lang as string;

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
      lang,
    };
  }

  render(): JSX.Element {
    const { lang } = this.props;

    return (
      <Html lang={lang}>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link rel="apple-touch-icon" href="/logo.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta name="Description" content="Oweb is a development company." />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
